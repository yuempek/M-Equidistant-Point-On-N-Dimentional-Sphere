/**
   This is a processing javascript (p5js) file. 
   
   Equidistant points o sphere
**/

let circleX = 200;
let circleY = 200;
let circleRadius = 150;


let P = [];
let M = 2;

function setup() {
  createCanvas(400, 400);
  calcNewPositions();
}

function draw() {
  background(0);

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);

  text(`Point Count: ${M}`, 25, 25);

  noFill();
  stroke(128);
  strokeWeight(3);
  circle(circleX, circleY, 2 * circleRadius);
  
  noStroke();
  
  // her x frame de bir bir nokta ekler
  if (0 == frameCount % 5) M++;
  
  calcNewPositions();
  
  for (let i = 0; i < M; i++){
    
    let X = P[i].x;
    let Y = P[i].y;
    let Z = P[i].z;
    let fps = frameRate();
    let a = frameCount/100; 
    
    let XX = X*cos(a) - Z*sin(a);
    let ZZ = X*sin(a) + Z*cos(a);
    let YY = Y;
    
    let pointX = circleX + circleRadius * XX;
    let pointY = circleY - circleRadius * YY;
    
    if(ZZ < 0) {
      continue;
    }
    
    fill('white');
    circle(pointX, pointY, 3);
  }
  

}

function calcNewPositions(){
  
  let PP = [];
  
  // varsa eksik noktalari olustur
  let PL = P.length;
  if(PL < M){
    for(let i = 0; i < M-PL; i++){
      let x = random() * 2 - 1;
      let y = random() * 2 - 1;
      let z = random() * 2 - 1; //random() * 2 - 1;

      let r = sqrt(x*x + y*y + z*z);

      x /= r;
      y /= r;
      z /= r;

      P.push({x, y, z});
    } 
  }
  
  // bir nokta üzerindeki toplam itme kuvvetlerini hesaplayıp noktaları kuvvet yonunde surukle
  for(let i = 0; i < M; i++){ // tum noktalar icin
    let Dx = 0;
    let Dy = 0;
    let Dz = 0;
    
    for(let j = 0; j < M; j++){ // diger tum noktalar ile
       if(j == i) continue;
       
       // aralarındaki uzaklığı hesapla
       let dx = P[i].x - P[j].x;
       let dy = P[i].y - P[j].y;
       let dz = P[i].z - P[j].z;
       let dr = R(dx, dy, dz);

      // noktalar ust uste ise 
       if(dr < 0.0001){
         // rastgele birim yon vektörü ata
         dx = random() * 2 - 1;
         dy = random() * 2 - 1;
         dz = random() * 2 - 1;
         dr = R(dx, dy, dz);
       }
      
       dx /= dr;
       dy /= dr;
       dz /= dr;
       
       // aralarındaki mesafe kısaldıkça daha çok itme olmalı
       let F = actionForce(dr)*10;
      
       // itme yönü ile itme çarpılıp itilme vektörü bulunur
       // unitVector * actionForce 
       Dx += dx * F;
       Dy += dy * F;
       Dz += dz * F; 
    }
    
    
    let x = P[i].x + Dx;
    let y = P[i].y + Dy;
    let z = P[i].z + Dz;
    
    let r = R(x, y, z);
    
    x /= r;
    y /= r;
    z /= r;

    PP.push({x, y, z});
  }
    
  P = PP;
}

function R(x, y, z){
  return sqrt(x*x + y*y + z*z);
}

  
function actionForce(r){
  return pow(1/exp(r), 0.5); //r: 0...inf -> f:1...0
}
