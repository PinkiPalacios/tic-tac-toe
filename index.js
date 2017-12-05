let cells = Array.prototype.slice.call(document.querySelectorAll('.cell')); 
let board=[[],[],[]]
let player;
let bot;
let done=false;
const rngPlayer=()=>{
    if (Math.random() > 0.5) {
    player="o"; 
    bot="x";  
    }else{
        player="x";
        bot="o"
    }
}

const generateBoard=()=>{
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++ ){
            board[i][j]=cells.shift()
            board[i][j].classList.add("empty")
            board[i][j].addEventListener('click', playerTurn)
            
        }
    }
}

let playerTurn=function (e) {
    if(!done){
    this.children[0].src = `./${player}.png`
    this.classList.remove("empty")
    this.classList.add(player)
    validate()
    botTurn()
    }
    this.removeEventListener('click', playerTurn)
}

let botTurn=function(){
    if(!done){
    var empties= document.querySelectorAll(".empty")
    var index=Math.floor(Math.random()*empties.length)
    empties[index].children[0].src=`./${bot}.png`
    empties[index].classList.add(bot)
    empties[index].classList.remove("empty") 
    empties[index].removeEventListener('click', playerTurn)   
    console.log(empties)
    validate()
    }
}

let validate=function() {
    if(isSolved()==1){
        document.querySelector("#message").textContent="You Lost"
        done=true
    }else if(isSolved()==2){
        document.querySelector("#message").textContent = "You Won!!!"
        done=true
    }else if (isSolved()==0){
        document.querySelector("#message").textContent = "Its a Tie"
        done=true
    }
}

function isSolved() {
    var aux=[[],[],[]]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
           if(board[i][j].classList.contains(player)){
            aux[i][j]=2
           } else if (board[i][j].classList.contains(bot)){
               aux[i][j]=1
           }else{
               aux[i][j]=0
           }
        }
    }

    aux = aux.join('-').replace(/,/g, '');
    if (/222|2...2...2|2....2....2|2..2..2/.test(aux)) return 2;
    if (/111|1...1...1|1....1....1|1..1..1/.test(aux)) return 1;
    if (/0/.test(aux)) return -1;
    return 0;
}




rngPlayer();
generateBoard();
