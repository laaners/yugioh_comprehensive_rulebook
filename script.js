// copies anchor to clipboard
Array.from(
  document.body.querySelectorAll("h1 + a, h2 + a, h3 + a, h4 + a")
).forEach((section_header) => {
  section_header.addEventListener("click", (event) => {
    const href = event.currentTarget.getAttribute("href");
    const fullUrl = `${window.location.origin}${window.location.pathname}${href}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });
});

// make tooltip clickable
Array.from(document.body.querySelectorAll(".tooltip-anchor")).forEach((obj) => {
  obj.addEventListener("click", (event) => {
    return;
  });
});

// change toc position
document.querySelector("#toc-2-left").addEventListener("click", () => {
  document
    .querySelector(".content-sidebar")
    .classList.remove("content-sidebar-2-top");
  document
    .querySelector(".top-shortcut")
    .classList.remove("top-shortcut-2-top");
  document.querySelector(".sidebar").classList.remove("sidebar-2-top");

  document
    .querySelector(".content-sidebar")
    .classList.add("content-sidebar-2-left");
  document.querySelector(".top-shortcut").classList.add("top-shortcut-2-left");
  document.querySelector(".sidebar").style.right = "auto";
  document.querySelector(".sidebar").style.left = 0;
});

document.querySelector("#toc-2-right").addEventListener("click", () => {
  document
    .querySelector(".content-sidebar")
    .classList.remove("content-sidebar-2-top");
  document
    .querySelector(".top-shortcut")
    .classList.remove("top-shortcut-2-top");
  document
    .querySelector(".content-sidebar")
    .classList.remove("content-sidebar-2-left");
  document
    .querySelector(".top-shortcut")
    .classList.remove("top-shortcut-2-left");
  document.querySelector(".sidebar").classList.remove("sidebar-2-top");

  document.querySelector(".sidebar").style.right = 0;
  document.querySelector(".sidebar").style.left = "auto";
});

document.querySelector("#toc-2-top").addEventListener("click", () => {
  document
    .querySelector(".content-sidebar")
    .classList.remove("content-sidebar-2-left");
  document
    .querySelector(".top-shortcut")
    .classList.remove("top-shortcut-2-left");

  document
    .querySelector(".content-sidebar")
    .classList.add("content-sidebar-2-top");
  document.querySelector(".top-shortcut").classList.add("top-shortcut-2-top");
  document.querySelector(".sidebar").classList.add("sidebar-2-top");
});

// search function
function parseHTMLToJson() {
  const sections = [];
  const stack = [];
  const contentDiv = document.querySelector(".content");

  if (!contentDiv) {
    console.error("Content div not found.");
    return sections;
  }

  let currentContent = "";

  // Function to create a new section
  function createSection(title, id, content) {
    return {
      title,
      id,
      content: content.trim().toLowerCase(),
      children: [],
      active: true,
    };
  }

  // Use NodeIterator to iterate over each node under .content
  const nodeIterator = document.createNodeIterator(
    contentDiv,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.classList.contains("my-header")
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    }
  );

  let currentNode;
  while ((currentNode = nodeIterator.nextNode())) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      // Accumulate text content
      currentContent += currentNode.nodeValue.trim() + " ";
    } else if (
      currentNode.nodeType === Node.ELEMENT_NODE &&
      currentNode.classList.contains("my-header")
    ) {
      // Finalize the current content for the last section before starting a new one
      if (currentContent.trim()) {
        const lastSection = stack[stack.length - 1];
        if (lastSection) {
          lastSection.content += currentContent
            .trim()
            .toLowerCase()
            .split("effect interactions")[0];
        }
        currentContent = ""; // Reset current content
      }

      const titleNode = currentNode.querySelector("h1,h2,h3,h4,h5");
      const id = currentNode
        .querySelector("a")
        .getAttribute("href")
        .replace("#", "");
      if (!titleNode) continue; // Skip if no header tag is found

      const level = parseInt(titleNode.tagName.charAt(1)); // Get the level from 'h1', 'h2', etc.
      const newSection = createSection(
        titleNode.innerText.replace(id + " ", ""),
        id,
        ""
      );

      // Determine where to place the new section in the hierarchy
      if (level === 1) {
        // Top-level section
        sections.push(newSection);
        stack.length = 0; // Clear stack for new top-level section
        stack.push(newSection);
      } else {
        // Handle nested sections
        while (stack.length > 0 && stack.length >= level) {
          stack.pop();
        }

        const parentSection = stack[stack.length - 1];
        if (parentSection) {
          parentSection.children.push(newSection);
        }
        stack.push(newSection); // Push the new section onto the stack
      }
    }
  }

  // Handle any remaining content in the last section
  if (currentContent.trim()) {
    const lastSection = stack[stack.length - 1];
    if (lastSection) {
      lastSection.content += currentContent
        .trim()
        .toLowerCase()
        .split("effect interactions")[0];
    }
  }

  return sections;
}

function createList(items) {
  let list = "<ol>";
  items.forEach((item) => {
    list += `<li style="${
      item.active
        ? "text-decoration: underline; opacity: 1;"
        : "visibility: hidden; height: 0; margin: 0; padding: 0;"
    }"><a href="#${item.id}">${item.title.replace(item.id + " ", "")}</a>`;
    if (item.children && item.children.length > 0) {
      list += createList(item.children);
    }
    list += "</li>";
  });
  list += "</ol>";
  return list;
}

const toc_json = parseHTMLToJson();

function checkChild(elem, regex) {
  if (elem.children.length === 0) {
    let results = null;
    //results = elem.content.match(regex);
    results = elem.title.toLowerCase().match(regex);
    if (results !== null) {
      elem.active = true;
    } else {
      elem.active = false;
    }
  } else {
    for (const child of elem.children) {
      let results = null;
      //results = child.content.match(regex);
      results = child.title.toLowerCase().match(regex);
      if (results !== null) {
        child.active = true;
        checkChild(child, regex);
      } else {
        checkChild(child, regex);
        if (child.children.find((_) => _.active)) {
          child.active = true;
        } else {
          child.active = false;
        }
      }
    }
  }
}

document.querySelector(".search-button").addEventListener("click", () => {
  let regex = document.querySelector(".search-bar").value;
  if (regex.length === 0) return;
  regex = new RegExp(regex.replaceAll(" ", ".*").toLowerCase(), "gi");
  checkChild({ children: toc_json }, regex);
  console.log("done regex search");
  document.querySelector(".toc-content").innerHTML = createList(toc_json);

  document.querySelector(".search-button").style.display = "none";
  document.querySelector(".reset-button").style.display = "block";
});

document.querySelector(".reset-button").addEventListener("click", () => {
  document.querySelector(".search-bar").value = "";
  checkChild({ children: toc_json }, "");
  document.querySelector(".toc-content").innerHTML = createList(toc_json);

  document.querySelector(".search-button").style.display = "block";
  document.querySelector(".reset-button").style.display = "none";
});

//let regex = "";
//regex = /banish.*until.*the.*end.*phase/gi;
//regex = /missing.*the.*timing/gi;
//checkChild({ children: toc_json }, regex);
