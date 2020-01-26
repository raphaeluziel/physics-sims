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
  var graphics;
  var particle;
  var line;
  var points = [];

  function preload ()
  {
    this.load.image('particle', 'images/particle.png');
    this.load.image('ribbon', 'images/ribbon.png');
    this.load.image('marker', 'images/marker.png');
    this.load.image('line', 'images/line.png');
  }

  function create ()
  {
    objects.camera = this.cameras.add(0, 0, 800, 480).setBackgroundColor('rgba(255, 255, 255, 0.95)');

    graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xaa00aa } });

    particles = [];

    for (var i = 0; i < 100; ++i)
      particles[i] = this.add.sprite(8 * i, 240 + 40 * Math.sin(i/200), 'particle').setScale(0.015);

    particles[60].destroy();
    particles[60] = this.add.sprite(8 * 60, 250 + 40 * Math.sin(60/200), 'marker').setScale(0.2);

    this.add.image(particles[60].x, 240, 'line').setDisplaySize(1, 400).setVisible(true);

  }

  function update (time, delta)
  {
    graphics.clear();

    for (var i = 0; i < 100; i++){
      particles[i].y = 240 - 100 * Math.sin((time / 5000 - particles[i].x / 40));
    }

    for (var j = 0; j < 99; ++j){
      line = new Phaser.Geom.Line(particles[j].x, particles[j].y, particles[j+1].x, particles[j+1].y);
      graphics.strokeLineShape(line);
    }

  }

});
