async function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");
  for (const element of includes) {
    const file = element.getAttribute("data-include");
    const response = await fetch(file);
    if (response.ok) {
      const text = await response.text();
      element.innerHTML = text;
    } else {
      console.error(`Failed to load ${file}`);
    }
  }
}

async function main() {
  await includeHTML();

  const toc = document.body.querySelector("#index-top")
  toc.render();
  console.log(toc.innerHTML)
}

main();
