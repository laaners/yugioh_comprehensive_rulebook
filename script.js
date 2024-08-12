Array.from(document.body.querySelectorAll("h1 + a, h2 + a, h3 + a, h4 + a")).forEach((section_header) => {
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

Array.from(document.body.querySelectorAll(".tooltip-anchor")).forEach((section_header) => {
  section_header.addEventListener("click", (event) => {
    return;
  });
});
