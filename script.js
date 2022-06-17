
var currIdx = 0;
var started = false;
var score = parseInt(document.getElementsByClassName("score")[0].textContent);
var timeLeft = parseInt(document.getElementsByClassName("timeLeft")[0].textContent.split(" ")[0]);
var lenghtOfCurrentWord = 0;
var word = "";
const startButton = document.getElementsByClassName("start")[0];
var textContainer = document.getElementsByClassName("text")[0];

// function that listens to key press on keyboard
window.addEventListener("keydown", function(e) {
    if(started == true)
    {
        var regex = /^[A-Za-z0-9]+$/;
        var isValid = regex.test(String.fromCharCode(e.keyCode));
        console.log(isValid);
        if(isValid)
        {
            var element = document.getElementsByClassName('text-' + currIdx)[0];
            console.log(element);
            if(e.key == element.textContent)
            {
                element.setAttribute('style', "color: green;font-size: 4rem;");
                score += 1;
                currIdx += 1;
                document.getElementsByClassName("score")[0].textContent = score;
            }
            else 
            {
                element.setAttribute('style', "color: red;font-size: 4rem;");
            }

            if(lenghtOfCurrentWord == currIdx)
            {
                showText();
            }
        }
    }
});

// function to show word rendered by fetch 
showText = async () => {
    await getRandomWord();
    
    var list = word.split("");
    lenghtOfCurrentWord = list.length;
    currIdx = 0;
    // erase the letter before showing new one
    var child = textContainer.firstElementChild;
    while(child)
    {
        textContainer.removeChild(child);
        child = textContainer.firstElementChild;
    }

    // adding new letter
    for(var i = 0;i<list.length;i++)
    {
        var textChild = document.createElement("p");
        textChild.classList.add('text-' + i);
        textChild.setAttribute('style', "color: grey;font-size: 4rem")
        var text = document.createTextNode(list[i]);
        textChild.appendChild(text);
        textContainer.appendChild(textChild);
    }
}

// function to reset everything to initial state
resetEverything = () => {
    var child = textContainer.firstElementChild;
    while(child)
    {
        textContainer.removeChild(child);
        child = textContainer.firstElementChild;
    }
    score = 0;
    currIdx = 0;
    started = false;
    timeLeft = 60;
    lenghtOfCurrentWord = 0;
    startButton.setAttribute('style', 'visibility: visible');
    document.getElementsByClassName("timeLeft")[0].textContent = timeLeft + " Seconds";
    document.getElementsByClassName("score")[0].textContent = score;
}

// triggered to start countdown of given timer
startCountDown = () => {
    var myFunc = setInterval(function() {
        timeLeft = timeLeft - 1;
        if(timeLeft < 0) 
        {
            clearInterval(myFunc);
            alert("Time Up!" + " Your score is: " + score);
            resetEverything();
        }
        document.getElementsByClassName("timeLeft")[0].textContent = timeLeft + " Seconds";
    }, 1000);
}


// onClick event listener for start button
startButton.addEventListener("click", function(e) {
    started = true;
    showText();
    startButton.setAttribute('style', "visibility: hidden")
    startCountDown();

    console.log(e);  
})

// function to get random word fetched from API 
async function getRandomWord() {
    await fetch('https://random-word-api.herokuapp.com/word').then(response => response.json()).then(data => {
        word = data[0];
    });
}