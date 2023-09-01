
export function sendTextViaWebSpeechAPI(sendTextFunc, promptInput) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognizer = new SpeechRecognition();
  recognizer.continuous = true;
  recognizer.lang = "en-US";
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;

  recognizer.onresult = (e) => {
    if (!!e?.results[0][0]?.transcript) {
      statusDiv.innerHTML = "Sending input prompt to ChatGPT";
      const inputPrompt = e.results[0][0].transcript;
      promptInput.innerHTML = inputPrompt;
      
      sendTextFunc(inputPrompt);
    }
  };

  recognizer.onerror = (e) => {
    statusDiv.innerHTML = `(Recognition Error): ${e.error}`;
  };

  try {
    statusDiv.innerHTML = "Listening from microphone input for ChatGPT prompt";
    recognizer.start();
  } catch (e) {
    console.log(e);
    statusDiv.innerHTML += `(Error starting recognition): ${e}`;
  }

  const stopChatViaWebSpeechAPI = () => {
    recognizer.stop();
    statusDiv.innerHTML = "Chat Stopped";
  }

  return stopChatViaWebSpeechAPI;
}

export function speakTextViaWebSpeechAPI(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);

  const voices = synth.getVoices();
  const defaultVoice = voices.find(voice => voice.default);
  utterThis.voice = defaultVoice;
  synth.speak(utterThis);
  statusDiv.innerHTML += `\n\nsynthesis finished for [${text}].\n`;
}