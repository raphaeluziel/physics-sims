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
  var particles = [];
  var lastFired = 0;
  var v = 6;
  const Y = 300; // the equilibrium position
  var n = -1;

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('gun', 'sprites/gun.png');
    this.load.image('button6', 'sprites/button6.png');
    this.load.image('line', 'sprites/line.png');
  }

  function create ()
  {
    this.matter.world.disableGravity();
    cursors = this.input.keyboard.createCursorKeys();




    gun = this.add.sprite(140, Y + 9, 'gun').setScale(0.4);

    this.add.image(400, 300, 'line').setScale(1, 0.4);
    line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    line.angle = 90;

    shapes = this.cache.json.get('shapes');

    //this.matter.add.sprite(600, 300, 'sheet', 'shape6', {shape: shapes["shape6"]});

    var button6 = this.add.sprite(400, 550, 'button6').setScale(0.3).setInteractive();
    button6.on('pointerdown', function (pointer) {
      console.log("JUST");
      n = 6;
      //this.matter.add.sprite(600, 300, 'sheet', 'shape6', {shape: shapes["shape6"]});
    });

    if (n > 0)
      this.matter.add.sprite(600, 300, 'sheet', 'shape' + n, {shape: shapes["shape" + n]});

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        bounce6(bodyB.parent.gameObject);
    });

  }

  function update (time)
  {
    if (n > 0){
      this.matter.add.sprite(600, 300, 'sheet', 'shape' + n, {shape: shapes["shape" + n]});
      n = -1;
    }

      if (cursors.up.isDown)
        gun.y += -2;
      else if (cursors.down.isDown)
        gun.y += 2;;

      if (cursors.space.isDown && time > lastFired)
      {
        particles.push(this.matter.add.sprite(196, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05));
        particles[particles.length - 1].y = gun.y - 9;
        particles[particles.length - 1].setVelocity(v, 0);
        lastFired = time + 50;
      }

      for (let i = 0; i < particles.length; i++)
        if ((particles[i].x > 800) || (particles[i].x < 0) || (particles[i].y > 500) || (particles[i].y < 0))
        {
            particles[i].destroy();
            particles.splice(i, 1);
        }
  }


  function bounce6 (particle)
  {
      if (particle.y < Y)
        particle.setVelocity(0, -v);
      else if (particle.y > Y)
        particle.setVelocity(0, v);
      else
        particle.setVelocity(-v, 0);
  }

});
