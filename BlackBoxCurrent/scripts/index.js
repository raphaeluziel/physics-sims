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
  var cursors;
  var gun;
  var shapes;
  var lastFired = 0;

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('gun', 'sprites/gun.png');
    this.load.image('line', 'sprites/line.png');
  }

  function create ()
  {
    this.matter.world.disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    gun = this.add.sprite(200, 300, 'gun').setScale(0.4);

    this.add.image(400, 300, 'line').setScale(1, 0.4);
    line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    line.angle = 90;

    shapes = this.cache.json.get('shapes');

    particle = this.matter.add.sprite(200, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05);
    particle.setVelocity(6, 0);

    sha06 = this.matter.add.sprite(600, 300, 'sheet', 'sha06', {shape: shapes.sha06});

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        console.log(event, bodyA, bodyB);
        console.log("HIT HIT HIT!");
        particle.setVelocity(0, -6);
    });

  }

  function update (time)
  {
      if (cursors.up.isDown)
      {
        console.log("moving");
        gun.y += -2;
      }

      else if (cursors.down.isDown)
      {
          gun.y += 2;;
      }

      if (cursors.space.isDown)
      {
        gun.angle += -2;
      }
      if (cursors.space.isDown && time > lastFired)
      {
        particle = this.matter.add.sprite(200, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05);
        particle.setVelocity(6 * Math.cos(gun.angle), 6 * Math.sin(gun.angle));
        lastFired = time + 50;
      }
  }

});
