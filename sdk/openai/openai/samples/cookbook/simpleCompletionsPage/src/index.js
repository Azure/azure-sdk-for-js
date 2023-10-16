const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

function getOpenAIChoices(resultDiv) {
  const deploymentId = document.getElementById("deploymentId");
  const azureKey = document.getElementById("azureKey");
  const endpoint = document.getElementById("endpoint");
  const promptInput = document.getElementById("promptInput");

  resultDiv.innerHTML = "";
  const credential = new AzureKeyCredential(azureKey.value);
  const client = new OpenAIClient(endpoint.value, credential);

  async function showResponseChoices() {
    try {
      const { choices } = await client.getCompletions(deploymentId.value, [promptInput.value]);
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
