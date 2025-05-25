// AI Interactive Background
class AIBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.className = 'ai-bg-canvas';
    document.body.prepend(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(90, 79, 207, ${Math.random() * 0.5 + 0.1})`
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update particles
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Reset particles that go off screen
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      
      // Draw particles
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Neural Network Visualization
class NeuralNetworkViz {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.createSVG();
    this.addEventListeners();
  }

  createSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 300");
    svg.classList.add("neural-network");
    
    // Create layers (input, hidden, output)
    this.createLayer(svg, 150, 50, 3, "input-node"); // Input layer
    this.createLayer(svg, 400, 100, 5, "hidden-node"); // Hidden layer
    this.createLayer(svg, 650, 50, 2, "output-node"); // Output layer
    
    // Create connections
    this.createConnections(svg);
    
    // Add controls
    const controls = document.createElement("div");
    controls.className = "neural-controls";
    controls.innerHTML = `
      <button class="neural-btn" id="run-network">Run Simulation</button>
      <button class="neural-btn" id="reset-network">Reset</button>
    `;
    
    this.container.appendChild(svg);
    this.container.appendChild(controls);
    
    // Animate on load
    setTimeout(() => this.animateConnections(), 1000);
  }

  createLayer(svg, x, y, count, className) {
    const svgNS = svg.namespaceURI;
    const spacing = 200 / (count + 1);
    
    for (let i = 1; i <= count; i++) {
      const node = document.createElementNS(svgNS, "circle");
      node.setAttribute("cx", x);
      node.setAttribute("cy", y + (i * spacing));
      node.setAttribute("r", 10);
      node.classList.add("neural-node", className);
      svg.appendChild(node);
    }
  }

  createConnections(svg) {
    const svgNS = svg.namespaceURI;
    // Simplified connections between layers
    const inputNodes = svg.querySelectorAll('.input-node');
    const hiddenNodes = svg.querySelectorAll('.hidden-node');
    const outputNodes = svg.querySelectorAll('.output-node');
    
    // Connect input to hidden
    inputNodes.forEach(input => {
      hiddenNodes.forEach(hidden => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M${input.getAttribute('cx')},${input.getAttribute('cy')} 
                          C${input.getAttribute('cx')+100},${input.getAttribute('cy')} 
                           ${hidden.getAttribute('cx')-100},${hidden.getAttribute('cy')} 
                           ${hidden.getAttribute('cx')},${hidden.getAttribute('cy')}`);
        path.classList.add("neural-connection");
        svg.appendChild(path);
      });
    });
    
    // Connect hidden to output
    hiddenNodes.forEach(hidden => {
      outputNodes.forEach(output => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M${hidden.getAttribute('cx')},${hidden.getAttribute('cy')} 
                          C${hidden.getAttribute('cx')+100},${hidden.getAttribute('cy')} 
                           ${output.getAttribute('cx')-100},${output.getAttribute('cy')} 
                           ${output.getAttribute('cx')},${output.getAttribute('cy')}`);
        path.classList.add("neural-connection");
        svg.appendChild(path);
      });
    });
  }

  animateConnections() {
    document.querySelectorAll('.neural-connection').forEach((conn, i) => {
      conn.style.animation = `draw ${Math.random() * 2 + 1}s ${i * 0.1}s forwards`;
    });
  }

  pulseNetwork() {
    const connections = document.querySelectorAll('.neural-connection');
    connections.forEach((conn, i) => {
      setTimeout(() => {
        conn.style.stroke = 'rgba(122, 111, 245, 0.8)';
        conn.style.strokeWidth = '3';
        setTimeout(() => {
          conn.style.stroke = 'rgba(122, 111, 245, 0.3)';
          conn.style.strokeWidth = '2';
        }, 300);
      }, i * 100);
    });
  }

  addEventListeners() {
    document.getElementById('run-network')?.addEventListener('click', () => this.pulseNetwork());
    document.getElementById('reset-network')?.addEventListener('click', () => {
      document.querySelectorAll('.neural-connection').forEach(conn => {
        conn.style.strokeDashoffset = '1000';
        conn.style.animation = 'none';
      });
      setTimeout(() => this.animateConnections(), 500);
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new AIBackground();
  new NeuralNetworkViz('neural-network-about'); // For about page
  new NeuralNetworkViz('neural-network-projects'); // For projects page
});