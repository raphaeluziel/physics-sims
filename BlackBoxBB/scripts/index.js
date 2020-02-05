document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 960,
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
    }
  };

  var game = new Phaser.Game(config);

  function preload ()
  {
    this.load.atlas('sheet', 'assets/blackbox.png', 'assets/blackbox.json');
    this.load.json('shapes', 'assets/blackboxShapes.json');
  }

  function create ()
  {
    //this.matter.world.setBounds().disableGravity();

    var shapes = this.cache.json.get('shapes');

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

    var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
    ground.setPosition(0 + ground.centerOfMass.x, 280 + ground.centerOfMass.y);

    this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});
    this.matter.add.sprite(250, 250, 'sheet', 'banana', {shape: shapes.banana});
    this.matter.add.sprite(350, 250, 'sheet', 'shape2', {shape: shapes.shape2}).setScale(0.3);
    this.matter.add.sprite(360, 50, 'sheet', 'orange', {shape: shapes.orange});
    this.matter.add.sprite(400, 250, 'sheet', 'cherries', {shape: shapes.cherries});

    this.input.on('pointerdown', function (pointer) {
        this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', {shape: shapes.banana});
    }, this);
  }

});
