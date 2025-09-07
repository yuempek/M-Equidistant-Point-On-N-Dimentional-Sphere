/**
   This is a processing javascript (p5js) file. 
   
   Equidistant points o sphere
**/

let circleX = 400;
let circleY = 400;
let circleRadius = 300;

let N = 4
let P = [];
let M = 2;

function setup() {
  createCanvas(800, 800);
  calcNewPositions();
}

function draw() {
  background(0);

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);

  text(`Point Count: ${M}`, 25, 25);

  noFill();
  stroke(64);
  strokeWeight(1);
  circle(circleX, circleY, 2 * circleRadius);
  
  noStroke();
  
  // her x frame de bir bir nokta ekler
  if (0 == frameCount % 5) M++;
  
  calcNewPositions();
  
  for (let i = 0; i < M; i++){
    let X = P[i][0];
    let Y = P[i][1];
    let fps = frameRate();
    let a = frameCount/100; 
    
    let XX = X;
    let YY = Y;
    
    if(N > 2){
      let Z = P[i][2];
      XX = X*cos(a) - Z*sin(a);
      let ZZ = X*sin(a) + Z*cos(a);
      if(ZZ < 0) {
        continue;
      }
    }
    
    let pointX = circleX + circleRadius * XX;
    let pointY = circleY - circleRadius * YY;
    
    
    
    fill((P[i][N-1]/2+0.5)*255);
    circle(pointX, pointY, 3);
  }
  

}


function calcNewPositions(){
  let PP = [];
  
  // varsa eksik noktalari olustur
  let PL = P.length;

  if(PL < M){
    for(let i = 0; i < M-PL; i++){
      let p = normalize(randomUPoint());
            
      P.push(p);
    } 
  }
  
  
  // bir nokta üzerindeki toplam itme kuvvetlerini hesaplayıp noktaları kuvvet yonunde surukle
  for(let i = 0; i < M; i++){ // tum noktalar icin
    
    let D = []; // yer degistirme vektoru
    for(let n = 0; n < N; n++) D.push(0); 
    
    for(let j = 0; j < M; j++){ // diger tum noktalar ile
      if(j == i) continue;
       
      // aralarındaki uzaklığı hesapla
      let d = [];
      for(let n = 0; n < N; n++) d.push(P[i][n] - P[j][n]);      
      let dr = R(d);

      // noktalar ust uste ise 
      if(dr < 0.0001){
        // rastgele birim yon vektörü ata
        d = randomUPoint();
        dr = R(d);
      }
      
      for(let n = 0; n < N; n++) d[n] /= dr;
       
      // aralarındaki mesafe kısaldıkça daha çok itme olmalı
      let F = actionForce(dr)*10;
      
      // itme yönü ile itme çarpılıp itilme vektörü bulunur
      // unitVector * actionForce 
      for(let n = 0; n < N; n++) D[n] += d[n] * F;
    }
    
    
    let p = [];
    for(let n = 0; n < N; n++) p.push(P[i][n] + D[n]);
    
    let r = R(p);
    
    for(let n = 0; n < N; n++) p[n] /= r;
    

    PP.push(p);
  }
    
  P = PP;
}

function R(p){
  let norm = 0;
  
  for(let n = 0; n < N; n++){
    norm += p[n]*p[n];
  }
  
  return sqrt(norm);
}

  
function actionForce(r){
  return pow(1/exp(r), 0.5); //r: 0...inf -> f:1...0
}


function randomUPoint(){
  var p = [];

  for(let n = 0; n < N; n++) p.push(random() * 2 - 1);
  
  return p;
}

function normalize(p){
  let r = R(p);
      
  for(let n = 0; n < N; n++){
    p[n] /= r;
  }
  
  return p;
}
