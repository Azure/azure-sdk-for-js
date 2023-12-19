// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Importing the @azure/search-documents library
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

// Importing the @azure/openai library
const { OpenAIClient } = require("@azure/openai");

const fs = require("fs");

// Importing the index definition and sample data
const hotelData = JSON.parse(fs.readFileSync("./hotels.json"));
const indexDefinition = JSON.parse(fs.readFileSync("./hotels_quickstart_index.json"));

// Load the .env file if it exists
require("dotenv").config();

// Getting search endpoint, search admin Key, Azure OpenAI endpoint, Azure API Key, and chat deployment id from .env file
const azureSearchEndpoint = process.env.SEARCH_API_ENDPOINT || "";
const azureSearchAdminKey = process.env.SEARCH_API_KEY || "";
const azureApiKey = process.env.AZURE_API_KEY || "";
const openAiEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const chatDeploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID || "";

async function main() {
  console.log(`Running Azure Cognitive Search Javascript quickstart...`);
  if (!azureSearchEndpoint || !azureSearchAdminKey || !azureApiKey || !openAiEndpoint || !chatDeploymentId) {
    console.log("Make sure to set valid values for azureSearchEndpoint, azureSearchAdminKey, azureApiKey, openAiEndpoint, and chatDeploymentId with proper authorization.");
    return;
  }

  // Creating an index client to create the search index
  const indexClient = new SearchIndexClient(azureSearchEndpoint, new AzureKeyCredential(azureSearchAdminKey));

  // Getting the name of the index from the index definition
  const indexName = indexDefinition["name"];

  console.log("Checking if index exists...");
  await deleteIndexIfExists(indexClient, indexName);

  console.log("Creating index...");
  let index = await indexClient.createIndex(indexDefinition);
  console.log(`Index named ${index.name} has been created.`);

  // Creating a search client to upload documents and issue queries
  const searchClient = indexClient.getSearchClient(indexName);

  console.log("Uploading documents...");
  let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(hotelData["value"]);
  console.log(`Index operations succeeded: ${JSON.stringify(indexDocumentsResult.results[0].succeeded)} `);

  // send example question to open AI instance
  const exampleQuestions = [
    {
      role: "user",
      content: "Which hotel would you recommend for a foodie, and why?",
    },
  ];

  console.log(`Asking ChatGPT: ${exampleQuestions[0].content}`);
  console.log();
  const chatAnswer = await askOpenAI(indexName, exampleQuestions);
  console.log(`ChatGPT answer: ${chatAnswer}`);

}

async function deleteIndexIfExists(indexClient, indexName) {
  try {
    await indexClient.deleteIndex(indexName);
    console.log("Deleting index...");
  } catch {
    console.log("Index does not exist yet.");
  }
}

async function askOpenAI(azureSearchIndexName, messages) {
  const client = new OpenAIClient(openAiEndpoint, new AzureKeyCredential(azureApiKey));
  const events = client.listChatCompletions(chatDeploymentId, messages, {
    maxTokens: 128,
    /**
     * The `azureExtensionOptions` property is used to configure the
     * Azure-specific extensions. In this case, we are using the
     * Azure Cognitive Search extension with a vector index to provide
     * the model with additional context.
     */
    azureExtensionOptions: {
      extensions: [
        {
          type: "AzureCognitiveSearch",
          endpoint: azureSearchEndpoint,
            key: azureSearchAdminKey,
            indexName: azureSearchIndexName,
        },
      ],
    },
  });

  let chatGptAnswer = "";
  for await (const event of events) {
    for (const choice of event.choices) {
      const newText = choice.delta?.content;
      if (!!newText) {
        chatGptAnswer += newText;
        // To see streaming results as they arrive, uncomment line below
        // console.log(newText);
      }
    }
  }
  return chatGptAnswer;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
