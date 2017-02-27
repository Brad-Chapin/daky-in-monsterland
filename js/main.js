$( document ).ready(function() {
var game = new Phaser.Game(650, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image("dakysprite", "assets/dakysprite.png");
}

function create() {
  game.add.sprite(0, 0, 'dakysprite');
}

function update() {
}
});
