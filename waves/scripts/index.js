document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    parent: 'game',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);
  var objects = {};

  var particle;
  var points = [];
  var lines = [40];

  function preload ()
  {
    this.load.image('particle', 'images/particle.png');
  }

  function create ()
  {
    objects.camera = this.cameras.add(0, 0, 800, 480);
    objects.camera.setBackgroundColor('rgba(255, 255, 255, 0.95)');

    //graphics = this.add.graphics();

    //line = this.add.line(0, 0, 50, 50, 100, 100, 0xff0000);/////////////////////////////

    line = new Phaser.Line(0, 0, 50, 50, 100, 100, 0xff0000);

    //var data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];

    //var r1 = this.add.polygon(200, 200, data, 0x6666ff);

    //polygon = this.add.polygon(200, 400, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0x00ff00);

    particles = [];

    for (var i = 0; i < 40; ++i){
      particles[i] = this.add.sprite(32 * i, 240 + 40 * Math.sin(i/200), 'particle').setScale(0.02);

      //points.push(particles[i]);
    }

    for (var j = 0; j < 39; ++j){
      this.add.line(0, 0, particles[j].x, particles[j].y, particles[j+1].x, particles[j+1].y, 0xcc6600);
    }

    //console.log(points);
    //var r = this.add.polygon(0, 0, points, 0x0000ff);
    //r.setStrokeStyle(1, 0x1a65ac);
  }

  function update (time, delta)
  {


    for (var i = 0; i < 39; i++){
      particles[i].y = 240 - 100 * Math.sin((time / 5000 - particles[i].x / 40));

      //lines


      /*
      graphics.lineStyle(1, 0xFF00FF, 1.0);
      graphics.beginPath();
      graphics.moveTo(particles[i].x, particles[i].y);
      graphics.lineTo(particles[i+1].x, particles[i+1].y);
      graphics.strokePath();
      */
    }

    for (var j = 1; j < 39; ++j){
      lines.push(this.add.line(0, 0, particles[j].x, particles[j].y, particles[j+1].x, particles[j+1].y, 0xcc6600).setOrigin(0, 0));
      lines[j-1].destroy();
    }

    console.log(lines.length);

    lines = [];

  }

});
