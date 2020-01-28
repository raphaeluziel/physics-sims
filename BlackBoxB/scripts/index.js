document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  var circle;
  var particle;

  var circleXs = new Array(200).fill(0);

  function preload ()
  {
    this.load.image('circle', 'images/circle.png');
    this.load.image('line', 'images/line.png');
    this.load.image('particle', 'images/particle.png');
  }

  function create ()
  {
    this.add.image(540, 240, 'line');
    this.add.image(350, 200, 'line').angle = 90;
    this.add.image(350, 400, 'line').angle = 90;
    circle = this.add.image(640, 300, 'circle').setScale(0.27);
    particle = this.add.sprite(300, 240, 'particle').setScale(0.05);
  }

  function update (t)
  {
    particle.x = 400 + t/100;
  }

  function hit(){
    console.log("REFLECTED!");
  }

  function calculate(){

  }

  for (let y = 0; y <= 200; y++)
    if (y < 100)
      circleXs[y] = 540 + Math.sqrt(Math.abs(Math.pow(100, 2) - Math.pow(y, 2)));
    else
      circleXs[y] = 540 + Math.sqrt(Math.abs(Math.pow(100, 2) - Math.pow((200-y), 2)));

  console.log(circleXs);
});
