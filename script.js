var playerPoints = 0
var dracPoints = 1
var guards = 10;
var currency = 100;
var currencyGained = 0;
var currencyMod = 25;
var days = 0;
var guardsDead = 0;
var proximityMine = false;


function helpSelf() {
    if(currency >= 50) {
        currency = currency - 50;
        playerPoints = playerPoints + Math.ceil(Math.random()*3);
        updateScores();
    } else {
        alert("Not enough currency");
    }
}

function hireGuards() {
    if(currency >= 25) {
        currency = currency - 25;
        let hiredGuards = Math.ceil(Math.random() * 5);
        guards = guards + hiredGuards;
        updateScores();
        document.getElementById("maintext").innerHTML = "You were able to hire " + hiredGuards + " new guards." 
    } else {
        alert("Not enough currency");
    }
}

function exorcism() {
    if(currency >= 60) {
        currency = currency - 60;
        let priestPoints = Math.ceil(Math.random() * 15);
        if(priestPoints <= 5) {
            document.getElementById("maintext").innerHTML = "The codger was a fraud! Barely scared off the bats.";
        } else if(priestPoints >= 6 && priestPoints <= 12) {
            document.getElementById("maintext").innerHTML = "The castle is filled with an odd sense of tranquility.";
        } else {
            document.getElementById("maintext").innerHTML = "The pope himself answers your call and sucker punches you, leaving an imprint of the Vatican ring on your forehead.";
        }
        dracPoints = dracPoints - priestPoints;
        if(dracPoints < 0) {
            dracPoints = 0;
        }
        updateScores();
    } else {
        alert("Not enough currency");
    }
}

function taxIncrease() {
    if(currency >= 15) {
        currency = currency - 15;
        currencyMod += 1;
        updateScores();
    } else {
        alert("Not enough currency");
    }
}

function nightCycle() {
    dracPoints = dracPoints + Math.ceil(Math.random()*6);
    guardsDead = Math.ceil(dracPoints / 4) * (Math.ceil(Math.random() * 3));
    guards = guards - guardsDead
    currencyGained = Math.ceil(Math.random() * currencyMod) * 5 + 25; 
    currency = currency + currencyGained;
    days = days + 1
    if(guards < 0) {
        guards = 0;
    }
    
    if(playerPoints >= 20) {
        endGame();
        document.getElementById("maintext").innerHTML = "Game over. You win! <br> Refresh the page to play again"
        setTimeout(function(){
            alert("You killed Dracula, you win!");
        }, 1);
    } else if(guards <= 0 && proximityMine == false) {
        endGame();
        updateScores();
        document.getElementById("maintext").innerHTML = "Game over. You lose! <br> Refresh the page to play again"
        setTimeout(function(){
        alert("With no guards to save you, Dracula has bitten you, you lose.");
        }, 1);
    } else if(guards <= 0 && proximityMine == true) {
        dracPoints = dracpoints - 10;
            if(dracPoints < 0) {
                dracPoints = 0;
            }
        alert('The bugger ran into your proximity mine and blew his leg off!');
        morningUpdate();
    } else {
        morningUpdate();
    }
    updateScores();
}



function updateScores() {
    document.getElementById("guardcount").innerHTML = "Guards: " + guards;
    document.getElementById("daycount").innerHTML = "Day " + days;
    document.getElementById("currency").innerHTML = "Currency: " + currency;
}

function morningUpdate() {
    let updateText = `You lost ${guardsDead} guards to dracula and gained €${currencyGained} in tax dollars`;
    document.getElementById("maintext").innerHTML = updateText;
}

function endGame() {
    var shutOff = document.getElementsByClassName("interactive");
    for(var i=0, len=shutOff.length; i<len; i++)
    {
        shutOff[i].style["visibility"] = "hidden";
    }
}