document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'matter',
        arcade: {
            debug: true
        }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  var circle;
  var particle;

  function preload ()
  {
    this.load.json('shapes', 'assets/blackbox.json');
  }

  function create ()
  {
    var shapes = this.cache.json.get('shapes');
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.matter.add.sprite(200, 50, 'circle', 'line', 'particle', {shape: shapes.crate});
  }

  function update (t)
  {


  }

  function reflect(){
    console.log("REFLECTED!");
  }

  function overlap(){
    console.log("OVELAPED!");
  }


});
