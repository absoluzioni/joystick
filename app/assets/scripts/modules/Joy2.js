class Joy {
  constructor() {
    this.container = document.getElementById("container");
    this.joystick = document.getElementById("joystick");
    this.knob = document.getElementById("knob");
    this.posX = 0;
    this.posY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 20;
    this.dragging = false;
    this.events();
  }

  events() {
    this.joystick.addEventListener("mousedown", (e) => this.startDrag(e));
    this.joystick.addEventListener("touchstart", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("touchmove", (e) => this.drag(e));
    document.addEventListener("mouseup", (e) => this.stopDrag(e));
    document.addEventListener("touchend", (e) => this.stopDrag(e));
  }

  startDrag(e) {
    this.dragging = true;
  }

  drag(e) {
    if (this.dragging) {
      const x = e.clientX || e.touches[0].clientX;
      const y = e.clientY || e.touches[0].clientY;
      const dx = x - this.posX;
      const dy = y - this.posY;
      this.speedX = Math.min(this.maxSpeed, Math.max(-this.maxSpeed, dx / 10));
      this.speedY = Math.min(this.maxSpeed, Math.max(-this.maxSpeed, dy / 10));
      this.posX = x;
      this.posY = y;
      this.knob.style.transform = `translate(${this.speedX}px, ${this.speedY}px)`;
      window.scrollBy(this.speedX, this.speedY);
    }
  }

  stopDrag(e) {
    this.dragging = false;
    this.speedX = 0;
    this.speedY = 0;
    this.knob.style.transform = `translate(0px, 0px)`;
  }
}