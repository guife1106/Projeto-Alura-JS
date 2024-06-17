
function setup() {
    createCanvas(600, 400);
    trilhaSonora.loop();
  }
  
  function draw() {
    background(0);
    crieBolinha();
    movimentoBolinha();
    quiqueBolinha();
    raqueteJogador(xRaquete, yRaquete);
    raqueteJogador(xRaqueteOponente, yRaqueteOponente);
    movimentominhaRaquete();
    movimentoOponente();
    //verificaColisaoraquetejogador();
    colisãoRaqueteBiblioteca(xRaquete, yRaquete);
    colisãoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
    mostrarPlacar();
    marcaPontos();
    bolinhaNaoFicaPresa();
  } //código em que o jogo se passa.
  
  //Código da bolinha   {}
  let xBolinha  = 300;
  let yBolinha = 200;
  let diametro = 28;
  let velocidadeXbolinha = 6;
  let velocidadeYbolinha = 6;
  let raioBolinha = diametro/2;
  let colisãoraquete = false;
  
  function crieBolinha(){
    circle(xBolinha, yBolinha, diametro)
  }
  function movimentoBolinha(){
    xBolinha += velocidadeXbolinha
    yBolinha += velocidadeYbolinha
  }
  function quiqueBolinha(){
    if (xBolinha+raioBolinha>width || xBolinha-raioBolinha<0){
      velocidadeXbolinha *= -1;
    }
    if (yBolinha-raioBolinha<0 || yBolinha+raioBolinha>height){
      velocidadeYbolinha *= -1;
    }
  }
  
  function bolinhaNaoFicaPresa(){
      if (xBolinha - raioBolinha < 0){
      xBolinha = 23
      }
  }
  
  //Código da Rquete
    let xRaquete = 2
    let yRaquete = 150
    let espessuraRaquete = 12
    let alturaRaquete = 98
      
  function raqueteJogador(x, y){
    rect(x, y, espessuraRaquete, alturaRaquete)
    //rect(10, 142, 14, 98)
  }
  
  function movimentominhaRaquete(){
    if (keyIsDown(UP_ARROW)){
    yRaquete -= 8;
      if (yRaquete - alturaRaquete < -100){
        yRaquete += 8;
      }
    }
    if (keyIsDown(DOWN_ARROW)){
    yRaquete += 8;
      if (yRaquete > 310){
        yRaquete -= 8;
      }
    }
  }
  
  function colisãoRaqueteBiblioteca(x, y){
    colisãoraquete = collideRectCircle (x, y, espessuraRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha)
    if (colisãoraquete) {
      velocidadeXbolinha *= -1
      raquetada.play()
    }
  }
    
  //function verificaColisaoraquetejogador(){
  //    if (xBolinha - raioBolinha < xRaquete + espessuraRaquete && yBolinha - raioBolinha < yRaquete + alturaRaquete && yBolinha + raioBolinha > yRaquete){
  //      velocidadeXbolinha *= -1
  //    }
  //  }
  
  //Códigos do Oponente
  let xRaqueteOponente = 584;
  let yRaqueteOponente = 150;
  let velocidadeYOponente;
  let chanceDeErrar = 0;
  
  function calculaChanceDeErrar() {
    if (pontosOponente >= pontosJogador) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 39){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      }
    }
  }
  
  //Jogador vs Computador:
  //(Coloque as barras(//) no inicio para desabilitar um dos modos de controle. Retire as barras para habilitar o modo de controle escolhido)
  function movimentoOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponente - alturaRaquete/2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar()
  }
  
  //Jogador vs Jogador:
  //function movimentoOponente(){
  //   if (keyIsDown(87)){
  //  yRaqueteOponente -= 8;
  //    if (yRaqueteOponente - alturaRaquete < -100){
  //      yRaqueteOponente += 8;
  //    }
  //  }
  //  if (keyIsDown(83)){
  //  yRaqueteOponente += 8;
  //    if (yRaqueteOponente > 310){
  //      yRaqueteOponente -= 8;
  //    }
  //  }
  //}
  
  //Código do placar
  let pontosJogador = 0;
  let pontosOponente = 0;
  
  function mostrarPlacar(){
    stroke(225);
    textAlign(CENTER);
    textSize(20);
    fill(color(255, 140, 0));
    rect(130, 9, 40, 20);
    fill (255);
    text (pontosJogador, 150, 26);
    fill(color(255, 140, 0));
    rect(430, 9, 40, 20);
    fill (255);
    text (pontosOponente, 450, 26);
  }
  
  function marcaPontos(){
    if (xBolinha > 584){
      pontosJogador += 1;
      ponto.play();
    }
    if (xBolinha < 14){
      pontosOponente +=1;
      ponto.play();
    }
  }
  
  //Efeitos Sonoros
  let ponto;
  let raquetada;
  let trilhaSonora;
  
  function preload(){
    trilhaSonora = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
  }