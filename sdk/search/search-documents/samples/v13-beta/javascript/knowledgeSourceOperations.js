// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Knowledge Source Operations, including the
 * preview knowledge source kinds added in `13.1.0-beta.1`:
 * `file`, `indexedSharePoint`, `remoteSharePoint`, `workIQ`,
 * `fabricDataAgent`, and `fabricOntology`.
 *
 * The script creates a `searchIndex` knowledge source and a `file`
 * knowledge source (including a file upload), and shows how the other
 * preview kinds are constructed without creating them — they require
 * pre-provisioned external resources (SharePoint sites, Fabric
 * workspaces, etc.).
 */

const { readFileSync } = require("node:fs");
const { fileURLToPath } = require("node:url");
const { dirname, resolve } = require("node:path");

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnownIndexedSharePointContainerName,
  SearchIndexClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIEmbeddingDeployment =
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || "text-embedding-ada-002";

const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-sample-1";
const TEST_FILE_KNOWLEDGE_SOURCE_NAME = "example-file-knowledge-source-sample";
const TEST_KNOWLEDGE_BASE_NAME = "example-knowledge-base-for-source-sample";
const TEST_INDEX_NAME = "example-index-for-source-sample";

async function setupPrerequisites(client) {
  console.log(`Setting up prerequisites...`);

  // Create a search index that will be used by the knowledge source
  const index = {
    name: TEST_INDEX_NAME,
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true,
      },
      {
        type: "Edm.String",
        name: "content",
        searchable: true,
      },
      {
        type: "Edm.String",
        name: "title",
        searchable: true,
        filterable: true,
      },
    ],
  };
  await client.createIndex(index);
  console.log(`Created search index: ${TEST_INDEX_NAME}`);

  // Create a knowledge base to associate with the knowledge source
  const knowledgeBase = {
    name: TEST_KNOWLEDGE_BASE_NAME,
    knowledgeSources: [],
    description: "A knowledge base for knowledge source demonstration",
  };
  await client.createKnowledgeBase(knowledgeBase);
  console.log(`Created knowledge base: ${TEST_KNOWLEDGE_BASE_NAME}`);
}

async function createKnowledgeSource(sourceName, client) {
  console.log(`Creating Knowledge Source Operation`);

  // Create a search index knowledge source
  const knowledgeSource = {
    name: sourceName,
    kind: "searchIndex",
    description: "A sample search index knowledge source",
    searchIndexParameters: {
      searchIndexName: TEST_INDEX_NAME,
    },
  };

  const result = await client.createKnowledgeSource(knowledgeSource);
  console.log(`Created knowledge source: ${result.name}`);
  console.log(`Kind: ${result.kind}`);
}

/**
 * Creates a File knowledge source and uploads a sample text file into it.
 *
 * File knowledge sources accept direct file uploads (PDF, DOCX, TXT, HTML,
 * Markdown). Each file is chunked, vectorized using the configured
 * embedding model, and made available for retrieval through any
 * `KnowledgeBase` that references the source.
 */
async function createFileKnowledgeSource(client) {
  console.log(`Creating File Knowledge Source Operation`);

  if (!azureOpenAIEndpoint) {
    console.log(
      "Skipping File knowledge source demo: set AZURE_OPENAI_ENDPOINT (and optionally " +
        "AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME) to run this part of the sample.",
    );
    return;
  }

  const fileKnowledgeSource = {
    name: TEST_FILE_KNOWLEDGE_SOURCE_NAME,
    kind: "file",
    description: "A sample File knowledge source that ingests uploaded documents",
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
  const created = await client.createKnowledgeSource(fileKnowledgeSource);
  console.log(`Created File knowledge source: ${created.name}`);

  // Upload a small text file into the new File knowledge source.
  const fileName = "sample.txt";
  const fileContents = readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", fileName),
  );
  const uploaded = await client.uploadKnowledgeSourceFile(
    TEST_FILE_KNOWLEDGE_SOURCE_NAME,
    fileContents,
    `attachment; filename="${fileName}"`,
  );
  console.log(
    `Uploaded file ${uploaded.fileName} (${uploaded.fileSizeBytes} bytes, id=${uploaded.fileId}) ` +
      `to ${TEST_FILE_KNOWLEDGE_SOURCE_NAME}`,
  );

  console.log(`Files currently in ${TEST_FILE_KNOWLEDGE_SOURCE_NAME}:`);
  for await (const file of client.listKnowledgeSourceFiles(TEST_FILE_KNOWLEDGE_SOURCE_NAME)) {
    console.log(`  - ${file.fileName} (id=${file.fileId}, ${file.fileSizeBytes} bytes)`);
  }
}

/**
 * Builds in-memory examples for each preview knowledge source kind that
 * requires pre-provisioned external resources (SharePoint sites, Fabric
 * workspaces, etc.). The builders are not invoked against the service —
 * they show the minimum shape required to construct each kind in code.
 */
