const { JSDOM } = require("jsdom");
const fs = require("fs");

const glossary = require("./glossary-entry-effect-interaction.json");
const glossary_entries = Object.keys(glossary) //.sort((a, b) => (a < b ? -1 : 1));

// operating on root path, decomment for relative
// const path = require("path");

function readHTML(file_name) {
  return new JSDOM(fs.readFileSync(file_name).toString()).window.document;
  // relative path
  // return new JSDOM(fs.readFileSync(path.resolve(__dirname, file_name)).toString()).window.document;
}

function tocString2Json(input) {
  const lines = input.trim().split("\n");
  const result = [];
  const stack = [];

  lines.forEach((line) => {
    const level = line.match(/^\t*/)[0].length;
    const id = line.trim().split(" ")[0];
    const title = line.trim().replace(id + " ", "");
    const newItem = { title, id, children: [] };

    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(newItem);
    } else {
      const parent = stack[stack.length - 1].item;
      parent.children.push(newItem);
    }

    stack.push({ level, item: newItem });
  });

  return result;
}

function createList(items) {
  let list = "<ol>";
  items.forEach((item) => {
    list += `<li><a href="#${item.id}">${item.title.replace(item.id + " ", "")}</a>`;
    if (item.children && item.children.length > 0) {
      list += createList(item.children);
    }
    list += "</li>";
  });
  list += "</ol>";
  return list;
}

function mergeIncludes(document) {
  const includes = document.querySelectorAll("include");
  if (includes.length < 1) return;

  for (const element of includes) {
    const section_name = element.textContent.replaceAll("\n", "").replaceAll(" ", "");
    const section = readHTML(section_name);
    mergeIncludes(section);

    // if glossary entry, add effects interaction
    if (section_name.includes("10_glossary/") || section_name.includes("06_other_game_elements/") || section_name.includes("02_monster_cards/abilities/") || section_name.includes("09_card_text/04_text_not_effect/")) {
      const section_title = Array.from(section.querySelectorAll("h2, h3, h4"))[0].innerHTML.replaceAll("&amp;", "&");

      // construct effect interaction list
      try {
        const glossary_entry_list = section.querySelector(".glossary-entry-effect-interaction");
        const references_list = section.querySelector(".references");
        const references_list_items = Array.from(references_list.querySelectorAll("li"));

        let sup_current_index = references_list_items.length;

        for (const entry of glossary_entries) {
          if (glossary[section_title] != undefined) {
            if (glossary[section_title][entry] != undefined) {
              sup_current_index = addEffectInteractionEntry(glossary[section_title][entry], entry, sup_current_index, glossary_entry_list, references_list);
            } else if (glossary[entry][section_title] != undefined) {
              sup_current_index = addEffectInteractionEntry(glossary[entry][section_title], entry, sup_current_index, glossary_entry_list, references_list);
            }
          }
        }
      } catch (error) {
        console.log(section_title);
        console.log(error);
        console.log();
      }
    }

    element.outerHTML = section.querySelector("body").innerHTML;
  }
}

function addEffectInteractionEntry(glossary_object, entry, sup_current_index, glossary_entry_list, references_list) {
  for (let i = 0; i < glossary_object.length; i++) {
    let interaction = glossary_object[i].interaction;
    let example = glossary_object[i].example;
    let reference = glossary_object[i].reference;

    let alreadyExistingResourceIndex = -1;
    const references_list_items = Array.from(references_list.querySelectorAll("li"));
    if (references_list_items.length > 0) {
      // console.log(reference)
      alreadyExistingResourceIndex = references_list_items.findIndex((_) => _.outerHTML.replaceAll("\n", "").replaceAll("  ", "").replaceAll("&amp;", "&") === reference);

      //if (reference.includes("Granguig")) {
      //  console.log(references_list_items.filter((_) => _.outerHTML.includes("Granguig")).map((_) => _.outerHTML.replaceAll("\n", "").replaceAll("  ", "").replaceAll("&amp;", "&"))[0]);
      //  console.log(reference);
      //}
    }

    // add list-item interaction entry
    if (interaction != undefined) {
      sup_current_index += alreadyExistingResourceIndex === -1 ? 1 : 0;

      let entryHTML = "";

      if (i === 0) {
        entryHTML += `
        <li>
          <strong>${entry}</strong><br/>`;
      }

      if (glossary_object.length > 1) {
        entryHTML += `<ul><li>`;
      }

      if (example.length > 0) {
        entryHTML += `
          ${interaction}
            <details>
              <summary>Example</summary>
              ${example}
              <hr />
            </details>
          `;
      } else {
        entryHTML += `
          ${interaction}
          `;
      }
      entryHTML = entryHTML.replaceAll("<sup><a>[]</a></sup>", `<sup><a href="#">[${(alreadyExistingResourceIndex === -1 ? references_list_items.length : alreadyExistingResourceIndex) + 1}]</a></sup>`);

      if (glossary_object.length > 1) {
        entryHTML += `</li></ul>`;
      }

      if (i === glossary_object.length - 1) {
        entryHTML += `</li>`;
      }

      glossary_entry_list.innerHTML += entryHTML;

      if (reference.length > 0 && alreadyExistingResourceIndex === -1) {
        references_list.innerHTML += "\n" + reference + "\n";
      }
    }
  }

  return sup_current_index;
}

