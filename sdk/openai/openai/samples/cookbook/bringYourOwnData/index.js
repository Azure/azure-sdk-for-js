// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Importing the @azure/search-documents library
const { SearchIndexClient, SearchClient, AzureKeyCredential, odata } = require("@azure/search-documents");

// Importing the @azure/openai library
const { OpenAIClient } = require("@azure/openai");

// Importing the index definition and sample data
const hotelData = require('./hotels.json');
const indexDefinition = require('./hotels_quickstart_index.json');

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

    console.log('Checking if index exists...');
    await deleteIndexIfExists(indexClient, indexName);

    console.log('Creating index...');
    let index = await indexClient.createIndex(indexDefinition);
    console.log(`Index named ${index.name} has been created.`);

    // Creating a search client to upload documents and issue queries
    const searchClient = indexClient.getSearchClient(indexName);

    console.log('Uploading documents...');
    let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(hotelData['value']);
    console.log(`Index operations succeeded: ${JSON.stringify(indexDocumentsResult.results[0].succeeded)} `);

    // waiting one second for indexing to complete (for demo purposes only)
    sleep(1000);

    // send example question to open AI instance
    const exampleQuestions = [
      {
        role: "user",
        content: "Which hotel would you recommend for a foodie, and why?",
      },
    ];

    console.log(`Asking ChatGPT: ${exampleQuestions.content}`);
    console.log();
    await askOpenAI(indexName, exampleQuestions);
}

async function deleteIndexIfExists(indexClient, indexName) {
    try {
        await indexClient.deleteIndex(indexName);
        console.log('Deleting index...');
    } catch {
        console.log('Index does not exist yet.');
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
            parameters: {
              endpoint: azureSearchEndpoint,
              key: azureSearchAdminKey,
              indexName: azureSearchIndexName,
            },
          },
        ],
      },
    });

    for await (const event of events) {
      for (const choice of event.choices) {
        console.log(choice.delta?.content);
      }
    }
    console.log();
}

function sleep(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    } while (d2 - d < ms);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
