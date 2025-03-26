




// Speech recognition setup
const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

// Function to convert text to speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Function to handle recognized commands
function handleCommand(command) {
    if (command.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (command.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open linkedin")) {
        speak("Opening LinkedIn...");
          window.open("https://www.linkedin.com", "_blank");
        // window.open("https://www.linkedin.com/in/https://www.linkedin.com/in/ujjawal-tiwari-017b30347/", "_blank");
    } else if (command.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://www.whatsapp.com", "_blank");
    } else {
        // Perform a Google search if command not recognized
        speak("Searching Google for " + command);
        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(command)}`,
            "_blank"
        );
    }
}

// Attach click event listener to the button
btn.addEventListener("click", function () {
    // Greet the user and then start listening
    speak("Hello, how can I help you?");

    // Delay to ensure greeting completes before starting recognition
    setTimeout(() => {
        btn.innerHTML = "Listening...👂";
        btn.classList.add("listening");
        console.log("Recognition started");
        recognition.start();
    }, 2500);
});

// When a result is received
recognition.onresult = (event) => {
    console.log("Result Event Fired", event);
    if (event.results[0] && event.results[0][0]) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Command Received: ", command);
        handleCommand(command);
    } else {
        console.warn("No speech detected");
    }
};

// When recognition ends
recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
};

// To catch errors
recognition.onerror = (event) => {
    console.error("Error occurred:", event.error);
};
