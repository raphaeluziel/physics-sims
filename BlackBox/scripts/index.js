var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#efefef',
    parent: 'game',
    physics: {
        default: 'matter',
        matter: {
          debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('line', 'assets/line.png');
    this.load.image('blackbox', 'assets/blackbox.png');
    this.load.image('sha02', 'assets/sha02.png');
    this.load.image('particle', 'assets/particle.png');
}

function create ()
{
    this.matter.world.disableGravity();

    this.add.image(50, 300, 'line');
    this.add.image(600, 300, 'blackbox').setScale(0.263);

    particle = this.matter.add.image(100, 230, 'particle');
    particle.setCircle();
    particle.setScale(0.05);
    particle.setVelocity(1, 0);
    particle.setAngularVelocity(0);
    particle.setFriction(0, 0, 0);
    particle.setBounce(1);

    var sha0Npts = '0 100 100 0 100 200';
    var sha0N = this.add.polygon(600, 300, sha0Npts, 0xae876b, 1);
    this.matter.add.gameObject(sha0N, { shape: { type: 'fromVerts', verts: sha0Npts, flagInternal: true } });
    sha0N.setStatic(true);
    sha0N.x += 33;
    sha0N.setBounce(1);

    /*
    // Large circle
    sha02 = this.matter.add.image(600, 300, 'sha02');
    sha02.setCircle();
    sha02.setScale(0.28);
    sha02.setStatic(true);

    // Right triangle, upward bounce
    var sha01pts = '200 0 200 200 0 200';
    var sha01 = this.add.polygon(600, 300, sha01pts, 0xff0000, 0.1);
    this.matter.add.gameObject(sha01, { shape: { type: 'fromVerts', verts: sha01pts, flagInternal: true } });
    sha01.setStatic(true);
    sha01.x += 33;
    sha01.y += 33;

    // Big box
    var sha04pts = '0 0 200 0 200 200 0 200';
    var sha04 = this.add.polygon(600, 300, sha04pts, 0x00ffff, 0.1);
    this.matter.add.gameObject(sha04, { shape: { type: 'fromVerts', verts: sha04pts, flagInternal: true } });
    sha04.setStatic(true);

    // Like moon mirror
    var sha05pts = '0 0 200 0 200 200 0 200 100 100';
    var sha05 = this.add.polygon(600, 300, sha05pts, 0x00ff00, 0.1);
    this.matter.add.gameObject(sha05, { shape: { type: 'fromVerts', verts: sha05pts, flagInternal: true } });
    sha05.setStatic(true);
    sha05.x += 22;

    // right triangle with vertex at center
    var sha07pts = '0 100 100 0 100 200';
    var sha07 = this.add.polygon(600, 300, sha07pts, 0xae876b, 1);
    this.matter.add.gameObject(sha07, { shape: { type: 'fromVerts', verts: sha07pts, flagInternal: true } });
    sha07.setStatic(true);
    sha07.x += 66;
    */

}
