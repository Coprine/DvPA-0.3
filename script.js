//declares global variables
var difficulty;
var playerPoints = 0
var dracPoints = 1
var guards = 10;
var currency = 100;
var prestige = 0;
var currencyGained = 0;
var currencyMod = 25;
var days = 0;
var guardsDead = 0;
var dread = 1;
var susScore = 0;
var prestiged = false;
var proximityMine = false;
var gameEnd = false;


//Sets difficulty on user input
function setDifficulty(diffMod) {
    difficulty = diffMod;
    changeClass("interactive", "visible");
    changeClass("diffSet", "hidden");
    prestigeCheck();
}


//Raises player points
function helpSelf() {
    if(currency >= 50) {
        currency = currency - 50;
        playerPoints = playerPoints + Math.ceil(Math.random()*3);
        updateScores();
    } else {
        alert("Not enough currency");
    }
}

//Raises guard score
function hireGuards() {
    if(currency >= 25) {
        currency = currency - 25;
        let hiredGuards = Math.ceil(Math.random() * (6 - dread / 2));
        if(dread >= 3) {
            hiredGuards = hiredGuards -1;
            if (hiredGuards < 0) {
                hiredGuards = 0;
            }
        }
        guards = guards + hiredGuards;
        updateScores();
        document.getElementById("maintext").innerHTML = "You were able to hire " + hiredGuards + " new guards." 
    } else {
        alert("Not enough currency");
    }
}


//Decreases dread and dracPoints
function exorcism() {
    if(currency >= 60) {
        currency = currency - 60;
        let priestPoints = Math.ceil(Math.random() * 30);
        if(priestPoints <= 8) {
            document.getElementById("maintext").innerHTML = "The codger was a fraud! Barely scared off the bats.";
        } else if(priestPoints >= 9 && priestPoints <= 23) {
            document.getElementById("maintext").innerHTML = "The castle is filled with an odd sense of tranquility.";
        } else {
            document.getElementById("maintext").innerHTML = "The pope himself answers your call and sucker punches you, leaving an imprint of the Vatican ring on your forehead.";
        }
        dracPoints = dracPoints - priestPoints;
        dread = dread - Math.ceil(priestPoints / 10);
        if(dracPoints < 0) {
            dracPoints = 0;
        }
        if(dread < 0) {
            dread = 0;
        }
        updateScores();
    } else {
        alert("Not enough currency");
    }
}


//Increases currency earned
function taxIncrease() {
    if(currency >= 15) {
        currency = currency - 15;
        currencyMod += Math.ceil((Math.random() * 3) / 2);
        updateScores();
    } else {
        alert("Not enough currency");
    }
    susScore++
    if(susScore >= 15){
        alert('Literally 1984')
        for(var i=0; i<Infinity; i++) {
            console.log(i);
        }
    }
}

//Buys proximity mine
function setMine() {
    if (prestige >= 2) {
        prestige -= 2;
        proximityMine = true;
        document.getElementById("mineButton").value = "Proximity Mine Armed!";
        document.getElementById("mineButton").onclick = '';
        updateScores();
    } else {
        alert("Not enough prestige");
    }
}

//Converts prestige to currency
function stealTaxes() {
    if(prestige >= 1) {
        prestige--;
        currency = currency + 125;
        updateScores();
    } else {
        alert('Not enough prestige')
    }
}

