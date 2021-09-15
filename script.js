// jsonUrl = "data-dialogue.json";
// function loadData(jsonUrl, onLoadCallBack) {
//     window.fetch(jsonUrl).then((res) => {
//         return res.json()
//     }).then((data) => {
//         onLoadCallBack(data)
//     });
// }
const trigger = [
    //0 
    ["salut", "hey", "bonjour", "slt"],
    //1
    ["bien", "how are things"],
    //2
    ["what is going on", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["tell me story", "tell me joke"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"]
];


const reply = [
    //0 
    ["ça va ?", "Tu vas bien ?", "Comment tu vas ?", "Bien ?"], 
    //1
    [
        "C’est dingue ce que les journées passent vite, je n’ai même plus le temps de voir mes ami.es en ce moment. Et vous, comment allez-vous ?",
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
        ],
    //2
    [
        "Nothing much",
        "Exciting things!"
        ],
    //3
    ["Glad to hear it"],
    //4
    ["Why?", "Cheer up buddy"],
    //5
    ["What about?", "Once upon a time..."],
    //6
    ["You're welcome", "No problem"],
    //7
    ["Goodbye", "See you later"],
    ];
    
const alternative = [
        "Same",
        "Go on...",
        "Try again",
        "I'm listening...",
        "Bro..."
    ];

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
    }
  });
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");
    
    //compare arrays
    //then search keyword
    //then random alternative
    
    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    //update DOM
    addChat(input, product);
}

function compare(triggerArray, replyArray, text) {
    let item, items;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == text) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

function chat () {

    //remove all characters except word characters, space, and digits
      let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    
    // 'tell me a story' -> 'tell me story'
    // 'i feel happy' -> 'happy'
      text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");
    }
   


    const robot = ["How do you do, fellow human", "I am not a bot"];

    
    function delay(n){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
        });
    }

    
    async function addChat(input, product) {
        const mainDiv = document.getElementById("main");
        let userDiv = document.createElement("div");
        userDiv.id = "user";
        userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
        mainDiv.appendChild(userDiv);
        let botTyping = document.querySelector('#typingStatus');
        let botDiv = document.createElement("div");
        botDiv.id = "bot";
        await delay(0.3);
        botTyping.innerHTML = 'is typing.';
        await delay(0.3);
        botTyping.innerHTML = 'is typing..';
        await delay(0.3);
        botTyping.innerHTML = 'is typing...';
        await delay(0.3);
        botTyping.innerHTML = 'is typing.';
        await delay(0.3);
        botTyping.innerHTML = 'is typing..';
        await delay(0.3);
        botTyping.innerHTML = 'is typing...';
        await delay(1.5);
        botDiv.innerHTML = `Chatbot: <span id="bot-response">${product}</span>`;
        mainDiv.appendChild(botDiv);
        speak(product);
    }
    
    function speak(string) {
        const u = new SpeechSynthesisUtterance();
        allVoices = speechSynthesis.getVoices();
        u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
        u.text = string;
        u.lang = "en-US";
        u.volume = 1; //0-1 interval
        u.rate = 1;
        u.pitch = 1; //0-2 interval
        speechSynthesis.speak(u);
    }
    
    async function intro () {
        let botTyping = document.querySelector('#typingStatus'); //Récupération du typing
        let mainDiv = document.getElementById("main");
        let botDiv = document.createElement("div");
        botDiv.id = "bot"; //On créer une div de réponse auquel on attribue un id = bot.
        async function typing() { //Fonction assynchrone permettant d'animer les 3 points.
            for(i=0; i<2; i++) {
                await delay(0.3);
                botTyping.innerHTML = 'is typing.';
                for (let i=0; i<2; i++){
                    await delay(0.3);
                    botTyping.innerHTML += '.';
                }
                
            }
            botTyping.innerHTML = '';
        }
        typing(); //Execution de la fonction typing
        await  delay(2.4); //Délai avant la première interaction
        botDiv.innerHTML = `Chatbot: <span id="bot-response">« Bonjour ! j’attendais que 
        vous vous connectiez.</span>`;
        mainDiv.appendChild(botDiv); //On affiche la réponse
    }

    window.onload = function() {
        intro(); //Fonction permettant d'afficher les premières phrases de Quester lorsque 
        //la page se charge
    }