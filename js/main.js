$( document ).ready(function() {
  // 700x480 game board with 28x32 sprite = 25x15 grid
var game = new Phaser.Game(700, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image("dakysprite", "assets/dakysprite.png");
  game.load.tilemap("dakygrid", "assets//tiles/dakygrid.json", null, Phaser.Tilemap.TILED_JSON);
}

function create() {
  game.add.tilemap("dakygrid");
  game.add.sprite(650, 450, 'dakysprite');
}

function update() {
}
});
