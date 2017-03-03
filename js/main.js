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
  game.load.image("skull", 'assets/skull.png')

}
var map, layer, player, monster, monsters, fires;
var moved = false;
var wave = 0;
var score = 0;
var firebreath = 1;
var playerSpawn = [352, 224];
var spawnCount = 6;
var spawned = [];
var modal = document.getElementById("myModal");

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
  monsters.physicsBodyType = Phaser.Physics.ARCADE;

  fires = game.add.group();
  fires.enableBody = true;
  fires.physicsBodyType = Phaser.Physics.ARCADE;

  skulls = game.add.group();
  skulls.enableBody = true;
  skulls.physicsBodyType = Phaser.Physics.ARCADE;

  addMonsters();

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
    if (firebreath > 0) {
      fire1 = fires.create(player.x-32, player.y-32, "fire");
      fire2 = fires.create(player.x, player.y-32, "fire");
      fire3 = fires.create(player.x+32, player.y-32, "fire");
      fire4 = fires.create(player.x-32, player.y,"fire");
      fire5 = fires.create(player.x+32, player.y, "fire");
      fire6 = fires.create(player.x-32, player.y+32, "fire");
      fire7 = fires.create(player.x, player.y+32, "fire");
      fire8 = fires.create(player.x+32, player.y+32, "fire");
      firebreath--;
      timeOut();
    }
  });
  function timeOut(){
    setTimeout(killFire, 1000);
  }
  function killFire (){
    while (fires.children.length > 0){
      fires.children[0].destroy();
    }
    monsterMove();
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
  game.physics.arcade.collide(monsters);
  game.physics.arcade.collide(skulls, monsters);
  game.physics.arcade.collide(skulls, player);
  game.physics.arcade.collide(player, monsters);
  game.physics.arcade.collide(monsters, fires)

  game.physics.arcade.collide(skulls, player, skullDeath, null, this);
  game.physics.arcade.collide(skulls, monsters, skullKill, null, this);
  game.physics.arcade.collide(monsters, monsters, killMonsters, null, this);
  game.physics.arcade.collide(player, monsters, monsterDeath, null, this);
  game.physics.arcade.collide(fires, monsters, killMonsters, null, this);

  if (monsters.countLiving() == 0){
  wave++;
  firebreath++;
  spawnCount = (wave * 3) +6;
  resetDaky();
  addMonsters();
  killSkulls();
}

  $("#score").text(monsters.countDead());
  $("#wave").text(wave +1);
  $("#firebreath").text(firebreath);

// end update fn
}
  function skullDeath (player, skulls){
    player.kill();
    gameOver();
  }

  function monsterDeath (player, monsters){
    player.kill();
    gameOver();
  }

  function skullKill (skulls, monster) {
    monster.kill();
  }

    function killSkulls () {
      while (skulls.children.length > 0){
        skulls.children[0].destroy();
      }
    }

  function killMonsters (monster1, monster2) {
        monster1.kill();
        monster2.kill();
        skull = skulls.create(monster1.x, monster2.y, "skull");
    }

  function killWithFire (fire, monster) {
        monster.kill();
      }

      function addMonsters() {
    		spawnPoints = [];
    		spawnPoints.push(player.x + "-" + player.y);
    		for (i = 0; i < spawnCount; i++) {
    			var monster;
    			var check = true;
    			var x;
    			var y;
    			while (check == true) {
    				x = Math.floor(Math.random() * 21) * 32;
    				y = Math.floor(Math.random() * 15) * 32;
    				if (spawnPoints.indexOf(x + "-" + y) == -1) {
    					spawnPoints.push(x + "-" + y);
    					monster = monsters.create(x, y, "monst" + (Math.floor(Math.random() * 3) + 1));
    					check = false;
    				}
    			}
    		}
    	}

  function resetDaky (){
        player.x = 352;
        player.y = 224;
      }

  function moveIt (){
        x+= 64;
        y+= 64;
      }

  function gameOver (){
    modal.style.display = "block";
  }
  $("#myModal").on("click", function (){
    modal.style.display = "hidden";
  })

});
