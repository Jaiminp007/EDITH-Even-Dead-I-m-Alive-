
//Function connected to HTML
function takeInput(){

    //Dom element
    const chatInput = document.querySelector(".chatInput textarea");
    const chatbox = document.querySelector(".chatbox");
    const sendChatBtn = document.querySelector(".chatInput span");

    //Variable
    let userMessage;

    //API KEY of ChatGPT
    const apiKey = "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";

    //Create Element Li
    const createChatLi = (message, chatOutputArray) => {
        const chatLi = document.createElement("li");

        //Adding classes
        if (chatOutputArray && Array.isArray(chatOutputArray)) {
            chatOutputArray.forEach(chatName => {
                chatLi.classList.add(chatName);
            });
        }
        //Js connected to HTML
        let chatContent = `<div>${message}</div>`;
        chatLi.innerHTML = chatContent;

        return chatLi;
    }

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
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}]
            },)
        }

        //Make Fetch Request to OPEN AI
        fetch(apiUrl, getOption).then(res => res.json()).then(data =>{
            console.log(data)
            //Make the response into the box
            outputInBox.innerHTML = data.choices[0].message.content;
        }).catch((error) => {
            console.log(error)
            //Make error message into the box
            outputInBox.innerHTML = "Something went wrong!! Please try again.";
        })

    
    }

    //Chat Process
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
        }, 600) 

        document.getElementById("output").value = "";
    }

    //Event listener for click in button
    sendChatBtn.addEventListener("click", handleChat);

}
