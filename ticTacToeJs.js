

let btn = document.querySelectorAll("button");
var turn = true, no_of_clicks = 0;
var xCount = 0, oCount = 0, drawCount = 0;
let X_POSITIONS = [] , O_POSITIONS = [];
let singlePlayer = false;


const combinations = {
   0: [0, 1, 2],
   1: [3, 4, 5],
   2: [6, 7, 8],
   3: [0, 3, 6],
   4: [1, 4, 7],
   5: [2, 5, 8],
   6: [2, 4, 6],
   7: [0, 4, 8],
};

// console.log(btn[2])
document.querySelector("#xCount").innerHTML = `Points Of X: ${xCount}`;
document.querySelector("#oCount").innerHTML = `Points Of O: ${oCount}`;
document.querySelector("#drawCount").innerHTML = `Draws : ${drawCount}`;

for (let i = 0; i < btn.length; i++) {
   btn[i].setAttribute("id", i);
   btn[i].setAttribute("edited", false);
   btn[i].classList.add("btn")
}


let eBtn = document.querySelectorAll(".btn");
for (let i = 0; i < eBtn.length; i++)
//  console.log(eBtn[i])
{
   eBtn[i].addEventListener("click", changeText.bind(null, i));

}

function changeText(id) {
   // console.log("inside change text id ===== " + id);
   no_of_clicks++;
   let btn = document.getElementById(id);
   checkCheckbox();

   // let isEdited = btn.getAttribute("edited");
   //  console.log(isEdited)
   if (btn.innerHTML != "X" && btn.innerHTML != "O") {
      if (turn) {  //console.log("turn true");
         btn.innerHTML = "X";
         X_POSITIONS.push(id);
      }
      else { //console.log("turn false");
         btn.innerHTML = "O";
         O_POSITIONS.push(id);
      }
      turn = !turn;
   }

  
   //if(no_of_clicks>=3){
      // let winner = checkWin();
    //  checkWin()
         // setTimeout(resetBoard, 2000);
       //  return true
  // }
   if(checkWin())
      {  setTimeout(resetBoard,2000);
         twoCombinations = [];
         X_POSITIONS = [] ,O_POSITIONS = [];
         return;}
  
   if(singlePlayer){secondMove();
   turn = !turn;
    if(checkWin()){
       setTimeout(resetBoard,2000);
       twoCombinations = [];
       X_POSITIONS = [] ,O_POSITIONS = [];
       return;
    };
   }
   // let winner = checkWin();
   // if (winner == "X" || winner == "O")
   //    setTimeout(resetBoard, 2000);
}


//0  1  2
//3  4  5
//6  7  8
function checkWin() {

   let a = document.querySelectorAll('.btn');

   if (turn)
      winner = "O";
   else
      winner = "X";


   // console.log(combinations.length)
   for (let i in combinations) {
      let array = combinations[i];
      // console.log(array)

      //  if ((a[array[0]].innerHTML == "X" || a[array[0]].innerHTML == "O")
      // console.log(typeof a[array[0]].innerHTML);
       if ((a[array[0]].innerHTML == "X" || a[array[0]].innerHTML == "O")
         && a[array[0]].innerHTML == a[array[1]].innerHTML &&
         a[array[1]].innerHTML == a[array[2]].innerHTML) {

         //   console.log(array[0],array[1],array[2])

         alert(`${winner} Won the Match!!`);
         addCount();
         return true;
      }

   }


   if ((no_of_clicks >= 9 && !singlePlayer) ||
    (no_of_clicks > 4 && singlePlayer)) {
      drawCount++;
      alert("Its a Draw!!");
      document.querySelector("#drawCount").innerHTML = `Draws : ${drawCount}`
      resetBoard();
      twoCombinations = [];
      X_POSITIONS = [] ,O_POSITIONS = [];
   };
   return false;
}

function addCount() {
   if (turn)
      oCount++;
   else
      xCount++;
   document.querySelector("#xCount").innerHTML = `Points Of X: ${xCount}`;
   document.querySelector("#oCount").innerHTML = `Points Of O: ${oCount}`;

}

document.querySelector("#reset").addEventListener("click", resetBoard);

function resetBoard() {

   for (let i = 0; i < btn.length; i++) {
      btn[i].setAttribute("id", i);
      btn[i].setAttribute("edited", false);
      btn[i].classList.add("btn");
      btn[i].innerHTML = "";
      no_of_clicks = 0;
   }

}


function secondMove() {
   let a = document.querySelectorAll('.btn');
  // console.log("in second");
      var c =0 , twoCombinations = [];
      for(let i=0; i < X_POSITIONS.length;i++){
         for(let j=i+1;j < X_POSITIONS.length;j++){
            twoCombinations.push([X_POSITIONS[i],X_POSITIONS[j]])
         }
      }

    //  twoCombinations[0] = [1,2];

   //   console.log("Combinations : " , twoCombinations);
      var diff;
      var flag = false;
      
      for(let i in twoCombinations){
       //  console.log(twoCombinations[i]);
         let arr = twoCombinations[i];
        for(let j in combinations){
         //  console.log("inside combinations",combinations[j]);
            
            let aCombination = combinations[j];
            diff  = aCombination.filter(x => !arr.includes(x));
           // console.log("diff => " , diff);
            if(diff.length == 1 && a[diff[0]].innerHTML != "X" && a[diff[0]].innerHTML != "O"){
               if (turn) {  
                 // console.log("turn true");
                  a[diff[0]].innerHTML = "X";
                  X_POSITIONS.push(diff[0]);
               }
               else { 
                  a[diff[0]].innerHTML = "O";
                  O_POSITIONS.push(diff[0]);
                //  console.log("turn false", O_POSITIONS);
               }
               console.log("diff 1 : ",diff[0]);
               flag = true;  
               break;
            }               
        }
        if(flag)
            break;
      } 
      if(!flag)
         fillRandomPosition(a);

}

function fillRandomPosition(a) {
   var pos = Math.floor(Math.random() * 9);
  // console.log(pos)
   if (a[pos].innerHTML == "X" || a[pos].innerHTML == "O") {
      for (let i = 0; i < 9; i++)
         if (a[i].innerHTML == " ") { pos = i; break; }
   }

   // a[pos].innerHTML = (turn) ? "X" : "O";
   if(turn){
      a[pos].innerHTML = "X";
      X_POSITIONS.push(pos);
   }
   else{
      a[pos].innerHTML = "O";
      O_POSITIONS.push(pos);
   }



}

function checkCheckbox(){
   let checkBox = document.querySelector("#singlePlayer");
   
   if(checkBox.checked == true)  
      singlePlayer = true;
   // console.log(singlePlayer);
}