//All dracula-related processes, as well as winning, losing, and updating scores
function nightCycle() {
    //Resets Easter Egg
    susScore = 0;
    //Updates dread
    var dreadInc = Math.ceil(Math.random()*dread);
    if (dreadInc == dread) {
        dread++;
    }
    if(dread >= 7) {
        dread == 6;
    }
    //Dracula and guard score update
    dracPoints = dracPoints + Math.ceil(Math.random()*(difficulty*dread));
    guardsDead = Math.ceil(dracPoints / 4) * (Math.ceil(Math.random() * 3));
    guards = guards - guardsDead
    currencyGained = Math.ceil(Math.random() * currencyMod) * 5 + 25 - Math.floor((guards / 3) * 5); 
    currency = currency + currencyGained;
    if (currency < 0) {
        guards = guards + Math.ceil(currency/5);
        if(guards < 0) {
            guards = 0;
        }
    }
    days = days + 1
    if(guards < 0) {
        guards = 0;
    }
    //Updates other scores
    updateScores();
    //Checks for win / loss / Dracula blew up
    if(playerPoints >= 20) {
        endGame();
        document.getElementById("maintext").innerHTML = "Game over. You win! <br>";
        document.getElementById("restartButton").style.visibility = "visible";
        dreadUpdate("Eliminated", "#ccddff");
        prestiged = true;
        prestige = prestige + (Math.ceil(difficulty/2));
        setTimeout(function(){
            alert("You killed Dracula, you win!");
        }, 4);
    } else if(guards <= 0 && proximityMine == true) {
        document.getElementById("mineButton").onclick = setMine;
        document.getElementById("mineButton").value = "Arm Proximity Mine (2 Prestige)";
        alert('The bugger ran into your proximity mine and blew his leg off!');
        dracPoints -= 30;
        dread = 0;
            if(dracPoints < 0) {
                dracPoints = 0;
            }
        proximityMine = false;
        updateScores();
        morningUpdate();
    } else if(guards <= 0 && proximityMine == false) {
        endGame();
        document.getElementById("maintext").innerHTML = "Game over. You lose! <br>";
        document.getElementById("restartButton").style.visibility = "visible";
        dreadUpdate("Unimaginable", "#882222");
        prestige -= difficulty;
        if(prestige < 0) {
            prestige = 0;
        }
        setTimeout(function(){
        alert("With no guards to save you, Dracula has bitten you, you lose.");
        }, 4);
    } else {
        morningUpdate();
    }
}


//Updates scores 
function updateScores() {
    document.getElementById("guardcount").innerHTML = "Guards: " + guards;
    document.getElementById("daycount").innerHTML = "Day " + days;
    document.getElementById("currency").innerHTML = "Currency: " + currency;
    document.getElementById("prestigePoints").innerHTML = "Prestige: " + prestige;
    if (gameEnd == false){
        switch(dread) {
            case 0:
                dreadUpdate("Peaceful", "#ddddff");
            break;
            case 1:
                dreadUpdate("Creeping", "#ffffff");
            break;
            case 2:
                dreadUpdate("Eerie", "#ffdddd");
            break;
            case 3:
                dreadUpdate("Horrifying", "#aa7777");
            break;
            case 4:
                dreadUpdate("All-Encompassing", "#dd5555");
            break;
            case 5:
                dreadUpdate("Apocalyptic", "#ff3333");
        }
    }
    prestigeCheck();
}

//Updates text color and dread
function dreadUpdate(dreadName, dreadColor) {
    var changeColor = document.getElementsByClassName("text");
    for(var i=0, len=changeColor.length; i<len; i++) {
    changeColor[i].style["color"] = dreadColor;
    }
    document.getElementById("dread").innerHTML = "Dread: " + dreadName;
}


//Updates MainText each morning
function morningUpdate() {
    if(currencyGained > 0) {
        var updateText = `You lost ${guardsDead} guards to Dracula and gained €${currencyGained} in tax dollars.`;
    } else {
        var updateText = `You lost ${guardsDead} guards to Dracula and lost €${currencyGained} to guard wages.`;
    }
    document.getElementById("maintext").innerHTML = updateText;
}


//Hides prestige-related items when no games have been won
function prestigeCheck() {
    if(prestiged == false) {
    changeClass("prestige", "collapse");
    } else {
    changeClass("prestige", "visible");
    }
}

//Hides elements after game ends
function endGame() {
    gameEnd = true;
    changeClass("interactive", "collapse");
}

//Resets scores
function restart() {
    difficulty;
    playerPoints = 0
    dracPoints = 1
    guards = 10;
    currency = 100;
    currencyGained = 0;
    currencyMod = 25;
    days = 0;
    guardsDead = 0;
    dread = 1;
    proximityMine = false;
    gameEnd = false;

    updateScores();

    document.getElementById("restartButton").style.visibility = "collapse";

    changeClass("interactive", "collapse");
    changeClass("diffSet", "visible");
}

function changeClass(vClass, visibility) {
    var classChange = document.getElementsByClassName(vClass);
    for(var i=0, len=classChange.length; i<len; i++)
    {
        classChange[i].style["visibility"] = visibility;
    }
}