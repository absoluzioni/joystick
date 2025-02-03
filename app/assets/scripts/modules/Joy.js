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
      let position = this.getRandomPosition(5300, 2700);
      textElement.style.left = `${position.x}px`;
      textElement.style.top = `${position.y}px`;
      textElement.style.width = `400px`;
      textElement.style.height = `200px`;
      this.container.appendChild(textElement);
    }

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
    console.log(this.dragging);
    this.moveView();
  }

  moveView() {
    if (this.dragging) {
      this.posX -= this.speedX;
      this.posY -= this.speedY;
      this.posX = Math.max(Math.min(this.posX, 0), -4760);
      this.posY = Math.max(Math.min(this.posY, 0), -1960);
      console.log(this.posX + " " + this.posY);
      this.container.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    }
  }
}

export default Joy;
