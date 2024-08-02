class TableOfContents extends HTMLElement {
  static get observedAttributes() {
    return ["level"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerText = "";
  }

  parseInput(input) {
    const lines = input.trim().split("\n");
    const result = [];
    const stack = [];

    lines.forEach((line) => {
      const level = line.match(/^\t*/)[0].length;
      const id = line.trim().split(" ")[0]
      const title = line.trim().replace(id+" ", "")
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

  render() {
    const headers = Array.from(document.body.querySelectorAll("section-header"));

    let idLevel = [0, 0, 0, 0];
    let toc_string = "";
    for (const header of headers) {
      const level = header.getAttribute("level");
      idLevel[level - 1] += 1;
      for (let i = level; i < 4; i++) idLevel[i] = 0;
      const idString = idLevel.filter((_) => _ > 0).join(".");
      header.id = idString
      header.querySelector("a").href = "#"+idString
      toc_string += "\t".repeat(level - 1) + " " + idString + " " + header.innerText + "\n";
    }

    const toc_json = this.parseInput(toc_string);

    let html = `
      <div class="toc">
    `;

    console.log(toc_json)

    function createList(items) {
      let list = "<ol>";
      items.forEach((item) => {
        const id = item.title.split(" ")[0]
        list += `<li><a href="#${item.id}">${item.title}</a>`;
        if (item.children && item.children.length > 0) {
          list += createList(item.children);
        }
        list += "</li>";
      });
      list += "</ol>";
      return list;
    }

    html += createList(toc_json);

    html += `
      </div>
    `;

    this.innerHTML = html
    this.attachEventListeners();
  }

  attachEventListeners() {}
}

customElements.define("table-of-contents", TableOfContents);
