const Game = function() {
  this.world = {
    isMenu: false,

    background_color: 'rgba(40,48,56,1)',

    friction: 0.9,
    gravity: 2.5,

    player: new Game.Player(),

    height: 1080,
    width: 1920,

    collideObject: function(object) {
      if (object.x < 0) {
        object.x = 0
        object.velocity_x = 0
      } else if (object.x + object.width > this.width) {
        object.x = this.width - object.width
        object.velocity_x = 0
      }
      if (object.y < 0) {
        object.y = 0
        object.velocity_y = 0
      } else if (object.y + object.height > this.height) {
        object.jumping = false
        object.y = this.height - object.height
        object.velocity_y = 0
      }
    },

    update: function() {
      this.player.velocity_y += this.gravity
      this.player.update()

      this.player.velocity_x *= this.friction
      this.player.velocity_y *= this.friction

      this.collideObject(this.player)
    },

    toggleMenu: function() {
      const menu = document.querySelector('.menu-screen')
      if (!this.isMenu) {
        menu.style.display = 'flex'
        this.isMenu = true
        return
      }
      menu.style.display = 'none'
      this.isMenu = false
    }
  }

  this.update = function() {
    this.world.update()
  }
}

Game.prototype = { constructor: Game }

Game.Player = function(x, y) {
  this.color = '#ff0000'
  this.height = 138
  this.jumping = true
  this.grappling = false
  this.wallSlide = false
  this.isDead = false
  this.velocity_x = 0
  this.velocity_y = 0
  this.width = 136
  this.x = 100
  this.y = 50
}

Game.Player.prototype = {
  constructor: Game.Player,

  jump: function() {
    if (!this.jumping) {
      this.color = '#' + Math.floor(Math.random() * 16777216).toString(16) // Change to random color
      /* toString(16) will not add a leading 0 to a hex value, so this: #0fffff, for example,
      isn't valid. toString would cut off the first 0. The code below inserts it. */
      if (this.color.length != 7) {
        this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6)
      }

      this.jumping = true
      this.velocity_y -= 55
    }
  },

  moveLeft: function() {
    this.velocity_x -= 1
  },
  moveRight: function() {
    this.velocity_x += 1
  },
  grapple: function() {
    if (!grappling) console.log('I am not grappling')
    else console.log('I am grappling')
  },
  toggleGrapple: function() {
    this.grapple = !this.grapple
  },

  update: function() {
    this.x += this.velocity_x
    this.y += this.velocity_y
  }
}

module.exports = Game
