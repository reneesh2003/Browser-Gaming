
 function Player()
 {      
        const R = document.querySelector('#Rock');
        R.addEventListener('click', () => {
            const P = document.querySelector('#Paper');
            P.style.removeProperty("border")
            const S = document.querySelector('#Scissors');
            S.style.removeProperty("border")
            R.setAttribute('style','border : 5px solid black;')
          RPS('rock',computerplay())
          });
        const P = document.querySelector('#Paper');
        P.addEventListener('click', () => {
            const R = document.querySelector('#Rock');
            R.style.removeProperty("border")
            const S = document.querySelector('#Scissors');
            S.style.removeProperty("border")
          RPS('paper',computerplay())
          P.setAttribute('style','border : 5px solid black;')
        });
        const S = document.querySelector('#Scissors');
        S.addEventListener('click', () => {
            const R = document.querySelector('#Rock');
            R.style.removeProperty("border")
            const P = document.querySelector('#Paper');
            P.style.removeProperty("border")
          RPS('scissor',computerplay())
          S.setAttribute('style','border : 5px solid black;')
        });
    }
    function computerplay(){
        let rand=Math.floor(Math.random()*3);
        if (rand===0)
            rand="rock";
        else if (rand==1)
            rand="paper";
        else
            rand="scissor";
        if (document.contains(document.getElementsByTagName('img')[3])){
            document.getElementsByTagName('img')[3].remove();}
        var a = document.createElement('img');
        a.setAttribute("style","width: auto;height: 150; padding: 5px; border:5px solid white")
        a.src="images/"+rand+".JPG"
        var c = document.getElementById('computer');
        c.after(a);
        return rand
    }
    function RPS(player_selection,computer_selection){
        count+=1
        const new_game = document.querySelector('#new_game');
        new_game.addEventListener('click', () => {
            count=0
            score=0
            document.getElementsByTagName("p")[0].textContent = "SCORE = "+score;
            document.getElementsByTagName("p")[1].textContent = "COUNTER = "+count;
            document.getElementsByTagName("p")[2].textContent = "WELCOME TO NEW GAME";
            if (document.contains(document.getElementsByTagName('img')[3])){
                document.getElementsByTagName('img')[3].remove();}
            });
        if ((player_selection == "rock" && computer_selection == "scissor")||(player_selection == "paper" && computer_selection == "rock")||(player_selection == "scissor" && computer_selection == "paper"))
            {
                const color = document.querySelector('#color');
                color.setAttribute("style","animation: blinkingBackground1 2s 2;")
            document.getElementsByTagName("p")[0].textContent = "SCORE = "+score;
            document.getElementsByTagName("p")[1].textContent = "COUNTER = "+count;
            document.getElementsByTagName("p")[2].textContent ="YOU WIN!! "+player_selection+" beats "+computer_selection;
            score+=100
        }
        else if (player_selection==computer_selection){
            const color = document.querySelector('#color');
                color.setAttribute("style","animation: blinkingBackground3 2s 2;")
            document.getElementsByTagName("p")[0].textContent = "SCORE = "+score;
            document.getElementsByTagName("p")[1].textContent = "COUNTER = "+count;
            document.getElementsByTagName("p")[2].textContent ="IT'S A TIE!!";
            score+=50}
        else {
            const color = document.querySelector('#color');
                color.setAttribute("style","animation: blinkingBackground2 2s 2;")
            document.getElementsByTagName("p")[1].textContent = "COUNTER = "+count;
            document.getElementsByTagName("p")[2].textContent ="YOU LOSE!! "+computer_selection+" beats "+player_selection;
        }
    }
let score=0,count=0
Player()