async function main() {
  console.log("Building...");

  // load index ------------------------------------------------------------
  const document = readHTML("build_site/index.html");

  // recursive merge includes ------------------------------------------------------------
  mergeIncludes(document);

  // make toc ------------------------------------------------------------
  const headers = document.querySelectorAll("h1, h2, h3 ,h4");

  let idLevel = [0, 0, 0, 0];
  let toc_string = "";
  for (const header of headers) {
    const level = +header.tagName.replace("H", "");
    idLevel[level - 1] += 1;
    for (let i = level; i < 4; i++) idLevel[i] = 0;
    const idString = idLevel.filter((_) => _ > 0).join(".");
    const title = idString + " " + header.textContent;

    header.outerHTML = `
        <div style="display:flex; align-items: center; margin: 0; margin-top: 1.5rem;">
            <h${level} style="margin: 0;" id="${idString}">${title}</h${level}>
            <a href="#${idString}" style="margin-left: 1rem;">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>
            </a>
        </div>
        <hr>
    `;
    toc_string += "\t".repeat(level - 1) + " " + title + "\n";
  }

  const toc_json = tocString2Json(toc_string);

  let toc = `
    <div class="toc sidebar">
        <div class="toc-controller">
          Move Table of Contents
          <div>
            <span id="toc-2-left">◀</span>
            <span id="toc-2-top">▲</span>
            <span id="toc-2-right">▶</span>
          </div>
        </div>
        ${createList(toc_json)}
    </div>
  `;

  document.querySelector(".toc").outerHTML = toc;

  // fix <sup> (references) ------------------------------------------------------------
  let lines = document.querySelector("body").innerHTML.split("\n");
  let currentSectionId = "";

  let i = 0;
  for (; i < lines.length; i++) {
    let line = lines[i];

    // reference id is of "currentSectionId-[reference_number]"", for example "1.3.2-[1]"
    // find currentSectionId first
    if (line.includes("<h") && !line.includes("<hr")) {
      const header = new JSDOM(line).window.document.querySelector("h1, h2, h3, h4");
      currentSectionId = header.id;
    }

    // add correct anchors tu sup
    if (line.includes("<sup>")) {
      const sups = new JSDOM(line).window.document.querySelectorAll("sup a");
      let sups_replace_line = line;
      sups.forEach((sup) => {
        const reference_number = sup.textContent;
        const oldString = sup.outerHTML;
        sup.href = "#" + currentSectionId + "-" + reference_number;
        const newString = sup.outerHTML;
        sups_replace_line = sups_replace_line.replaceAll(oldString, newString);
      });
      lines[i] = sups_replace_line;
    }

    // add correct id to reference entries
    if (line.includes("References")) {
      let reference_number = 1;
      while (!line.includes("</ol>")) {
        if (line.includes("<li")) {
          lines[i] = lines[i].replace("<li", `<li id="${currentSectionId}-[${reference_number}]"`);
          reference_number += 1;
        }
        i++;
        line = lines[i];
      }
    }
  }
  document.querySelector("body").innerHTML = lines.join("\n");

  // write new index html ------------------------------------------------------------
  let html = `
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="A fan site for Yu-Gi-Oh!'s Comprehensive Rules" />
        <!--
        -->
        <meta name="viewport" content="width=device-width, initial-scale=0.5"/>
        <title>Yu-Gi-Oh! Comprehensive Rules</title>

        <link rel="stylesheet" href="styles.css" />
        <script src="script.js" type="text/javascript" defer></script>

        <script type="text/javascript" defer="" src="./tippy/render.js.download"></script>
        <script type="text/javascript" defer="" src="./tippy/tooltip.js.download"></script>
        <script defer="" src="./tippy/core@2" type="text/javascript"></script>
        <script defer="" src="./tippy/tippy.js@6" type="text/javascript"></script>
        <link rel="stylesheet" href="./tippy/tooltips.css" />

    </head>
    <body>
  `;
  html += document.querySelector("body").innerHTML + "\n</body>\n</html>";

  // "unfold" all <details> ------------------------------------------------------------
  // html = html.replaceAll("<details", "<details open")

  // no images ------------------------------------------------------------
  // html = html.replaceAll("<img", "<img_");

  fs.writeFileSync("index.html", html, { flag: "w+" }, (err) => {
    if (err) return console.log(err);
  });

  console.log("Done build");
}

main();

async function fix() {
  // load index
  const document = readHTML("build_site/index.html");

  // merge includes
  const includes = document.querySelectorAll("include");
  if (includes.length < 1) return;
  for (const element of includes) {
    const section_name = element.textContent.replaceAll("\n", "").replaceAll(" ", "");
    const section = readHTML(section_name.replace("sections", "sections - Copy"));
    let lines = section.querySelector("body").innerHTML.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('id="')) {
        const elems = new JSDOM(line + "</li>").window.document.querySelectorAll("h1, h2, h3, h4, li");
        let replaced_line = line;
        elems.forEach((elem) => {
          const oldString = elem.outerHTML;
          elem.id = "";
          const newString = elem.outerHTML.replaceAll(' id=""', ``);
          replaced_line = replaced_line.replaceAll(oldString, newString);
        });
        lines[i] = replaced_line;
      }
    }
    element.innerHTML = lines.join("\n");

    fs.writeFileSync(section_name, lines.join("\n"), { flag: "w+" }, (err) => {
      if (err) return console.log(err);
    });
  }
  console.log("Done fix");
}

// fix();
