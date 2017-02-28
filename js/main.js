$( document ).ready(function() {

var game = new Phaser.Game(704, 512, Phaser.AUTO, 'daky', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap("dakymap", "assets/tiles/dakygrid.json", null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tiles", "assets/tiles/grass-tiles-2-small.png");
  game.load.image("dakysprite", "assets/dakysprite.png");

}
var map, layer;
function create() {
  map = game.add.tilemap("dakymap");
  map.addTilesetImage("grass", "tiles");
  layer = map.createLayer("layer1");
  layer.resizeWorld();
  game.add.sprite(100, 100, "dakysprite");

}

function update() {
}
});

// BOARD_COLS = Math.floor(game.world.width / GEM_SIZE_SPACED);
// BOARD_ROWS = Math.floor(game.world.height / GEM_SIZE_SPACED);
