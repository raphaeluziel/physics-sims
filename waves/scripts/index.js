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

  function preload ()
  {
    this.load.image('particle', 'images/particle.png');
  }

  function create ()
  {
    objects.camera = this.cameras.add(0, 0, 800, 480);
    objects.camera.setBackgroundColor('rgba(255, 255, 255, 0.95)');

    particles = [];

    for (var i = 0; i < 3200; ++i){
      particles[i] = this.add.sprite(i/4, 240 + 40 * Math.sin(i/200), 'particle').setScale(0.02);
    }

  }

  function update (time, delta)
  {
    for (var i = 0; i < 3200; i++){
      particles[i].y = 240 - 100 * Math.sin((time / 5000 - particles[i].x / 50));
    }
  }

});