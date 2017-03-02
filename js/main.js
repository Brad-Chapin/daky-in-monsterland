$( document ).ready(function() {

var game = new Phaser.Game(704, 512, Phaser.AUTO, 'daky', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap("dakymap", "assets/tiles/DIMTileMap.json", null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tiles", "assets/tiles/terrain.png");
  game.load.image("dakysprite", "assets/spritedakyfront.png");
  game.load.image("monst1", "assets/monst1.png");
  game.load.image("monst2", "assets/monst2.png");
  game.load.image("monst3", "assets/monst3.png");

}
var map, layer, player, monsters;
var moved = false;

function create() {

  map = game.add.tilemap("dakymap");
  map.addTilesetImage("Ground", "tiles");
  layer = map.createLayer("Cliffside");
  layer.resizeWorld();
  player = game.add.sprite(352, 224, "dakysprite");

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  monsters = game.add.group();
  monsters.enableBody = true;

  for (let i = 0; i < 6; i++){
    let monster;
    let whichMonst = Math.floor(Math.random()*3);
    let x = Math.floor(Math.random()*21)*32;
    let y = Math.floor(Math.random()*15)*32;
    if ((x == 352) && (y == 224)){
      x+= 64;
      y+= 64;
    }
    if (whichMonst == 0){
      monster = monsters.create (x, y, "monst1");
      game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    }
    else if (whichMonst == 1){
      monster = monsters.create (x, y, "monst2");
      game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    }
    else {
      monster = monsters.create (x, y, "monst3");
      game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    }
    // switch (whichMonst) {
    //   case 0:
    //     monster = monsters.create (x, y, "monst1");
    //     (game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    //     break;
    //   case 1:
    //     monster = monsters.create (x, y, "monst2");
    //     (game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    //     break;
    //   case 2:
    //     monster = monsters.create (x, y, "monst3");
    //     (game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
    //     break;
    // }
  }

  function moveIt (){
    x+= 64;
    y+= 64;
  }

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

// Math.floor(Math.random()*21)*32 returns //(0-22)*32
// Math.floor(Math.random()*15)*32 returns //(0-15)*15
// Math.floor(Math.random()*3) //returns 0-2
