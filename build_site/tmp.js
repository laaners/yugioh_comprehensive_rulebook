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