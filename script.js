let xPunkteArray = [0, 100, 200, 300, 400, 500, 600];
let yPunkteArray = [350,];
let kurvenFunktion;

let settings;
let kuppenAn = true;
let linienAn = false;
let smoothieAn = false;

function setup() {
  createCanvas(800, 400);
  
  settings = QuickSettings.create(20, 420, "Hügellandschaft");
	settings.addBoolean("Kuppen anzeigen", true, function(value) { kuppenAn = value; }); 
	settings.addBoolean("Linien anzeigen", false, function(value) { linienAn = value; }); 	
	settings.addBoolean("Smoothie anzeigen", false, function(value) { smoothieAn = value; }); 
  
}

function mousePressed() {
  if (mouseButton === LEFT && yPunkteArray.length < xPunkteArray.length && mouseY < 400 && mouseY > 0) {
    yPunkteArray.push(mouseY);
  }
  if (mouseButton === RIGHT && yPunkteArray.length > 1) {
    yPunkteArray.pop(yPunkteArray.length-1);
  }
}

function draw() {
  background('DARKSLATEGREY');
  translate(100, 0);
  for(let i=0; i<7; i++) {
    strokeWeight(10)
    stroke('SLATEGREY');
    line(i*100, 0, i*100, 400);
  }
  if (kuppenAn) {  
    for(let i=0; i<xPunkteArray.length; i++) {
      strokeWeight(0);
      fill('CRIMSON');
      ellipse(xPunkteArray[i], yPunkteArray[i], 10, 10);
    }
  }
  if (linienAn) {  
    for(let i=0; i<xPunkteArray.length-1; i++) {
      strokeWeight(1);
      stroke(255, 150, 150);
      line(xPunkteArray[i], yPunkteArray[i], xPunkteArray[i+1], yPunkteArray[i+1]);
    }  
  }
  if (smoothieAn && yPunkteArray.length>1) {
    kurvenFunktion = Smooth(yPunkteArray);
    for(let i=0; i<=1000; i++) {
      strokeWeight(0);
      fill('WHITE');
      ellipse(i, kurvenFunktion(i/100), 20, 20);
      if(i>xPunkteArray[yPunkteArray.length-1]) {
        fill('DARKSLATEGREY')
        ellipse(i, kurvenFunktion(i/100), 25, 25);
      }
    }
    for(let i=0; i<xPunkteArray.length-yPunkteArray.length; i++) {
      stroke('SLATEGREY');
      strokeWeight(10);
      line(600-i*100, 0, 600-i*100, 400);
    }
    for(let i=0; i<50; i++) {
      strokeWeight(0);
      fill('ORANGE');
      ellipse(xPunkteArray[yPunkteArray.length-1]+i, yPunkteArray[yPunkteArray.length-1]-5-i/-10, 10, 10)
      ellipse(xPunkteArray[yPunkteArray.length-1]+i, yPunkteArray[yPunkteArray.length-1]+10-i/5, 10, 10)
    }
    fill('WHITE')
    ellipse(xPunkteArray[yPunkteArray.length-1]+10, yPunkteArray[yPunkteArray.length-1], 45, 40);
    ellipse(-50, 375, 150, 100);
    fill('BLACK');
    ellipse(xPunkteArray[yPunkteArray.length-1]+15, yPunkteArray[yPunkteArray.length-1]-10, 7, 7);
  }  
}