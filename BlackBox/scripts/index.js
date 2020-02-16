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
  var v = 5;
  const Y = 300; // the equilibrium position
  var n = 7;

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('gun', 'sprites/gun.png');
    this.load.image('button6', 'sprites/button6.png');
    this.load.image('line', 'sprites/line.png');
    this.load.image('box', 'sprites/box.png');
  }

  function create ()
  {
    this.matter.world.disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    gun = this.add.sprite(140, Y + 9, 'gun').setScale(0.4);

    this.add.image(400, 300, 'line').setScale(1, 0.4);
    line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    line.angle = 90;

    this.add.image(600, 300, 'box');

    shapes = this.cache.json.get('shapes');

    shape7 = this.matter.add.sprite(600, 300, 'sheet', 'shape' + n, {shape: shapes["shape" + n]});
    //shape1.setPosition(638, 338);
    // DONT THINK YOU SHOULD USE THIS ONE shape7.setPosition(565, 300);
    //shape9.setPosition(638, 262);

    var button6 = this.add.sprite(400, 550, 'button6').setScale(0.3).setInteractive();

    button6.on('pointerdown', function (pointer) {
      //shape0.setVisible(true);
    });

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //if (shape0.visible)
          bounce7(bodyB.parent.gameObject);
    });

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
        lastFired = time + 500;
      }

      for (let i = 0; i < particles.length; i++)
        if ((particles[i].x > 800) || (particles[i].x < 0) || (particles[i].y > 600) || (particles[i].y < 0))
        {
            particles[i].destroy();
            particles.splice(i, 1);
        }
  }

  function bounce1 (particle) // right triangle up
  {
    particle.setVelocity(0, -v);
  }
  function bounce2 (particle) // large circle
  {
      let y = 300 - particle.y;
      let r = 112;
      if (y <= r){
        let o = Math.asin(y / r);
        let vx = - v * Math.cos(2 * o);
        let vy = - v * Math.sin(2 * o);
        particle.setVelocity(vx, vy);
      }
  }
  function bounce3 (particle) // trapezoid
  {
      if (particle.y < Y - 40)
        particle.setVelocity(0, -v);
      else if (particle.y > Y + 40)
        particle.setVelocity(0, v);
      else
        particle.setVelocity(-v, 0);
  }
  function bounce4 (particle) // large square
  {
      particle.setVelocity(-v, 0);
  }
  function bounce5 (particle) // small circle
  {
      let y = 300 - particle.y;  console.log(y);
      let r = 52;
      if (y <= r){
        let o = Math.asin(y / r);
        let vx = - v * Math.cos(2 * o);
        let vy = - v * Math.sin(2 * o);
        particle.setVelocity(vx, vy);
      }
  }
  function bounce6 (particle) // isosceles triangle
  {
      if (particle.y < Y)
        particle.setVelocity(0, -v);
      else if (particle.y > Y)
        particle.setVelocity(0, v);
      else
        particle.setVelocity(-v, 0);
  }
  let secondHit = false;
  function bounce7 (particle) // moon mirror
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
  }
  function bounce8 (particle) // rconcave mirror
  {
      particle.setVelocity(0, v);
  }
  function bounce9 (particle) // right triangle down
  {
      particle.setVelocity(0, v);
  }
  function bounce10 (particle) // small square
  {
      particle.setVelocity(-v, 0);
  }

});
