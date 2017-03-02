$( document ).ready(function() {

var game = new Phaser.Game(704, 512, Phaser.AUTO, 'daky', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap("dakymap", "assets/tiles/DIMTileMap.json", null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tiles", "assets/tiles/terrain.png");
  game.load.image("dakysprite", "assets/spritedakyfront.png");
  game.load.image("monst1", "assets/monst1.png");
  game.load.image("monst2", "assets/monst2.png");
  game.load.image("monst3", "assets/monst3.png");
  game.load.image("fire", "assets/fire.png");

}
var map, layer, player, monsters, score, wave, fires;
var moved = false;
var firebreath = 1;

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
  fires = game.add.group();
  fires.enableBody = true;

  for (let i = 0; i < 6; i++){
    var monster;
    var whichMonst = Math.floor(Math.random()*3);
    var x = Math.floor(Math.random()*21)*32;
    var y = Math.floor(Math.random()*15)*32;
    if ((x == player.x) && (y == player.y)){
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
    fire1 = fires.create(player.x-32, player.y-32, "fire");
    fire2 = fires.create(player.x, player.y-32, "fire");
    fire3 = fires.create(player.x+32, player.y-32, "fire");
    fire4 = fires.create(player.x-32, player.y,"fire");
    fire5 = fires.create(player.x+32, player.y, "fire");
    fire6 = fires.create(player.x-32, player.y+32, "fire");
    fire7 = fires.create(player.x, player.y+32, "fire");
    fire8 = fires.create(player.x+32, player.y+32, "fire");
    console.dir(fires);
    timeOut();
  });
  function timeOut(){
    setTimeout(killFire, 1500);
  }
  function killFire (){
    while (fires.children.length > 0){
      fires.children[0].destroy();
    }
  }

  $("#fly").on("click", function (){
    var x = Math.floor(Math.random()*21)*32;
    var y = Math.floor(Math.random()*15)*32;
    player.x =x;
    player.y = y;
    monsterMove();
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
      monsterMove();
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
  game.physics.arcade.collide(monsters, fires)

  // game.physics.arcade.overlap(monsters, monsters, moveIt, null, this);
  game.physics.arcade.overlap(monsters, monsters, killMonsters, null, this);
  game.physics.arcade.overlap(player, monsters, killPlayer, null, this);
  game.physics.arcade.overlap(fires, monsters, killMonsters, null, this);

  function killPlayer (){
    // TODO: write player kill fn
  }

    function killMonsters (monsters, monsters) {
      monsters.children.forEach(function (e){
        e.kill();
        score++;
        console.log(score);
      });
    }

  // end update fn
}

});

// Math.floor(Math.random()*21)*32 returns //(0-22)*32
// Math.floor(Math.random()*15)*32 returns //(0-15)*15
// Math.floor(Math.random()*3) //returns 0-2
