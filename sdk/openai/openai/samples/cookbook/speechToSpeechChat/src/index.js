const { AzureOpenAI } = require("openai");
const { getBearerTokenProvider, InteractiveBrowserCredential } = require("@azure/identity");
import { sendTextViaAzureSpeechSDK, speakTextViaAzureSpeechSDK } from "./azureSpeech.js";
import { sendTextViaWebSpeechAPI, speakTextViaWebSpeechAPI } from "./webSpeech.js";

let SpeechSDK, client, statusDiv, stopRecognitionFunc, cred, azureADTokenProvider;
let useAzureSpeechSDK = true;
const azureSpeechCheckbox = document.getElementById('useAzureSpeechSDK');
const speechRegionElement = document.getElementById("speechRegion");
const clientId = document.getElementById("clientId");
const tenantId = document.getElementById("tenantId");
const scope = "https://cognitiveservices.azure.com/.default";

azureSpeechCheckbox.addEventListener('change', function() {
  useAzureSpeechSDK = this.checked;
  speechRegionElement.disabled = !useAzureSpeechSDK;
});

function startChatFromSpeech() {
  statusDiv = document.getElementById("statusDiv");
  const promptInput = document.getElementById("promptInput");
  statusDiv.innerHTML = "";
  promptInput.innerHTML = "";
  cred = new InteractiveBrowserCredential({ clientId: clientId.value, tenantId: tenantId.value });
  azureADTokenProvider = getBearerTokenProvider(cred, scope);

  stopRecognitionFunc = useAzureSpeechSDK ? 
    sendTextViaAzureSpeechSDK(sendTextToChatGPT, promptInput, azureADTokenProvider, speechRegionElement.value) :
    sendTextViaWebSpeechAPI(sendTextToChatGPT, promptInput);
}

function sendTextToChatGPT(text) {
  if (!client) {
    const endpoint = document.getElementById("endpoint");
    const deploymentId = document.getElementById("deploymentId");

    client = new AzureOpenAI({
      endpoint: endpoint.value,
      azureADTokenProvider,
      deployment: deploymentId.value,
      apiVersion: "2024-04-01-preview",
    });  }

  async function showResponseChoices() {
    try {
      const { choices } = await client.completions.create({ model: '', prompt: [text]});
      const gptResponseText = choices[0]?.text;
      useAzureSpeechSDK ?
        speakTextViaAzureSpeechSDK(gptResponseText, azureADTokenProvider, speechRegionElement.value) : 
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
