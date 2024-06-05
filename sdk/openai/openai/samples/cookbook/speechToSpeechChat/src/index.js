import { sendTextViaAzureSpeechSDK, speakTextViaAzureSpeechSDK } from "./azureSpeech.js";
import { sendTextViaWebSpeechAPI, speakTextViaWebSpeechAPI } from "./webSpeech.js";

let stopRecognitionFunc;

window.addEventListener("DOMContentLoaded", function () {
  const startChatBtn = document.getElementById("startChat");
  const stopChatBtn = document.getElementById("stopChat");

  startChatBtn.addEventListener("click", async function () {
    await startChatFromSpeech();
    startChatBtn.disabled = true;
    stopChatBtn.disabled = false;
  });

  stopChatBtn.addEventListener("click", function () {
    if (!!stopRecognitionFunc) {
      stopRecognitionFunc();
      stopRecognitionFunc = null;
      startChatBtn.disabled = false;
      stopChatBtn.disabled = true;
    }
  });
});

async function getCompletions(prompt) {
  const response = await fetch("/api/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const { completions } = await response.json();
  return completions;
}

async function startChatFromSpeech() {
  const statusDiv = document.getElementById("statusDiv");
  const promptInput = document.getElementById("promptInput");
  statusDiv.innerHTML = "";
  promptInput.innerHTML = "";

  stopRecognitionFunc = document.getElementById("useAzureSpeechSDK").checked ? 
    await sendTextViaAzureSpeechSDK({ 
      sendTextFunc:sendTextToChatGPT,
      promptInput,
      statusDiv
    }) :
    sendTextViaWebSpeechAPI(sendTextToChatGPT, promptInput);
}

async function sendTextToChatGPT(text) {
  const statusDiv = document.getElementById("statusDiv");
    try {
      const { choices } = await getCompletions([text]);
      const gptResponseText = choices[0]?.text;
      document.getElementById("useAzureSpeechSDK").checked ?
        await speakTextViaAzureSpeechSDK({
          gptResponseText,
          statusDiv
        }) : 
        speakTextViaWebSpeechAPI(gptResponseText);
      const resultDiv = document.getElementById("resultDiv");
      resultDiv.innerHTML = gptResponseText;
    } catch (e) { 
      console.log(e);
      statusDiv.innerHTML += `(Error calling showResponseChoices): ${e}`;
    }
}