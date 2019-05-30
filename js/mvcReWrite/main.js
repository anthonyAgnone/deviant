'use strict'

const Controller = require('./controller')
const Display = require('./display')
const Game = require('./game')
const Engine = require('./engine')

///////////////////
//// FUNCTIONS ////
///////////////////

const keyDownUp = function(event) {
  controller.keyDownUp(event.type, event.keyCode)
}

const handleMouseDown = function(event) {
  controller.handleMouseDown(event.button)
}

const handleMouseUp = function(event) {
  controller.handleMouseUp(event.which)
}

const resize = function(event) {
  display.resize(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    game.world.height / game.world.width
  )
  display.render()
}

const render = function() {
  display.fill(game.world.background_color) // Clear background to game's background color.
  display.drawRectangle(
    game.world.player.x,
    game.world.player.y,
    game.world.player.width,
    game.world.player.height,
    game.world.player.color
  )
  display.render()
}

const update = function() {
  if (controller.left.active) {
    game.world.player.moveLeft()
  }
  if (controller.right.active) {
    game.world.player.moveRight()
  }
  if (controller.space.active) {
    game.world.player.jump()
    controller.space.active = false
  }

  if (controller.esc.active) {
    game.world.toggleMenu()
    controller.esc.active = false
  }

  if (controller.leftMouseDown) {
    game.world.player.toggleGrapple()
  }

  if (controller.leftMouseUp) {
    game.world.player.toggleGrapple()
  }

  game.update()
}

/////////////////
//// OBJECTS ////
/////////////////

const controller = new Controller()
const display = new Display(document.getElementById('canvas'))
const game = new Game()
const engine = new Engine(1000 / 60, render, update)

////////////////////
//// INITIALIZE ////
////////////////////

/* This is very important. The buffer canvas must be pixel for pixel the same
  size as the world dimensions to properly scale the graphics. All the game knows
  are player location and world dimensions. We have to tell the display to match them. */
display.buffer.canvas.height = game.world.height
display.buffer.canvas.width = game.world.width

window.addEventListener('keydown', keyDownUp)
window.addEventListener('keyup', keyDownUp)
window.addEventListener('mousedown', handleMouseDown)
window.addEventListener('mouseup', handleMouseUp)
window.addEventListener('resize', resize)

resize()

engine.start()
