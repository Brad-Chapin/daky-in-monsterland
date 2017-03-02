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
var map, layer, player, monsters, score, wave;
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
    var monster;
    var whichMonst = Math.floor(Math.random()*3);
    var x = Math.floor(Math.random()*21)*32;
    var y = Math.floor(Math.random()*15)*32;
    if ((x == 352) && (y == 224)){
      moveIt();
    }
    switch (whichMonst) {
      case 0:
        monster = monsters.create (x, y, "monst1");
        game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
        break;
      case 1:
        monster = monsters.create (x, y, "monst2");
        game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
        break;
      case 2:
        monster = monsters.create (x, y, "monst3");
        game.physics.arcade.overlap(monster, monsters, moveIt, null, this);
        break;
    }
  }

  function monsterMove () {
    monsters.children.forEach(function (e){
      switch (true) {
        case ((e.x < player.x) && (e.y < player.y)):
          e.x+=32;
          e.y+=32;
          break;
        case ((e.x > player.x) && (e.y > player.y)):
          e.x-=32;
          e.y-=32;
          break;
        case ((e.x > player.x) && (e.y < player.y)):
          e.x-=32;
          e.y+=32;
          break;
        case ((e.x < player.x) && (e.y > player.y)):
          e.x+=32;
          e.y-=32;
          break;
        case ((e.x == player.x) && (e.y < player.y)):
          e.y+=32;
          break;
        case ((e.x == player.x) && (e.y > player.y)):
          e.y-=32;
          break;
        case ((e.x < player.x) && (e.y == player.y)):
          e.x+=32;
          break;
        case ((e.x > player.x) && (e.y == player.y)):
          e.x-=32;
          break;
      }
    });
    moved = false;
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
      moved = true;
      monsterMove();
    }
  });

  $("#up").on("click", function (){
    if (player.y!=0){
      player.y -= 32;
      moved = true;
      monsterMove();
    }
  });

  $("#upRight").on("click", function (){
    if ((player.x!=672) && (player.y!=0)){
      player.y-=32;
      player.x+=32;
      moved = true;
      monsterMove();
    }
  });

  $("#left").on("click", function (){
    if (player.x!=0){
      player.x-=32;
      moved = true;
      monsterMove();
    }
  });

  $("#pass").on("click", function (){
    moved= true;
    monsterMove();
  });

  $("#right").on("click", function (){
    if (player.x!=672){
      player.x+=32;
      moved = true;
      monsterMove();
    }
  });

  $("#downLeft").on("click", function (){
    if ((player.x!=0) && (player.y!=480)){
      player.y+=32;
      player.x-=32;
      moved = true;
    }
  });

  $("#down").on("click", function (){
    if (player.y!=480){
      player.y+=32;
      moved = true;
      monsterMove();
    }
  });

  $("#downRight").on("click", function (){
    if ((player.x!=672) && (player.y!=480)){
      player.x+=32;
      player.y+=32;
      moved = true;
      monsterMove();
    }
  });
  // controls end
}

function update() {
  // begin update fn
  game.physics.arcade.collide(monsters, monsters);
  game.physics.arcade.collide(player, monsters);

  game.physics.arcade.overlap(monsters, monsters, killMonsters, null, this);
  game.physics.arcade.overlap(player, monsters, killPlayer, null, this);

  function killPlayer (){
    // TODO: write player kill fn
  }

  // end update fn
}

  function killMonsters (... monsters) {
    for (let i = 0; i < arguments.length; i++){
      monster.kill();
      score++;
    }
  }
});

// Math.floor(Math.random()*21)*32 returns //(0-22)*32
// Math.floor(Math.random()*15)*32 returns //(0-15)*15
// Math.floor(Math.random()*3) //returns 0-2
