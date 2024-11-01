function takeInput() {
    const chatInput = document.querySelector(".chatInput textarea");
    const chatbox = document.querySelector(".chatbox");
    const sendChatBtn = document.querySelector(".chatInput span");

    //Variable
    let userMessage;

    const apiKey = "";

    const createChatLi = (message, classes) => {
        const chatLi = document.createElement("li");
        if (Array.isArray(classes)) {
            classes.forEach(className => chatLi.classList.add(className));
        }
        chatLi.innerHTML = `<div>${message}</div>`;
        return chatLi;
    };

    //Function for getting response from ChatGPT
    const getResponse = (incomingChatLi) =>{
        const apiUrl = "https://api.openai.com/v1/chat/completions";
        const outputInBox = incomingChatLi.querySelector("div");

        const getOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 300,  // Increase to allow for longer responses
                temperature: 0.7  // Adjust for response creativity (0.7 is moderately creative)
            })
        };

        fetch(apiUrl, getOption)
            .then(res => res.json())
            .then(data => {
            outputInBox.innerHTML = data.choices[0].message.content;
            })
            .catch(error => {
                console.log(error);
                outputInBox.innerHTML = "Something went wrong! Please try again.";
            });
    };

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        //outgoing chat item to the chatbox
        chatbox.appendChild(createChatLi(userMessage, ["chat-outgoing"]));

        //Simulate a delay
        setTimeout(() => {

            //Create an incoming chat list
            const incomingChatLi = createChatLi("I am just Thinking...", ["chat-incoming"]);
            //Adding incoming chat list
            chatbox.appendChild(incomingChatLi);
            //Get response
            getResponse(incomingChatLi);
        }, 600);

        chatInput.value = "";
    };

    //Event listener for click in button
    sendChatBtn.addEventListener("click", handleChat);
}

takeInput();


function clearText() {
    const messageBox = document.getElementById("message-box");
    if (messageBox.value === "Write a message") {
        messageBox.value = ""; // Clear the default text when clicked
    }
}

function restoreText() {
    const messageBox = document.getElementById("message-box");
    if (messageBox.value === "") {
        messageBox.value = "Write a message"; // Restore text if empty
}
}