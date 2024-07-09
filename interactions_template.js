function saveImg() {
    document.querySelectorAll('img').forEach(image => { image.crossOrigin = 'Anonymous'; image.src += ' '; })
    html2canvas(document.getElementById('mysvg2'), { allowTaint: true }).then(function (canvas) {
        let link = document.createElement('a');
        link.download = 'div_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
// document.body.querySelector("button").addEventListener("click", saveImg)

const svg = document.getElementById("mysvg")

function drawCard(href, x, y, desc) {
    svg.innerHTML += `<image x="${x}" y="${y}" width="200" height="200" href="${href}"/>`
}

function drawArrow(x1, y1, x2, y2, desc) {
    svg.innerHTML += `
        <!-- Arrow -->
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
        <!-- Arrowhead Definition -->
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
        </defs>
        <!-- Text -->
        <text x="300" y="110" font-family="Arial" font-size="18" fill="black" text-anchor="middle">${desc}</text>
    `
}

drawCard("https://images.ygoprodeck.com/images/cards/97148796.jpg", 50, 25, "ok")
drawCard("https://images.ygoprodeck.com/images/cards/77235086.jpg", 350, 25, "ok")
drawArrow(250, 125, 350, 125, "Tributes")
