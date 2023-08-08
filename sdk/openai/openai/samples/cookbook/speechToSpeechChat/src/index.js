const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

let SpeechSDK, speechKey, speechRegion, recognizer, client, statusDiv;

function startChatFromSpeech() {
  speechKey = document.getElementById("speechKey").value;
  speechRegion = document.getElementById("speechRegion").value;

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  statusDiv = document.getElementById("statusDiv");
  const promptInput = document.getElementById("promptInput");
  statusDiv.innerHTML = "";
  promptInput.innerHTML = "";

  recognizer.recognized = (s, e) => {
    if (!!e && !!e.result && !!e.result.text) {
      statusDiv.innerHTML = "Sending input prompt to ChatGPT";
      promptInput.innerHTML = e.result.text;
      
      sendTextToChatGPT(e.result.text);
    }
  };

  recognizer.canceled = (s, e) => {
    console.log(e);
    statusDiv.innerHTML = `(Recognition Canceled) Reason: ${SpeechSDK.CancellationReason[e.reason]}`;
    if (e.reason === SpeechSDK.CancellationReason.Error) {
        statusDiv.innerHTML += `: ${e.errorDetails}`;
    }
    statusDiv.innerHTML += "\r\n";
    recognizer.close();
    recognizer = null;
  };

  try {
    statusDiv.innerHTML = "Listening from microphone input for ChatGPT prompt";
    recognizer.startContinuousRecognitionAsync(
      () => {},
      function (err) {
        window.console.log(err);
        recognizer.close();
        recognizer = null;
      });
  } catch (e) {
    console.log(e);
  }
}

function sendTextToChatGPT(text) {
  if (!client) {
    const deploymentId = document.getElementById("deploymentId");
    const azureOpenAIKey = document.getElementById("azureOpenAIKey");
    const endpoint = document.getElementById("endpoint");

    const credential = new AzureKeyCredential(azureOpenAIKey.value);
    client = new OpenAIClient(endpoint.value, credential);
  }

  async function showResponseChoices() {
    try {
      const { choices } = await client.getCompletions(deploymentId.value, [text]);
      const gptResponseText = choices[0]?.text;
      speakText(gptResponseText);
      const resultDiv = document.getElementById("resultDiv");
      resultDiv.innerHTML = gptResponseText;
    } catch (e) { 
      console.log(e);
    }
  }
  showResponseChoices();
}

function speakText(text) {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  let synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
  synthesizer.speakTextAsync(
    text,
    function (result) {
      if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
        statusDiv.innerHTML += `\n\nsynthesis finished for [${text}].\n`;
      } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
        statusDiv.innerHTML += `\n\nsynthesis failed. Error detail: ${result.errorDetails}\n`;
      }
    },
    function (err) {
      window.console.log(err);
      synthesizer.close();
      synthesizer = null;
    });
}

function stopChatFromSpeech() {
  if (!!recognizer) {
    recognizer.stopContinuousRecognitionAsync(
      function () {
        statusDiv.innerHTML = "Chat Stopped";
        recognizer.close();
        recognizer = null;
      });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
  }
  const startChat = document.getElementById("startChat");

  startChat.addEventListener("click", function () {
    startChatFromSpeech();
  });

  const stopChat = document.getElementById("stopChat");

  stopChat.addEventListener("click", function () {
    stopChatFromSpeech();
  });
});
