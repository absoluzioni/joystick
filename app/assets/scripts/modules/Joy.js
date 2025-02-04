class Joy {
  constructor() {
    this.container = document.getElementById("container");
    this.joystick = document.getElementById("joystick");
    this.knob = document.getElementById("knob");
    this.posX = 0;
    this.posY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 10;
    this.dragging = false;
    this.events();
  }

  events() {
    for (let i = 0; i < 6; i++) {
      let textElement = document.createElement("div");
      textElement.classList.add("text");
      textElement.innerText = "PAGINA" + (i+1);
      let position = this.getRandomPosition(4300, 1700);
      textElement.style.left = `${position.x}px`;
      textElement.style.top = `${position.y}px`;
      textElement.setAttribute('data-top', position.y);
      textElement.setAttribute('data-left', position.x);
      textElement.style.width = `400px`;
      textElement.style.height = `200px`;
      this.container.appendChild(textElement);
    }

    // Seleziona tutti gli elementi con classe "text"
    const textElements = document.querySelectorAll('.text');

    // Aggiungi event listener per il click a ciascun elemento
    textElements.forEach((element) => {
      let isExpanded = false; // Variabile per tenere traccia dello stato di espansione dell'elemento

      element.addEventListener('click', () => {
        const originalTop = element.getAttribute('data-top');
        const originalLeft = element.getAttribute('data-left');

        if (!isExpanded) {
          // Fai allargare l'elemento fino ad occupare tutto lo schermo visibile
          element.style.position = 'fixed';
          element.style.top = '0';
          element.style.left = '0';
          element.style.width = '100vw';
          element.style.height = '100vh';
          element.style.zIndex = '1000'; // per assicurarsi che l'elemento sia sopra gli altri
          element.style.borderRadius = '0';

          this.container.setAttribute('data-posX', this.posX);
          this.container.setAttribute('data-posY', this.posY);
          this.container.style.transform = `translate(0px, 0px)`;
          window.scrollTo(-originalLeft, -originalTop);
          this.joystick.style.visibility = "hidden";

          isExpanded = true; // Imposta lo stato di espansione a true
        } else {
          // Ritorna l'elemento alle dimensioni e alla posizione originaria
          element.style.position = 'absolute';
          element.style.top = `${originalTop}px`;
          element.style.left = `${originalLeft}px`;
          element.style.width = `400px`;
          element.style.height = `200px`;
          element.style.zIndex = '';
          element.style.borderRadius = '40px';

          const originalPosX = this.container.getAttribute('data-posX');
          const originalPosY = this.container.getAttribute('data-posY');
          this.posX = originalPosX;
          this.posY = originalPosY;
          this.container.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
          this.joystick.style.visibility = "visible";
          
          isExpanded = false; // Imposta lo stato di espansione a false
        }
      });
    });

    this.joystick.addEventListener("mousedown", e => this.startDrag(e));
    this.joystick.addEventListener("touchstart", e => this.startDrag(e));
    document.addEventListener("mouseup", e => this.stopDrag(e));
    document.addEventListener("touchend", e => this.stopDrag(e));
    document.addEventListener("mousemove", e => this.drag(e));
    document.addEventListener("touchmove", e => this.drag(e));

    this.moveView();
  }

  getRandomPosition(maxX, maxY) {
    return { x: Math.random() * maxX, y: Math.random() * maxY };
  }

  startDrag(e) {
    this.dragging = true;
  }

  stopDrag(e) {
    this.dragging = false;
    this.speedX = 0;
    this.speedY = 0;
    this.knob.style.transform = `translate(0px, 0px)`;
  }

  drag(e) {
    if (!this.dragging) return;
    let rect = this.joystick.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left - 50;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top - 50;
    let distance = Math.sqrt(x * x + y * y);
    let angle = Math.atan2(y, x);
    let maxDist = 40;
    if (distance > maxDist) {
      x = Math.cos(angle) * maxDist;
      y = Math.sin(angle) * maxDist;
    }
    this.speedX = (x / maxDist) * this.maxSpeed;
    this.speedY = (y / maxDist) * this.maxSpeed;
    this.knob.style.transform = `translate(${x}px, ${y}px)`;
    this.moveView();
  }

  moveView() {
    if (this.dragging) {
      this.posX -= this.speedX;
      this.posY -= this.speedY;
      this.posX = Math.max(Math.min(this.posX, 0), -3760);
      this.posY = Math.max(Math.min(this.posY, 0), -960);
      this.container.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    }
  }
}

export default Joy;
