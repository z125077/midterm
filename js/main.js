// Enhanced AI Background with Mouse Interaction
class AIBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.init();
  }

  init() {
    this.canvas.className = 'ai-bg-canvas';
    document.body.prepend(this.canvas);
    this.resize();
    
    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.min(Math.floor(window.innerWidth / 8), 100);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        baseSize: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(90, 79, 207, ${Math.random() * 0.3 + 0.1})`,
        distance: 0
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      // Mouse interaction
      if (this.mouse.x && this.mouse.y) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        p.distance = Math.sqrt(dx * dx + dy * dy);
        
        if (p.distance < 100) {
          const force = (100 - p.distance) / 100;
          p.x += dx * 0.01 * force;
          p.y += dy * 0.01 * force;
          p.size = p.baseSize * (1 + force * 2);
        }
      }
      
      // Movement
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Boundary check
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      
      // Draw
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Enhanced Neural Network Visualization
class NeuralNetworkViz {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.skillLabels = {
      input: ["Python", "Java", "SQL"],
      hidden: ["ML", "NLP", "Data Science", "TensorFlow", "PyTorch"],
      output: ["Backend", "Cloud"]
    };
    
    this.createSVG();
    this.addEventListeners();
  }

  createSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 350");
    svg.classList.add("neural-network");
    
    // Add gradient definition
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.id = "connection-gradient";
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#5a4fcf");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#7a6ff5");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Create layers with labels
    this.createLayer(svg, 150, 50, 3, "input-node", this.skillLabels.input);
    this.createLayer(svg, 400, 100, 5, "hidden-node", this.skillLabels.hidden);
    this.createLayer(svg, 650, 50, 2, "output-node", this.skillLabels.output);
    
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
    
    // Initial animation
    setTimeout(() => this.animateConnections(), 800);
  }

  createLayer(svg, x, y, count, className, labels) {
    const svgNS = svg.namespaceURI;
    const spacing = 250 / (count + 1);
    
    for (let i = 0; i < count; i++) {
      // Create node
      const node = document.createElementNS(svgNS, "circle");
      node.setAttribute("cx", x);
      node.setAttribute("cy", y + (i * spacing));
      node.setAttribute("r", 12);
      node.classList.add("neural-node", className);
      svg.appendChild(node);
      
      // Add skill label
      const label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", x + 20);
      label.setAttribute("y", y + (i * spacing) + 5);
      label.textContent = labels[i];
      label.classList.add("skill-label");
      svg.appendChild(label);
    }
  }

  createConnections(svg) {
    const svgNS = svg.namespaceURI;
    const inputNodes = svg.querySelectorAll('.input-node');
    const hiddenNodes = svg.querySelectorAll('.hidden-node');
    const outputNodes = svg.querySelectorAll('.output-node');
    
    // Input to Hidden connections
    inputNodes.forEach(input => {
      hiddenNodes.forEach(hidden => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", this.createCurve(
          input.getAttribute('cx'), input.getAttribute('cy'),
          hidden.getAttribute('cx'), hidden.getAttribute('cy')
        ));
        path.classList.add("neural-connection");
        svg.appendChild(path);
      });
    });
    
    // Hidden to Output connections
    hiddenNodes.forEach(hidden => {
      outputNodes.forEach(output => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", this.createCurve(
          hidden.getAttribute('cx'), hidden.getAttribute('cy'),
          output.getAttribute('cx'), output.getAttribute('cy')
        ));
        path.classList.add("neural-connection");
        svg.appendChild(path);
      });
    });
  }

  createCurve(x1, y1, x2, y2) {
    const cp1x = x1 + (x2 - x1) * 0.4;
    const cp1y = y1;
    const cp2x = x2 - (x2 - x1) * 0.4;
    const cp2y = y2;
    return `M${x1},${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  }

  animateConnections() {
    document.querySelectorAll('.neural-connection').forEach((conn, i) => {
      conn.style.animation = `draw ${Math.random() * 1.5 + 1}s ${i * 0.08}s forwards`;
    });
  }

  pulseNetwork() {
    const connections = document.querySelectorAll('.neural-connection');
    connections.forEach((conn, i) => {
      setTimeout(() => {
        conn.classList.add('active-connection');
        setTimeout(() => {
          conn.classList.remove('active-connection');
        }, 1000);
      }, i * 120);
    });
  }

  addEventListeners() {
    document.getElementById('run-network')?.addEventListener('click', () => this.pulseNetwork());
    document.getElementById('reset-network')?.addEventListener('click', () => {
      document.querySelectorAll('.neural-connection').forEach(conn => {
        conn.style.strokeDashoffset = '1000';
        conn.style.animation = 'none';
        conn.classList.remove('active-connection');
      });
      setTimeout(() => this.animateConnections(), 500);
    });
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Only create background on home page
  if (document.querySelector('.hero')) {
    new AIBackground();
  }
  
  // Initialize neural networks where containers exist
  if (document.getElementById('neural-network-about')) {
    new NeuralNetworkViz('neural-network-about');
  }
  
  if (document.getElementById('neural-network-projects')) {
    new NeuralNetworkViz('neural-network-projects');
  }
});