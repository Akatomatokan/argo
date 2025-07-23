function buildAndVisualize() {
  const keywords = document.getElementById("keywords").value.split(",").map(k => k.trim());
  const text = document.getElementById("text").value;
  const aho = new AhoCorasick();

  for (const word of keywords) aho.addKeyword(word);
  aho.buildFailLinks();

  visualize(aho);
  matchText(text, aho);
}

function visualize(aho) {
  const svg = document.getElementById("automaton");
  svg.innerHTML = "";
  const spacingX = 80;
  const spacingY = 80;
  
  aho.nodes.forEach((node, index) => {
    node.x = spacingX + (index % 8) * spacingX;
    node.y = spacingY + Math.floor(index / 8) * spacingY;
  });

  for (const node of aho.nodes) {
    for (const [ch, child] of Object.entries(node.children)) {
      drawLine(svg, node, child, false);
    }
    if (node.fail && node !== aho.root) {
      drawLine(svg, node, node.fail, true);
    }
  }

  for (const node of aho.nodes) {
    drawNode(svg, node);
  }
}

function drawLine(svg, from, to, isFail) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  if (isFail) line.setAttribute("class", "fail-link");
  svg.appendChild(line);
}

function drawNode(svg, node) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", node.x);
  circle.setAttribute("cy", node.y);
  circle.setAttribute("r", 18);
  if (node.output.length > 0) circle.classList.add("highlight");
  svg.appendChild(circle);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", node.x);
  text.setAttribute("y", node.y + 4);
  text.setAttribute("text-anchor", "middle");
  text.textContent = node.char || "R";
  svg.appendChild(text);
}

function matchText(text, aho) {
  let node = aho.root;
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    while (node && !node.children[ch]) node = node.fail;
    node = node ? node.children[ch] : aho.root;
    if (!node) node = aho.root;
    if (node.output.length > 0) {
      for (const match of node.output) {
        result += `位置 ${i - match.length + 1} に "${match}" を検出\n`;
      }
    }
  }
  document.getElementById("match-result").innerText = result;
}
