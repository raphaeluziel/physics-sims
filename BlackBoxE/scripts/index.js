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
}

function create ()
{
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

    var particleCircle = Bodies.circle(200, 190, 24);

    particleCollider = Phaser.Physics.Matter.Matter.Body.create({
      parts: [ particleCircle ]
    });

    var shape1 = this.matter.add.image(150, 0, 'shape1').setScale(0.2);
    shape1.setExistingBody(collider1);
    shape1.setBounce(0);
    shape1.setStatic(true);
    //this.matter.add.image(350, 450, 'platform', null, { isStatic: true }).setScale(2, 0.5).setAngle(8);

    particle = this.matter.add.image(200, 190, 'particle').setScale(0.25);
    particle.setExistingBody(particleCollider);
    particle.setFrictionAir(0).setBounce(1);

    particle.setVelocity(6, 0);
}

function update(t)
{

}
