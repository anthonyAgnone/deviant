const Controller = function() {
  this.left = new Controller.ButtonInput()
  this.right = new Controller.ButtonInput()
  this.space = new Controller.ButtonInput()
  this.esc = new Controller.ButtonInput()
  this.q = new Controller.ButtonInput()
  this.e = new Controller.ButtonInput()
  this.leftMouseUp = true
  this.leftMouseDown = false
  this.rightMouseUp = true
  this.rightMouseDown = false

  this.keyDownUp = function(type, key_code) {
    var down = type == 'keydown' ? true : false

    switch (key_code) {
      case 65:
        this.left.getInput(down)
        break
      case 32:
        this.space.getInput(down)
        break
      case 68:
        this.right.getInput(down)
        break
      case 81:
        this.q.getInput(down)
        break
      case 69:
        this.e.getInput(down)
        break
      case 27:
        this.esc.getInput(down)
        break
    }
  }

  this.handleMouseDown = function(which) {
    switch (which) {
      case 0:
        this.leftMouseDown = true
        this.leftMouseUp = false
        break
      case 3:
        this.rightMouseDown = true
        this.rightMouseUp = false
    }
  }

  this.handleMouseUp = function(button) {
    this.down = false
    switch (button) {
      case 0:
        this.leftMouseUp = true
        this.leftMouseDown = false
        break
      case 2:
        this.rightMouseUp = true
        this.rightMouseDown = false
    }
  }
}

Controller.prototype = {
  constructor: Controller
}

Controller.ButtonInput = function() {
  this.active = this.down = false
}

Controller.ButtonInput.prototype = {
  constructor: Controller.ButtonInput,

  getInput: function(down) {
    if (this.down != down) this.active = down
    this.down = down
  }
}

module.exports = Controller
