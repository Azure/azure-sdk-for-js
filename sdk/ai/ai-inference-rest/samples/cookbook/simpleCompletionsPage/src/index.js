import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

function getInferenceChoices(resultDiv) {
  const azureKey = document.getElementById("azureKey");
  const endpoint = document.getElementById("endpoint");
  const promptInput = document.getElementById("promptInput");

  resultDiv.innerHTML = "";
  const credential = new AzureKeyCredential(azureKey.value);
  const client = new ModelClient(endpoint.value, credential);

  async function showResponseChoices() {
    try {
      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "user", content: promptInput.value },
          ]
        }
      });

      if (response.status !== "200") {
        throw new Error(response.error);
      }
      const completion = response.body;
      resultDiv.innerHTML = completion.choices[0].message.content;
    } catch (e) {
      console.log(e);
    }
  }

  showResponseChoices();
}

window.addEventListener("DOMContentLoaded", function () {
  const getChoices = document.getElementById("getChoices");

  getChoices.addEventListener("click", function () {
    getInferenceChoices(window.resultDiv);
  });
});
