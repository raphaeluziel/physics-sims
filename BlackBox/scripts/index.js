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
  var shapes; // object of objects of shapes from physics editor
  var shape = []; shape[0] = null; // array of shapes for display, from texture packer
  var buttons = []; buttons[0] = null; var n = 8;
  var particles = [];
  var lastFired = 0;
  var v = 5;
  const Y = 300; // the equilibrium position
  var activeShapeNumber = 1;

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('gun', 'sprites/gun.png');
    //this.load.image('line', 'sprites/line.png');
    this.load.image('box', 'sprites/box.png');
    this.load.image('blackbox', 'sprites/blackbox.png');
    //this.load.image('circleguide', 'sprites/circleguide.png');
    for (let n = 1; n < 11; n++)
    {
      this.load.image('button' + n, 'buttons/button' + n + '.png');
    }
  }

  function create ()
  {
    this.matter.world.disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    gun = this.add.sprite(140, Y + 9, 'gun').setScale(0.4);

    //this.add.image(400, 300, 'line').setScale(1, 0.4);
    //line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    //line.angle = 90;
    //this.add.image(260, 300, 'circleguide');
    this.add.image(600, 300, 'box');


    shapes = this.cache.json.get('shapes');

    for (let n = 1; n < 11; n++)
    {
        // Shapes are all added, but placed outside of the world
        shape[n] = this.matter.add.sprite(-1000, -1000, 'sheet', 'shape' + n, {shape: shapes["shape" + n]});
    }

    // Shape1 is the example.
    shape[1].setPosition(638, 338);

    for (let n = 1; n < 11; n++)
    {
        buttons[n] = this.add.sprite(100 + 48*n, 580, 'button' + n).setScale(0.3).setInteractive();
        buttons[n].on('pointerdown', function (pointer) {
          activeShapeNumber = n;
          for (let m = 1; m < 11; m++)
            m == n ? shape[m].setPosition(600, 300) : shape[m].setPosition(-1000, -1000);
          if (n == 1) shape[n].setPosition(638, 338);
          if (n == 8) shape[n].setPosition(508, 298);
          if (n == 9) shape[n].setPosition(638, 262);
        });
    }

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        bounce[activeShapeNumber - 1](bodyB.parent.gameObject);
    });

    // image of blackbox must be at end to cover all other shapes!
    //this.add.image(600, 300, 'blackbox');

  }

  function update (time)
  {
      if (cursors.up.isDown)
        gun.y += -1;
      else if (cursors.down.isDown)
        gun.y += 1;

      if (cursors.space.isDown && time > lastFired)
      {
        particles.push(this.matter.add.sprite(196, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05));
        particles[particles.length - 1].y = gun.y - 9;
        particles[particles.length - 1].setVelocity(v, 0);
        lastFired = time + 200;
      }

      for (let i = 0; i < particles.length; i++)
        if ((particles[i].x > 800) || (particles[i].x < 0) || (particles[i].y > 600) || (particles[i].y < 0))
        {
            particles[i].destroy();
            particles.splice(i, 1);
        }
  }

  let secondHit = false;
  const bounce = [
      function (particle) // right triangle up
      {
        particle.setVelocity(0, -v);
      },
      function (particle) // large circle
      {
          let y = 300 - particle.y;
          let r = 112;
          if (Math.abs(y) <= r){
            let o = Math.asin(y / r);
            let vx = - v * Math.cos(2 * o);
            let vy = - v * Math.sin(2 * o);
            particle.setVelocity(vx, vy);
          }
      },
      function (particle) // trapezoid
      {
          if (particle.y < Y - 40)
            particle.setVelocity(0, -v);
          else if (particle.y > Y + 40)
            particle.setVelocity(0, v);
          else
            particle.setVelocity(-v, 0);
      },
      function (particle) // large square
      {
          particle.setVelocity(-v, 0);
      },
      function (particle) // small circle
      {
          let y = 300 - particle.y;  console.log(y);
          let r = 52;
          if (Math.abs(y) <= r){
            let o = Math.asin(y / r);
            let vx = - v * Math.cos(2 * o);
            let vy = - v * Math.sin(2 * o);
            particle.setVelocity(vx, vy);
          }
      },
      function (particle) // isosceles triangle
      {
          if (particle.y < Y)
            particle.setVelocity(0, -v);
          else if (particle.y > Y)
            particle.setVelocity(0, v);
          else
            particle.setVelocity(-v, 0);
      },
      function (particle) // moon mirror
      {
          if (particle.y < Y && !secondHit)
          {
              particle.setVelocity(0, v);
              secondHit = true;
          }
          else if (particle.y > Y && !secondHit)
          {
              particle.setVelocity(0, -v);
              secondHit = true;
          }
          else
          {
              particle.setVelocity(-v, 0);
              secondHit = false;
          }
      },
      function (particle) // concave mirror
      {
          let y = 300 - particle.y;
          let r = 240;
          if (Math.abs(y) <= r - 135){
            let o = Math.asin(y / r);
            let vx = - v * Math.cos(2 * o);
            let vy = v * Math.sin(2 * o);
            particle.setVelocity(vx, vy);
        }
      },
      function (particle) // right triangle down
      {
          particle.setVelocity(0, v);
      },
      function (particle) // small square
      {
          particle.setVelocity(-v, 0);
      }
    ]

});
