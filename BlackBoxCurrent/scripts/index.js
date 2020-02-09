document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#eeeeee',
    physics: {
        default: 'matter',
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('line', 'sprites/line.png');
  }

  function create ()
  {
    this.matter.world.disableGravity();

    this.add.image(400, 300, 'line').setScale(1, 0.4);
    line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    line.angle = 90;


    var shapes = this.cache.json.get('shapes');

    particle = this.matter.add.sprite(200, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.2);
    particle.setVelocity(6, 0);

    sha05 = this.matter.add.sprite(600, 300, 'sheet', 'sha05', {shape: shapes.sha05});

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        console.log(event, bodyA, bodyB);
        console.log("HIT HIT HIT!");
        particle.setVelocity(0, -6);
    });

  }

  function update (t)
  {

  }

});
