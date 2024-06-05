
const SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");

async function azureADTokenProvider() {
  const response = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function sendTextViaAzureSpeechSDK(input) {
    const { sendTextFunc, promptInput, statusDiv } = input;
    const { token, region } = await azureADTokenProvider();
    const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, region);
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognized = async (s, e) => {
      if (!!e && !!e.result && !!e.result.text) {
        statusDiv.innerHTML = "Sending input prompt to ChatGPT";
        promptInput.innerHTML = e.result.text;
        await sendTextFunc(e.result.text);
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
    };

    try {
      statusDiv.innerHTML = "Listening from microphone input for ChatGPT prompt";
      recognizer.startContinuousRecognitionAsync(
        () => {},
        function (err) {
          window.console.log(err);
          statusDiv.innerHTML += `(Error calling SpeechRecognizer.startContinuousRecognitionAsync): ${err}`;
          recognizer.close();
        });
    } catch (e) {
      console.log(e);
    }

    const stopChatViaAzureSpeechSDK = () => {
      recognizer.stopContinuousRecognitionAsync(
        function () {
          statusDiv.innerHTML = "Chat Stopped";
          recognizer.close();
        });
    }

    return stopChatViaAzureSpeechSDK;
}

export async function speakTextViaAzureSpeechSDK(input) {
  const { text, statusDiv } = input;
  const { token, region } = await azureADTokenProvider();
  const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, region);
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
      statusDiv.innerHTML += `(Error calling SpeechSynthesizer.speakTextAsync): ${err}`;
      synthesizer.close();
      synthesizer = null;
    });
}
