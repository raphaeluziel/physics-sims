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
    this.matter.world.setBounds().disableGravity();

    this.add.image(400, 300, 'line').setScale(1, 0.4);

    var shapes = this.cache.json.get('shapes');

    particle = this.matter.add.sprite(200, 250, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.2);
    particle.setFrictionAir(0).setBounce(1).setFriction(0);
    particle.setAngularVelocity(0).setVelocity(6, 0);


    sha03 = this.matter.add.sprite(600, 300, 'sheet', 'sha03', {shape: shapes.sha03});

  }

});
