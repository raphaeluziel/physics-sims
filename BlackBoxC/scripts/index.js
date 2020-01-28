document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
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
    this.load.image('line', 'images/line.png');
    this.load.image('particle', 'images/particle.png');
    this.load.image('circle', 'images/circle.png');
  }

  function create ()
  {
    this.add.image(540, 240, 'line');
    this.add.image(350, 200, 'line').angle = 90;
    this.add.image(350, 400, 'line').angle = 90;

    //var circle = new Phaser.Geom.Circle(640, 300, 100);
    //var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    //graphics.fillCircleShape(circle);

    circle = this.physics.add.sprite(640, 300, 'circle').setScale(0.27);

    particle = this.physics.add.sprite(300, 240, 'particle').setScale(0.05);

    this.physics.add.collider(circle, particle, hit, null, this);
  }

  function update (t)
  {
    particle.x = 400 + t/100;
  }

  function hit(){
    console.log("REFLECTED!");
  }

});
