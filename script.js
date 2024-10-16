// copies anchor to clipboard
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

// make tooltip clickable
Array.from(document.body.querySelectorAll(".tooltip-anchor")).forEach((obj) => {
  obj.addEventListener("click", (event) => {
    return;
  });
});

// change toc position
document.querySelector("#toc-2-left").addEventListener("click", () => {
  document.querySelector(".content-sidebar").classList.remove("content-sidebar-2-top");
  document.querySelector(".top-shortcut").classList.remove("top-shortcut-2-top");
  document.querySelector(".sidebar").classList.remove("sidebar-2-top");

  document.querySelector(".content-sidebar").classList.add("content-sidebar-2-left");
  document.querySelector(".top-shortcut").classList.add("top-shortcut-2-left");
  document.querySelector(".sidebar").style.right = "auto";
  document.querySelector(".sidebar").style.left = 0;
});

document.querySelector("#toc-2-right").addEventListener("click", () => {
  document.querySelector(".content-sidebar").classList.remove("content-sidebar-2-top");
  document.querySelector(".top-shortcut").classList.remove("top-shortcut-2-top");
  document.querySelector(".content-sidebar").classList.remove("content-sidebar-2-left");
  document.querySelector(".top-shortcut").classList.remove("top-shortcut-2-left");
  document.querySelector(".sidebar").classList.remove("sidebar-2-top");

  document.querySelector(".sidebar").style.right = 0;
  document.querySelector(".sidebar").style.left = "auto";
});

document.querySelector("#toc-2-top").addEventListener("click", () => {
  document.querySelector(".content-sidebar").classList.remove("content-sidebar-2-left");
  document.querySelector(".top-shortcut").classList.remove("top-shortcut-2-left");
  
  document.querySelector(".content-sidebar").classList.add("content-sidebar-2-top");
  document.querySelector(".top-shortcut").classList.add("top-shortcut-2-top");
  document.querySelector(".sidebar").classList.add("sidebar-2-top");
});
