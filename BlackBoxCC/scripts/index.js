var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#dddddd',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                y: 0
            },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var particle;
var particleCollider;

function preload ()
{
    this.load.image('particle', 'assets/sprites/particle.png');
    this.load.image('shape1', 'assets/sprites/shape1.png');
    this.load.image('line', 'assets/sprites/line.png');
    this.load.image('shape2', 'assets/sprites/shape2.png');
    this.load.json('shapes', 'assets/blackbox.json');
}

function create ()
{
  var shapes = this.cache.json.get('shapes');
  //var shape2 = this.matter.add.sprite(400, 300, 'shape2', { shape: shapes.shape2 });
  //shape2.setScale(0.3);

  var Bodies = Phaser.Physics.Matter.Matter.Bodies;

  var rectA = Bodies.rectangle(600, 300, 200, 24);
  var rectB = Bodies.rectangle(600, 300, 24, 200);
  var circleA = Bodies.circle(500, 300, 24);
  var circleB = Bodies.circle(700, 300, 24);
  var circleC = Bodies.circle(600, 200, 24);
  var circleD = Bodies.circle(600, 400, 24);

  var collider1 = Phaser.Physics.Matter.Matter.Body.create({
    parts: [ rectA, rectB, circleA, circleB, circleC, circleD ]
  });

  var particleCircle = Bodies.circle(200, 270, 4);

  particleCollider = Phaser.Physics.Matter.Matter.Body.create({
    parts: [ particleCircle ]
  });

  var shape1 = this.matter.add.image(0, 0, 'shape1').setScale(0.2);
  shape1.setExistingBody(collider1);
  shape1.setBounce(0);
  shape1.setStatic(true);
  shape1.setAngle(45);
  //this.matter.add.image(350, 450, 'platform', null, { isStatic: true }).setScale(2, 0.5).setAngle(8);

  particle = this.matter.add.image(0, 0, 'particle').setScale(0.05);
  particle.setExistingBody(particleCollider);
  particle.setFrictionAir(0).setBounce(1).setFriction(0);
  particle.setAngularVelocity(0);

  particle.setVelocity(6, 0);

  this.add.image(400, 325, 'line').setAngle(90);
  this.add.image(400, 270, 'line').setAngle(90);

  this.matter.world.on('collisionstart', function (event, particle, shape1) {

      //particle.gameObject.setTint(0xff0000);
      //shape1.gameObject.setTint(0x00ff00);
      console.log("hit");
  });
}


function update(t)
{

}
