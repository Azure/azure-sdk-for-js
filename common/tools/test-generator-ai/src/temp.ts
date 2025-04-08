
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { config } from "dotenv";

config();

const endpoint = "https://ai-sanallurai525216915350.openai.azure.com/openai/deployments/gpt-4.5-preview";
const modelName = "gpt-4.5-preview";

export async function temp_main() {

  const client = ModelClient(endpoint, new AzureKeyCredential(process.env.AZURE_OPENAI_KEY || ""));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "I am going to Paris, what should I see?" }
      ],
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: modelName,
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  console.log(response.body.choices[0].message.content);
}

temp_main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
