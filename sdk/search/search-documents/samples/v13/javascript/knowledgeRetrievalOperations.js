// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Knowledge Retrieval Operations using KnowledgeRetrievalClient.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { KnowledgeRetrievalClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const knowledgeBaseName = process.env.KNOWLEDGE_BASE_NAME || "";

async function retrieveKnowledge(retrievalClient) {
  console.log(`Retrieve Knowledge Operation`);

  const retrievalRequest = {
    intents: [
      {
        type: "semantic",
        search: "What information is available?",
      },
    ],
  };

  const response = await retrievalClient.retrieve(retrievalRequest);
  console.log(`Retrieved knowledge response:`);
  console.log(`  Activity records: ${response.activity?.length ?? 0}`);
  console.log(`  References: ${response.references?.length ?? 0}`);

  // Print references if available
  if (response.references && response.references.length > 0) {
    console.log(`  Reference details:`);
    for (const ref of response.references) {
      console.log(`    - Type: ${ref.type}`);
    }
  }
}

async function retrieveKnowledgeWithOptions(retrievalClient) {
  console.log(`Retrieve Knowledge With Options Operation`);

  const retrievalRequest = {
    intents: [
      {
        type: "semantic",
        search: "What are the key features?",
      },
    ],
    maxRuntimeInSeconds: 30,
    includeActivity: true,
  };

  const response = await retrievalClient.retrieve(retrievalRequest);
  console.log(`Retrieved knowledge response:`);
  console.log(`  Activity records: ${response.activity?.length ?? 0}`);
  console.log(`  References: ${response.references?.length ?? 0}`);
}

async function main() {
  console.log(`Running Knowledge Retrieval Operations Sample....`);
  if (!endpoint || !knowledgeBaseName) {
    console.log("Be sure to set ENDPOINT and KNOWLEDGE_BASE_NAME environment variables.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const retrievalClient = new KnowledgeRetrievalClient(endpoint, knowledgeBaseName, credential);

  await retrieveKnowledge(retrievalClient);
  await retrieveKnowledgeWithOptions(retrievalClient);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
