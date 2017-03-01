$( document ).ready(function() {

var game = new Phaser.Game(704, 512, Phaser.AUTO, 'daky', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap("dakymap", "assets/tiles/DIMTileMap.json", null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tiles", "assets/tiles/terrain.png");
  game.load.image("dakysprite", "assets/spritedakyfront.png");

}
var map, layer, player;

function create() {
  map = game.add.tilemap("dakymap");
  map.addTilesetImage("Ground", "tiles");
  layer = map.createLayer("Cliffside");
  layer.resizeWorld();
  player = game.add.sprite(352, 224, "dakysprite");

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  // controls start
  $("#fire").on("click", function (){
    // TODO: set up kill function and display
  });

  $("#fly").on("click", function (){
    // TODO: set up "fly" logic
  });

  $("#upLeft").on("click", function (){
    if ((player.x!=0) && (player.y!=0)){
      player.y-=32;
      player.x-=32;
    }
  });

  $("#up").on("click", function (){
    player.y -= 32;
  });

  $("#upRight").on("click", function (){
    if ((player.x!=672) && (player.y!=0)){
      player.y-=32;
      player.x+=32;
    }
  });

  $("#left").on("click", function (){
    player.x-=32;
  });

  $("#pass").on("click", function (){
    // TODO: pass logic
  });

  $("#right").on("click", function (){
    player.x+=32;
  });

  $("#downLeft").on("click", function (){
    if ((player.x!=0) && (player.y!=480)){
      player.y+=32;
      player.x-=32;
    }
  });

  $("#down").on("click", function (){
    player.y+=32;
  });

  $("#downRight").on("click", function (){
    if ((player.x!=672) && (player.y!=480)){
      player.x+=32;
      player.y+=32;
    }
  });
  // controls end
}

function update() {
  // begin update fn


  // end update fn
}
});

// BOARD_COLS = Math.floor(game.world.width / GEM_SIZE_SPACED);
// BOARD_ROWS = Math.floor(game.world.height / GEM_SIZE_SPACED);
