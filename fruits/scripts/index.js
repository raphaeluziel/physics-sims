const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 600,
    scene: {
        preload: preload,
        create: create
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    //  Load sprite sheet generated with TexturePacker
    this.load.atlas('sheet', 'assets/physics/fruit-sprites.png', 'assets/physics/fruit-sprites.json');

    //  Load body shapes from JSON file generated using PhysicsEditor
    this.load.json('shapes', 'assets/physics/fruit-shapes.json');

    this.load.image('shape2', 'assets/physics/fruit-sprites/shape2.png');
    this.load.json('shapes', 'assets/physics/blackbox.json');
}

function create ()
{
    this.matter.world.setBounds(0, 0, 600, 600);

    var shapes = this.cache.json.get('shapes');

    var shapes = this.cache.json.get('shapes');
    var shape2 = this.matter.add.sprite(400, 300, 'shape2', { shape: shapes.shape2 });
    shape2.setScale(0.3);

    this.matter.add.sprite(200, 50, 'sheet', 'crate', { shape: shapes.crate });
    this.matter.add.sprite(250, 250, 'sheet', 'banana', { shape: shapes.banana });
    this.matter.add.sprite(360, 50, 'sheet', 'orange', { shape: shapes.orange });
    this.matter.add.sprite(400, 250, 'sheet', 'cherries', { shape: shapes.cherries });

    var shapeKeys = [ 'crate', 'banana', 'orange', 'cherries' ];
}
