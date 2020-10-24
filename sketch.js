let mySong; //Midnight Mischief Tom Misch Remix
let myImage; // wave bg
let analyzer;
let playbutton;
let stopbutton;
let ampSlider;  //cursore volume
let rateSlider;  //cursore rate
let waves =[];   //classe 1 "onde sonore"
let mydot=[];    // classe 2 cursore

function preload(){
  // put preload code here
  //suono
  mySong = loadSound("./assets/sounds/Midnight Mischief Tom Misch Remix.mp3");
  //immagine
  myImage = loadImage("./assets/images/wave.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
//cursore dot
  dot = new Dot();
//analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
//playbutton
  playbutton = createImg("./assets/images/play_1.png");
  playbutton.style("width", "24px");
  playbutton.position(width / 2 - 10, height / 2 - 10);
  playbutton.mousePressed(playpause);
//stopbutton
  stopbutton = createImg("./assets/images/stop_1.png");
  stopbutton.style("width", "24px");
  stopbutton.position(width / 2 - 12, height / 2 - 12);
  stopbutton.mousePressed(playpause);
  stopbutton.style("visibility", "hidden");
//controllo amplitude e rate
  ampSlider = createSlider(0, 5, 1, 0);
  ampSlider.position(width/1.2, height/2);
  ampSlider.style('width', '100px');
  rateSlider = createSlider(0, 4, 1, 0);
  rateSlider.position(width/9, height/2);
  rateSlider.style('width', '100px');
}

function draw() {
  // put drawing code here
  //posizionamento img sfondo
  imageMode(CENTER);
  image(myImage, windowWidth / 2, windowHeight / 2, myImage.width*1.25, myImage.height*1.25);
// testo titolo
  let myMainText = "Play with the sound waves";
  fill("#FFFFFF");
  strokeWeight(1);
  textSize(25);
  textFont("Roboto Mono");
  textStyle(ITALIC);
  textAlign(CENTER);
  text(myMainText, width/2, 100);
// testo titolo canzone
  let mySongText = "Song // Midnight Mischief - Tom Misch Remix";
  noFill();
  stroke("#FFFFFF");
  strokeWeight(0.3);
  textSize(40);
  textFont("Libre Caslon Display");
  textAlign(CENTER);
  text(mySongText, width/2, 920);
//testo cursore rate
  let myRateText = "SOUND RATE";
  fill("#FFFFFF");
  textSize(10);
  textFont("Roboto Mono");
  textAlign(CENTER);
  text(myRateText, width/7, height/2.1);
//testo cursore volume
  let myVolumeText = "SOUND VOLUME";
  fill("#FFFFFF");
  textSize(10);
  textFont("Roboto Mono");
  textAlign(CENTER);
  text(myVolumeText, width/1.16, height/2.1);
//inserimento cursori amplitude e rate
  let val1 = ampSlider.value();
  mySong.amp(val1);
  let val2 = rateSlider.value();
  mySong.rate(val2);
  let volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 200, 500);
  //_____________________________________
  //ellisse volume
  push();
  fill(235, 235, 235, 50);
  noStroke();
  ellipse(width / 2, height / 2, volume);
  pop();
  //ellisse 2
  push();
  fill(52, 52, 52);
  noStroke();
  ellipse(width / 2, height / 2, 80);
  pop();
  //cursore
  dot.draw();
  waves.forEach(wave => {
  wave.update();
  wave.draw();
  });
}

//classe cursore dot
class Dot{
  constructor(mouseX, mouseY){
    this.x=mouseX;
    this.y=mouseY;
    this.time=0;
  }
  update(){
    this.x=mouseX;
    this.y=mouseY;
    this.time+=1;
     if(this.time>10){
      this.time=0
      waves[waves.length]=new Wave(this.x,this.y,waves,waves.length);
    }
  }
  draw(){
   this.update();
    fill(235, 235, 235);
    noStroke();
    ellipse(mouseX, mouseY, 10, 10);
  }
}
//classe "onde sonore"
class Wave{
  constructor(x,y,waves,id)   {
    this.x=x;
    this.y=y;
    this.diameter=0;
    this.speed=4;
    this.color=(255, 255, 255);
    this.fade=0.8;
    this.waves=waves;
    this.id=id;
  }
 update(){
    this.diameter+=this.speed;
    this.color-=this.fade;
    if(this.color<0)
    {
      this.waves.splice(this.id, 100);
      this.waves.forEach(wave => {
        if(wave.id>this.id){wave.id-=1;}
      });
    }
  }
  draw(){
    noFill();
    stroke(this.color);
    strokeWeight(0.5);
    ellipse(this.x,this.y,this.diameter,this.diameter);
  }
}
//playbutton - stopbutton alternati
function playpause() {
  if (mySong.isPlaying() == true) {
    mySong.pause();
    stopbutton.style("visibility", "hidden");
    playbutton.style("visibility", "visible");
  } else {
    mySong.loop();
    playbutton.style("visibility", "hidden");
    stopbutton.style("visibility", "visible");
  }
}
