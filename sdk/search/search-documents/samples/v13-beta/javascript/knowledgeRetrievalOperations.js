// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Knowledge Retrieval against a `KnowledgeBase` that
 * is composed of multiple knowledge source kinds, including the preview
 * kinds added in `13.1.0-beta.1` (e.g. `file`).
 *
 * The sample provisions a `searchIndex` knowledge source and a `file`
 * knowledge source (with a real file upload), bundles them into a
 * `KnowledgeBase`, and then issues a `retrieve` call through the
 * `KnowledgeRetrievalClient`. The provisioning step is skipped if
 * `KNOWLEDGE_BASE_NAME` is provided — in that case the sample only runs
 * the retrieval call against the pre-existing knowledge base.
 */

const { readFileSync } = require("node:fs");
const { fileURLToPath } = require("node:url");
const { dirname, resolve } = require("node:path");

const { DefaultAzureCredential } = require("@azure/identity");
const { KnowledgeRetrievalClient, SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIEmbeddingDeployment =
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || "text-embedding-ada-002";

const PROVISIONED_KNOWLEDGE_BASE_NAME = process.env.KNOWLEDGE_BASE_NAME || "";

const SAMPLE_INDEX_NAME = "example-index-for-retrieval-sample";
const SAMPLE_SEARCH_INDEX_KS_NAME = "example-search-index-ks-for-retrieval-sample";
const SAMPLE_FILE_KS_NAME = "example-file-ks-for-retrieval-sample";
const SAMPLE_KNOWLEDGE_BASE_NAME = "example-knowledge-base-for-retrieval-sample";

async function provisionKnowledgeBase(client) {
  console.log(`Provisioning sample knowledge base...`);

  await client.createIndex({
    name: SAMPLE_INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
    ],
  });

  const searchIndexKnowledgeSource = {
    name: SAMPLE_SEARCH_INDEX_KS_NAME,
    kind: "searchIndex",
    description: "Search index knowledge source for retrieval sample",
    searchIndexParameters: { searchIndexName: SAMPLE_INDEX_NAME },
  };
  await client.createKnowledgeSource(searchIndexKnowledgeSource);

  // Optionally add a File knowledge source when Azure OpenAI is configured.
  const knowledgeSources = [{ name: SAMPLE_SEARCH_INDEX_KS_NAME }];
  if (azureOpenAIEndpoint) {
    const fileKnowledgeSource = {
      name: SAMPLE_FILE_KS_NAME,
      kind: "file",
      description: "File knowledge source for retrieval sample",
      fileParameters: {
        ingestionParameters: {
          embeddingModel: {
            kind: "azureOpenAI",
            azureOpenAIParameters: {
              deploymentId: azureOpenAIEmbeddingDeployment,
              resourceUrl: azureOpenAIEndpoint,
              modelName: azureOpenAIEmbeddingDeployment,
            },
          },
        },
      },
    };
    await client.createKnowledgeSource(fileKnowledgeSource);

    // Upload a small file so the File knowledge source has content to retrieve.
    const fileName = "sample.txt";
    const fileContents = readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", fileName),
    );
    await client.uploadKnowledgeSourceFile(
      SAMPLE_FILE_KS_NAME,
      fileContents,
      `attachment; filename="${fileName}"`,
    );
    knowledgeSources.push({ name: SAMPLE_FILE_KS_NAME });
    console.log(`  Added File knowledge source ${SAMPLE_FILE_KS_NAME} with uploaded file`);
  } else {
    console.log(
      "  Skipping File knowledge source: set AZURE_OPENAI_ENDPOINT to include it in the sample.",
    );
  }

  const knowledgeBase = {
    name: SAMPLE_KNOWLEDGE_BASE_NAME,
    description: "Knowledge base for the knowledge retrieval sample",
    knowledgeSources,
  };
  await client.createKnowledgeBase(knowledgeBase);
  console.log(
    `Created knowledge base ${SAMPLE_KNOWLEDGE_BASE_NAME} with sources: ` +
      knowledgeSources.map((s) => s.name).join(", "),
  );

  return SAMPLE_KNOWLEDGE_BASE_NAME;
}

async function teardownKnowledgeBase(client) {
  console.log(`Cleaning up sample knowledge base...`);
  await client.deleteKnowledgeBase(SAMPLE_KNOWLEDGE_BASE_NAME).catch(() => {});
  if (azureOpenAIEndpoint) {
    try {
      for await (const file of client.listKnowledgeSourceFiles(SAMPLE_FILE_KS_NAME)) {
        if (file.fileId) {
          await client.deleteKnowledgeSourceFile(SAMPLE_FILE_KS_NAME, file.fileId).catch(() => {});
        }
      }
    } catch {
      // ignore — knowledge source may not exist
    }
    await client.deleteKnowledgeSource(SAMPLE_FILE_KS_NAME).catch(() => {});
  }
  await client.deleteKnowledgeSource(SAMPLE_SEARCH_INDEX_KS_NAME).catch(() => {});
  await client.deleteIndex(SAMPLE_INDEX_NAME).catch(() => {});
}

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
    // New in 13.1.0-beta.1: control the output shape and reasoning effort
    // applied during retrieval. These options are optional.
    outputMode: "extractiveData",
    retrievalReasoningEffort: { kind: "medium" },
  };

  const response = await retrievalClient.retrieve(retrievalRequest);
  console.log(`Retrieved knowledge response:`);
  console.log(`  Activity records: ${response.activity?.length ?? 0}`);
  console.log(`  References: ${response.references?.length ?? 0}`);
}

async function main() {
  console.log(`Running Knowledge Retrieval Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const indexClient = new SearchIndexClient(endpoint, credential);

  let knowledgeBaseName = PROVISIONED_KNOWLEDGE_BASE_NAME;
  const shouldProvision = !knowledgeBaseName;
  if (shouldProvision) {
    knowledgeBaseName = await provisionKnowledgeBase(indexClient);
  } else {
    console.log(`Using pre-provisioned knowledge base: ${knowledgeBaseName}`);
  }

  try {
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, knowledgeBaseName, credential);
    await retrieveKnowledge(retrievalClient);
    await retrieveKnowledgeWithOptions(retrievalClient);
  } finally {
    if (shouldProvision) {
      await teardownKnowledgeBase(indexClient);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
