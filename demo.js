function sendDemoQuestion() {
    const demoQuestionSelect = document.getElementById("demoQuestions");
    const selectedQuestion = demoQuestionSelect.value;

    if (!selectedQuestion) return; // Exit if no question is selected

    // Reference to the chatbox on the demo page
    const demoChatbox = document.querySelector(".chatbox");

    // Create an outgoing chat item for the selected question
    demoChatbox.appendChild(createChatLi(selectedQuestion, ["chat-outgoing"]));

    // Simulate a delay for the response
    setTimeout(() => {
        // Create an incoming chat item to indicate the chatbot is "thinking"
        const incomingChatLi = createChatLi("I am just Thinking...", ["chat-incoming"]);
        demoChatbox.appendChild(incomingChatLi);
        
        // Call the same response function as the main page (assuming it's defined)
        getResponse(incomingChatLi, selectedQuestion);
    }, 600);
}

const createChatLi = (message, classes) => {
    const chatLi = document.createElement("li");
    if (Array.isArray(classes)) {
        classes.forEach(className => chatLi.classList.add(className));
    }
    chatLi.innerHTML = `<div>${message}</div>`;
    return chatLi;
};

// Mock response function for the demo (replace with actual logic if needed)
const getResponse = (incomingChatLi, userMessage) => {
    const outputInBox = incomingChatLi.querySelector("div");

    // Define responses for specific questions
    let responseText;

    switch (userMessage) {
        case "What can you do?":
            responseText = "E.D.I.T.H. is your AI-powered assistant, here to help with a variety of tasks! I can answer questions, help you learn more about topics like AI, provide assistance with homework, share fun facts, and even tell you jokes. My goal is to make your experience enjoyable, informative, and fun!";
            break;
        case "How does time travel work?":
            responseText = "Time travel, as suggested by Einstein's Theory of Relativity, involves moving through time by traveling near the speed of light or experiencing strong gravity, like near a black hole, which could slow time for the traveler. However, backward time travel remains purely theoretical.";
            break;
        case "Tell me something interesting about AI":
            responseText = "Did you know that AI can learn from vast amounts of data and even recognize patterns faster than humans? AI helps power everything from personalized recommendations to self-driving cars, and it’s continually advancing in areas like creativity and language understanding, making it more adaptable and versatile than ever!";
            break;
        case "What is the future of technology?":
            responseText = "The future of technology is likely to be driven by advancements in artificial intelligence, automation, and connectivity. We can expect to see increased integration of AI in everyday tasks, more smart devices, and innovations in fields like healthcare, renewable energy, and transportation, making our lives more efficient and interconnected.";
            break;
        case "Can you tell me a fun fact?":
            responseText = "Did you know that a single cloud can weigh more than a million pounds? Even though they float in the sky, clouds are made up of tiny water droplets or ice crystals that, when combined, can add up to an impressive weight!"
            break;
        case "Why is climate change important?":
            responseText = "Climate change is important because it threatens our environment, disrupts weather patterns, and impacts food and water security. Addressing it is vital for a sustainable future."
            break;
        default:
            responseText = "I'm not sure how to respond to that, but I'm always learning! Try asking something else.";
    }

    // Display the selected response with a delay
    setTimeout(() => {
        outputInBox.innerHTML = responseText;
    }, 1000);
};
