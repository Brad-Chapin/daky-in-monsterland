$( document ).ready(function() {
  // 700x480 game board with 28x32 sprite = 25x15 grid
var game = new Phaser.Game(704, 512, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image("dakysprite", "assets/dakysprite.png");
}
var grid;
function create() {
}

function update() {
}
});