function describeOtherPreviewKnowledgeSourceKinds() {
  console.log(`Other preview knowledge source kinds (illustrative):`);

  const indexedSharePoint = {
    name: "example-indexed-sharepoint",
    kind: "indexedSharePoint",
    description: "Indexes SharePoint content into Azure Search.",
    indexedSharePointParameters: {
      connectionString: "SharePointOnlineEndpoint=https://contoso.sharepoint.com/sites/Marketing;",
      containerName: KnownIndexedSharePointContainerName.AllSiteLibraries,
    },
  };

  const remoteSharePoint = {
    name: "example-remote-sharepoint",
    kind: "remoteSharePoint",
    description: "Queries SharePoint content remotely without indexing.",
    remoteSharePointParameters: {
      filterExpression: "FileType:docx",
      resourceMetadata: ["Author", "Created"],
    },
  };

  const workIQ = {
    name: "example-workiq",
    kind: "workIQ",
    description: "Retrieves Work IQ signals for the calling user.",
  };

  const fabricDataAgent = {
    name: "example-fabric-data-agent",
    kind: "fabricDataAgent",
    description: "Delegates retrieval to a Microsoft Fabric Data Agent.",
    fabricDataAgentParameters: {
      workspaceId: "<fabric-workspace-id>",
      dataAgentId: "<fabric-data-agent-id>",
    },
  };

  const fabricOntology = {
    name: "example-fabric-ontology",
    kind: "fabricOntology",
    description: "Retrieves entities described by a Fabric ontology.",
    fabricOntologyParameters: {
      workspaceId: "<fabric-workspace-id>",
      ontologyId: "<fabric-ontology-id>",
    },
  };

  for (const ks of [indexedSharePoint, remoteSharePoint, workIQ, fabricDataAgent, fabricOntology]) {
    console.log(`  - ${ks.kind}: ${ks.name}`);
  }
}

async function getAndUpdateKnowledgeSource(sourceName, client) {
  console.log(`Get And Update Knowledge Source Operation`);
  const knowledgeSource = await client.getKnowledgeSource(sourceName);
  console.log(`Retrieved knowledge source: ${knowledgeSource.name}`);
  console.log(`Kind: ${knowledgeSource.kind}`);

  // Update the description
  knowledgeSource.description = "Updated description for the sample knowledge source";
  const updatedSource = await client.createOrUpdateKnowledgeSource(knowledgeSource);
  console.log(`Updated knowledge source description: ${updatedSource.description}`);
}

async function getKnowledgeSourceStatus(sourceName, client) {
  console.log(`Get Knowledge Source Status Operation`);
  const status = await client.getKnowledgeSourceStatus(sourceName);
  console.log(`Knowledge Source Status:`);
  console.log(`  Synchronization Status: ${status.synchronizationStatus ?? "N/A"}`);
  console.log(`  Kind: ${status.kind ?? "N/A"}`);
}

async function listKnowledgeSources(client) {
  console.log(`List Knowledge Sources Operation`);
  const result = client.listKnowledgeSources();
  let listOfSources = await result.next();

  console.log(`List of Knowledge Sources`);
  console.log(`*************************`);
  while (!listOfSources.done) {
    console.log(`Name: ${listOfSources.value.name}`);
    console.log(`Kind: ${listOfSources.value.kind}`);
    console.log(`Description: ${listOfSources.value.description ?? "N/A"}`);
    console.log();
    listOfSources = await result.next();
  }
}

async function deleteKnowledgeSource(sourceName, client) {
  console.log(`Deleting Knowledge Source Operation`);
  await client.deleteKnowledgeSource(sourceName);
  console.log(`Deleted knowledge source: ${sourceName}`);
}

async function cleanupFileKnowledgeSource(client) {
  try {
    for await (const file of client.listKnowledgeSourceFiles(TEST_FILE_KNOWLEDGE_SOURCE_NAME)) {
      if (file.fileId) {
        await client
          .deleteKnowledgeSourceFile(TEST_FILE_KNOWLEDGE_SOURCE_NAME, file.fileId)
          .catch(() => {});
      }
    }
    await client.deleteKnowledgeSource(TEST_FILE_KNOWLEDGE_SOURCE_NAME);
    console.log(`Deleted File knowledge source: ${TEST_FILE_KNOWLEDGE_SOURCE_NAME}`);
  } catch {
    // The File knowledge source may never have been created (e.g. AZURE_OPENAI_ENDPOINT missing).
  }
}

async function cleanupPrerequisites(client) {
  console.log(`Cleaning up prerequisites...`);
  try {
    await client.deleteKnowledgeBase(TEST_KNOWLEDGE_BASE_NAME);
    console.log(`Deleted knowledge base: ${TEST_KNOWLEDGE_BASE_NAME}`);
  } catch (e) {
    console.log(`Failed to delete knowledge base: ${e}`);
  }
  try {
    await client.deleteIndex(TEST_INDEX_NAME);
    console.log(`Deleted search index: ${TEST_INDEX_NAME}`);
  } catch (e) {
    console.log(`Failed to delete index: ${e}`);
  }
}

async function main() {
  console.log(`Running Knowledge Source Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());
  try {
    await setupPrerequisites(client);
    await createKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getAndUpdateKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getKnowledgeSourceStatus(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await createFileKnowledgeSource(client);
    describeOtherPreviewKnowledgeSourceKinds();
    await listKnowledgeSources(client);
  } finally {
    await deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await cleanupFileKnowledgeSource(client);
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
