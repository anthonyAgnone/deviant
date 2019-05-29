let $ = require("jquery");
const electron = require("electron");
const remote = electron.remote;

function quitApplication() {
  remote.app.exit();
}

$("#start-btn").click(function() {
  $(".menu-screen").css("display", "none");
  $("#canvas").css("display", "block");
  require("./js/renderer.js");
});

$("#exit-btn").click(function() {
  quitApplication();
});

$("#controls-btn").click(function() {
  $("#controlsModal").css({
    opacity: 1,
    zIndex: 9999
  });
});

$(".close").click(function() {
  $(this)
    .closest("section")
    .css({
      opacity: 0,
      zIndex: -1
    });
});
