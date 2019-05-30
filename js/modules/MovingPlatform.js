class Rectangle {
  constructor(l, t, w, h) {
    // left, top, width, height

    this.l = this.ol = l // left and old left
    this.r = this.or = l + w // right and old right
    this.t = this.ot = t // top and old top
    this.b = this.ob = t + h // bottom and old bottom
    this.w = w // width
    this.h = h // height
    this.vx = this.vy = 0 // velocity x and y
  }

  /* We can do calculations when we are setting the current position because the current position is new. Avoiding rounding errors isn't as important here. It is important when saving the current position to the old position, however, because the values must not change for the sake of accuracy. */
  setBottom(b) {
    this.b = b
    this.t = b - this.h
  }
  setLeft(l) {
    this.l = l
    this.r = l + this.w
  }
  setRight(r) {
    this.r = r
    this.l = r - this.w
  }
  setTop(t) {
    this.t = t
    this.b = t + this.h
  }
}

class Platform extends Rectangle {
  constructor(l, t, w, h) {
    super(l, t, w, h)

    this.d = Math.random() * Math.PI * 2 // initial movement direction
    this.rotation = Math.random() * Math.PI * 2 // rotation for sine wave movement

    this.frozen = false
  }
  collideBoundaries(l, r, t, b) {
    // collide with the walls

    if (this.l < l) {
      this.d = Math.atan2(Math.sin(this.d), Math.cos(this.d) * -1)
      this.vx *= -1
      this.setLeft(l)
    } else if (this.r > r) {
      this.d = Math.atan2(Math.sin(this.d), Math.cos(this.d) * -1)
      this.vx *= -1
      this.setRight(r)
    }

    if (this.t <= t) {
      this.d = Math.atan2(Math.sin(this.d) * -1, Math.cos(this.d))
      this.vy *= -1
      this.setTop(t)
    } else if (this.b > b) {
      this.d = Math.atan2(Math.sin(this.d) * -1, Math.cos(this.d))
      this.vy *= -1
      this.setBottom(b)
    }
  }

  update() {
    if (!this.frozen) {
      this.vx = Math.cos(this.d) // move in direction
      this.vy = Math.sin(this.d)

      this.rotation += 0.05
      this.vy += Math.sin(this.rotation) // sine wave motion
    }

    this.ob = this.b // update the old positions to the current positions
    this.ol = this.l
    this.or = this.r
    this.ot = this.t

    this.l += this.vx // update the current positions to the new positions
    this.t += this.vy
    this.r = this.l + this.w
    this.b = this.t + this.h
  }
}
