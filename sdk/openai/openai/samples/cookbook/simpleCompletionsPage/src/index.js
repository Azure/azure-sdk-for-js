const { AzureOpenAI } = require("openai");
const { InteractiveBrowserCredential, getBearerTokenProvider } = require("@azure/identity");

function getOpenAIChoices(resultDiv) {
  const deploymentId = document.getElementById("deploymentId");
  const endpoint = document.getElementById("endpoint");
  const clientId = document.getElementById("clientId");
  const tenantId = document.getElementById("tenantId");
  const promptInput = document.getElementById("promptInput");

  resultDiv.innerHTML = "";
  const scope = "https://cognitiveservices.azure.com/.default";
  const cred = new InteractiveBrowserCredential({ clientId: clientId.value, tenantId: tenantId.value });
  const azureADTokenProvider = getBearerTokenProvider(cred, scope);
  const client = new AzureOpenAI({
    endpoint: endpoint.value,
    azureADTokenProvider,
    deployment: deploymentId.value,
    apiVersion: "2024-04-01-preview",
  });

  async function showResponseChoices() {
    try {
      const { choices } = await client.completions.create({ model: '', prompt: [promptInput.value] });
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
