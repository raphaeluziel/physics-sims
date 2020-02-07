document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#eeeeee',
    physics: {
        default: 'matter',
        arcade: {
            debug: true
        }
    },
    scene: {
      preload: preload,
      create: create,
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

    var shapes = this.cache.json.get('shapes');

    particle = this.matter.add.sprite(200, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.5);
    //particle.setFrictionAir(0);
    //particle.setBounce(1);
    //particle.setFriction(0.5);
    particle.setAngularVelocity(0);
    particle.setVelocity(6, 0);

    sha01 = this.matter.add.sprite(600, 300, 'sheet', 'sha01', {shape: shapes.sha01});

  }

});
