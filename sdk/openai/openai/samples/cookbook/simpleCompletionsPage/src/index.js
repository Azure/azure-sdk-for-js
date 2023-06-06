const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

function getOpenAIChoices(resultDiv) {
  const deploymentId = document.getElementById("deploymentId");
  const azureKey = document.getElementById("azureKey");
  const endpoint = document.getElementById("endpoint");
  const promptInput = document.getElementById("promptInput");
  const endpointURL = new URL(endpoint.value);

  resultDiv.innerHTML = "";
  const credential = new AzureKeyCredential(azureKey.value);
  const client = new OpenAIClient(endpointURL, credential);

  async function showResponseChoices() {
    try {
      const { id, created, choices, usage } = await client.getCompletions(deploymentId.value, [promptInput.value]);
      resultDiv.innerHTML = choices[0].text;
    } catch (e) { 
      console.log(e);
    }
  }

  showResponseChoices();
}

window.addEventListener("DOMContentLoaded", function () {
  const getChoices = document.getElementById("getChoices");

  getChoices.addEventListener("click", function () {
    getOpenAIChoices(window.resultDiv);
  });
});
