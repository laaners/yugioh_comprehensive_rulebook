Array.from(document.body.querySelectorAll("section-header")).forEach((section_header) => {
  section_header.addEventListener("click", (event) => {
    const href = event.currentTarget.getAttribute("id");
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
