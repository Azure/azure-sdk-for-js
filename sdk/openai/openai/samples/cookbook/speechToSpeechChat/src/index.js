const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
import { sendTextViaAzureSpeechSDK, speakTextViaAzureSpeechSDK } from "./azureSpeech.js";
import { sendTextViaWebSpeechAPI, speakTextViaWebSpeechAPI } from "./webSpeech.js";

let SpeechSDK, client, statusDiv, stopRecognitionFunc;
let useAzureSpeechSDK = true;
const azureSpeechCheckbox = document.getElementById('useAzureSpeechSDK');
const speechKeyElement = document.getElementById("speechKey");
const speechRegionElement = document.getElementById("speechRegion");

azureSpeechCheckbox.addEventListener('change', function() {
  useAzureSpeechSDK = this.checked;
  speechKeyElement.disabled = !useAzureSpeechSDK;
  speechRegionElement.disabled = !useAzureSpeechSDK;
});

function startChatFromSpeech() {
  statusDiv = document.getElementById("statusDiv");
  const promptInput = document.getElementById("promptInput");
  statusDiv.innerHTML = "";
  promptInput.innerHTML = "";

  stopRecognitionFunc = useAzureSpeechSDK ? 
    sendTextViaAzureSpeechSDK(sendTextToChatGPT, promptInput, speechKeyElement.value, speechRegionElement.value) :
    sendTextViaWebSpeechAPI(sendTextToChatGPT, promptInput);
}

function sendTextToChatGPT(text) {
  if (!client) {
    const azureOpenAIKey = document.getElementById("azureOpenAIKey");
    const endpoint = document.getElementById("endpoint");

    const credential = new AzureKeyCredential(azureOpenAIKey.value);
    client = new OpenAIClient(endpoint.value, credential);
  }

  async function showResponseChoices() {
    try {
      const deploymentId = document.getElementById("deploymentId");
      const { choices } = await client.getCompletions(deploymentId.value, [text]);
      const gptResponseText = choices[0]?.text;
      useAzureSpeechSDK ?
        speakTextViaAzureSpeechSDK(gptResponseText, speechKeyElement.value, speechRegionElement.value) : 
        speakTextViaWebSpeechAPI(gptResponseText);
      const resultDiv = document.getElementById("resultDiv");
      resultDiv.innerHTML = gptResponseText;
    } catch (e) { 
      console.log(e);
      statusDiv.innerHTML += `(Error calling showResponseChoices): ${e}`;
    }
  }
  showResponseChoices();
}

window.addEventListener("DOMContentLoaded", function () {
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
  }

  const startChat = document.getElementById("startChat");
  const stopChat = document.getElementById("stopChat");

  startChat.addEventListener("click", function () {
    startChatFromSpeech();
    startChat.disabled = true;
    stopChat.disabled = false;
  });

  stopChat.addEventListener("click", function () {
    if (!!stopRecognitionFunc) {
      stopRecognitionFunc();
      stopRecognitionFunc = null;
      startChat.disabled = false;
      stopChat.disabled = true;
    }
  });
});
