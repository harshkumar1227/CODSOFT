function sendMessage() {

    let userInput = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");

    let message = userInput.value.trim();

    if (message === "") {
        return;
    }

    // User Message
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = message;

    chatBox.appendChild(userMessage);

    // Bot Reply
    let botReply = getBotResponse(message);

    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.innerText = botReply;

    setTimeout(() => {
        chatBox.appendChild(botMessage);

        // Auto scroll
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    userInput.value = "";
}
document.getElementById("userInput")
.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
// Chatbot Logic
function getBotResponse(input) {

    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I help you?";
    }

    else if (input.includes("how are you")) {
        return "I am fine. Thanks for asking!";
    }

    else if (input.includes("your name")) {
        return "I am a simple chatbot.";
    }

    else if (input.includes("bye")) {
        return "Goodbye! Have a nice day.";
    }

    else if (input.includes("help")) {
        return "You can ask me basic questions like greetings or my name.";
    }

    else if (input.includes("weather")) {
        return "Sorry, I cannot check live weather yet.";
    }

    else {
        return "Sorry, I don't understand that.";
    }
}