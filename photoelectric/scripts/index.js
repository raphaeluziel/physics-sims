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

  var message = "";

  var color = 1;
  var photon_energy = 1.8;
  var work_function = 2.0;
  var intensity = 1;
  var stopping_voltage = 0;

  var photon;
  var photons = [];
  var electron;
  var electrons = [];
  var flashlight;
  var metal;

  var meter;
  var current = 0;
  var vx = -8;
  var vy = 2;
  var hit = false;

  function fillForm(photon_energy, work_function, intensity, stopping_voltage) {
    document.getElementById('photon_energy').value = photon_energy.toFixed(2);
    document.getElementById('work_function').value = work_function.toFixed(2);
    document.getElementById('intensity').value = intensity;
    document.getElementById('stopping_voltage').value = stopping_voltage.toFixed(2);
  }

  fillForm(1.8, 2.0, 1, 0);

  document.getElementById('set').addEventListener('click', function(){
    message = "";

    photon_energy = parseFloat(document.getElementById('photon_energy').value);
    work_function = parseFloat(document.getElementById('work_function').value);
    intensity = parseInt(document.getElementById('intensity').value);
    stopping_voltage = parseFloat(document.getElementById('stopping_voltage').value);

    if (photon_energy < 1 || photon_energy > 6 || isNaN(photon_energy)) {
      message = "Enter a photon energy between 1 and 6 eV";
    }
    else {
      if (photon_energy < 1.59) { color = 0; }
      else if (photon_energy < 2.00) { color = 1; }
      else if (photon_energy < 2.08) { color = 2; }
      else if (photon_energy < 2.15) { color = 3; }
      else if (photon_energy < 2.53) { color = 4; }
      else if (photon_energy < 2.73) { color = 5; }
      else if (photon_energy < 3.19) { color = 6; }
      else if (photon_energy < 10.0) { color = 7; }
    }
    if (work_function < 1 || work_function > 6 || isNaN(work_function))
      message = "Enter a work function between 1 and 6 eV";
    if (intensity < 0 || intensity > 10 || isNaN(intensity))
      message = "Enter an integer for intensity between 0 and 10";
    if (stopping_voltage < 0 || stopping_voltage > 5 || isNaN(stopping_voltage))
      message = "Enter a stopping voltage between 0 and 5 V";

    if (message){
      fillForm(1.8, 2.0, 1, 0);
      photon_energy = 1.8;
      color = 1;
      work_function = 2.0;
      intensity = 0;
      stopping_voltage = 0;
      document.getElementById("message").innerHTML = message;
    }
    else{
      fillForm(photon_energy, work_function, intensity, stopping_voltage)
      document.getElementById("message").innerHTML = message;
    }

  });

  document.getElementById('reset').addEventListener('click', function(){
    message = "";

    for (let i = 0; i < photons.length; i++){
      photons[i].destroy();
    }
    for (let i = 0; i < electrons.length; i++){
      electrons[i].destroy();
    }
    photons = [];
    electrons = [];

    photon_energy = 1.8;
    color = 1;
    work_function = 2.0;
    intensity = 1;
    stopping_voltage = 0;

    fillForm(1.8, 2.0, 1, 0);
  });

  function preload ()
  {
    this.load.image('metal', 'images/metal.png');
    this.load.image('flashlight', 'images/flashlight.png');
    this.load.image('electron', 'images/electron.png');
    this.load.image('needle', 'images/needle.png');
    this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 255, frameHeight: 112});
  }

  function create ()
  {
    meter = this.add.text(700, 300, '0', { fontSize: '24px', fill: '#fcc' });

    timedEvent = this.time.addEvent(
      {
        delay: 2000,
        callback: function(){
          meter.setText(current);
          needle.angle = current < 8 ? current * 10 : 80;
          current = 0;
        },
        callbackScope: this, loop: true
      });

    metal = this.add.image(100, 240, 'metal');
    metal.setScale(0.4);

    flashlight = this.add.image(700, 80, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.angle = 9;

    needle = this.add.sprite(700, 400, 'needle');
    needle.setScale(0.5);
    needle.setOrigin(0.5, 1);

  }

  var n = 0;
  function update (t)
  {
    n += 1;
    let x;
    if (n % Math.round((100 / intensity)) === 0){
      x = this.add.sprite(650, 80 + 30 * Math.random(), 'photon');
      x.setScale(0.1);
      x.vx = -8;
      x.angle = -20;
      x.setFrame(color);
      x.energy = photon_energy;
      photons.push(x);
    }

    for (let i = 0; i < photons.length; i++)
    {

      if (photons[i].x < 120) {
        photons[i].hit = true;
        photons[i].angle *= -1;
        if (photons[i].energy > work_function){
          electrons.push(this.add.sprite(photons[i].x, photons[i].y, 'electron'));
          electrons[electrons.length - 1].setScale(0.05);
          electrons[electrons.length - 1].t = 0;
          electrons[electrons.length - 1].speed = Math.sqrt(photons[i].energy - work_function);
          photons[i].destroy();
          photons.splice[i, 1];
        }
      }

      if (photons[i].hit) {
        photons[i].x -= vx;
      }
      else{
        photons[i].x += vx;
      }
      photons[i].y += vy;

      if (photons[0].y > 600){
        photons[0].destroy();
        photons.shift();
      }

    }

    for (let j = 0; j < electrons.length; j++){

      electrons[j].t += 1;
      electrons[j].x += electrons[j].speed - 0.0000008 * Math.sqrt(stopping_voltage) * electrons[j].t * electrons[j].t;

      if (electrons[j].x > 800 || electrons[j].x < 95){
        current += 1;
        electrons[j].destroy();
        electrons.splice(j, 1);
      }
    }

  }

});
