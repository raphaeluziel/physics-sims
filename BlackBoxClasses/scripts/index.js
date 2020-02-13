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
  var n = 6;

///////////////////////////////////////////////////////////////////////////////
// https://phasergames.com/extend-a-sprite-in-phaser-3/?mc_cid=3f4ee26e5d&mc_eid=a4d9ee0291
  class Isosceles extends Phaser.GameObjects.Sprite{

    constructor(config) {
      super(config.scene, config.x, config.y, "bomb");
      console.log("iso", this);
      //this.height = height;
      //this.width = width;
      this.six = this.matter.add.sprite(600, 300, 'sheet', 'sha6', {shape: shapes.sha6});
    }
    // Getter
    get bounce() {
      return this.direction();
    }
    // Method
    direction()
    {
        for (let i = 0; i < particles.length; i++)
        {
            if (particles[i].y < Y)
              particles[i].setVelocity(0, -v);
            else if (particles[i].y > Y)
              particles[i].setVelocity(0, v);
            else
              particles[i].setVelocity(-v, 0);
        }
    }

  }

  const isosceles = new Isosceles(10, 10);

///////////////////////////////////////////////////////////////////////////////

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxPhysics.json');
    this.load.image('gun', 'sprites/gun.png');
    this.load.image('line', 'sprites/line.png');
  }

  function create ()
  {
    console.log("create", this);
    this.matter.world.disableGravity();
    cursors = this.input.keyboard.createCursorKeys();

    gun = this.add.sprite(140, Y + 9, 'gun').setScale(0.4);

    this.add.image(400, 300, 'line').setScale(1, 0.4);
    line = this.add.image(600, 300, 'line').setScale(1, 0.4);
    line.angle = 90;

    shapes = this.cache.json.get('shapes');

    particle = this.matter.add.sprite(200, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05);
    particle.setVelocity(v, 0);

    //sha6 = this.matter.add.sprite(600, 300, 'sheet', 'sha6', {shape: shapes.sha6});

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log(event, bodyA, bodyB);
        //console.log("HIT HIT HIT!");
        //particle.setVelocity(0, -v);
        isosceles.bounce;
    });

  }

  function update (time)
  {
      if (cursors.up.isDown)
        gun.y += -2;
      else if (cursors.down.isDown)
        gun.y += 2;;

      if (cursors.space.isDown && time > lastFired)
      {
        particles.push(this.matter.add.sprite(196, 230, 'sheet', 'particle', {shape: shapes.particle}).setScale(0.05));
        particles[particles.length - 1].y = gun.y - 9;
        particles[particles.length - 1].setVelocity(v, 0);
        lastFired = time + 500;
      }

      for (let i = 0; i < particles.length; i++)
        if ((particles[i].x > 800) || (particles[i].x < 0) || (particles[i].y > 500) || (particles[i].y < 0))
        {
            particles[i].destroy();
            particles.splice(i, 1);
        }

  }

});
