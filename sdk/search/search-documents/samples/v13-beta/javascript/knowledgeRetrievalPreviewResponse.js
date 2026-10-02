// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the GA retrieve request/response surface:
 *   - `maxOutputDocuments` to cap the number of documents returned.
 *   - `includeActivity` to receive per-step activity records.
 *   - Activity records that carry the structured `model` used (e.g. for
 *     query-planning and answer-synthesis steps).
 *   - The current output modes — `extractiveData` and `answerSynthesis`.
 *
 * The sample provisions a knowledge base backed by a search-index
 * knowledge source, issues two retrieval requests demonstrating each
 * output mode, and validates the relevant preview fields. Set
 * `CITATION_KNOWLEDGE_BASE_NAME` to run the shared six-kind citation
 * fixture (searchIndex, azureBlob, indexedSharePoint, indexedOneLake,
 * file, and indexedSql).
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnowledgeRetrievalClient,
  KnownKnowledgeRetrievalOutputMode,
  SearchIndexClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const citationKnowledgeBaseName = process.env.CITATION_KNOWLEDGE_BASE_NAME || "";

const INDEX_NAME = "example-index-for-retrieve-preview-sample";
const KNOWLEDGE_SOURCE_NAME = "example-ks-for-retrieve-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-retrieve-preview-sample";

const citationKinds = new Set([
  "searchIndex",
  "azureBlob",
  "indexedSharePoint",
  "indexedOneLake",
  "file",
  "indexedSql",
]);
function assertSample(condition, message) {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function provision(client) {
  await client.createIndex({
    name: INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
    ],
  });

  const ks = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "searchIndex",
    searchIndexParameters: { searchIndexName: INDEX_NAME },
  };
  await client.createKnowledgeSource(ks);

  const searchClient = client.getSearchClient(INDEX_NAME);
  await searchClient.uploadDocuments([
    { id: "sample-1", content: "Knowledge retrieval searches configured data sources." },
  ]);

  const knowledgeBase = {
    name: KNOWLEDGE_BASE_NAME,
    description: "Knowledge base for the retrieve preview-response sample.",
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
  };
  await client.createKnowledgeBase(knowledgeBase);
}

function validateCitationUrls(response) {
  const seenKinds = new Set();
  for (const reference of response.references ?? []) {
    if (citationKinds.has(reference.type)) {
      const citationUrl = "citationUrl" in reference ? reference.citationUrl : undefined;
      assertSample(citationUrl, `${reference.type} should include citationUrl`);
      const parsed = new URL(citationUrl);
      assertSample(
        parsed.protocol === "https:",
        `${reference.type} citationUrl should be absolute`,
      );
      assertSample(
        parsed.hostname === new URL(endpoint).hostname,
        `${reference.type} citationUrl should point to the Search service, not the original source`,
      );
      seenKinds.add(reference.type);
    }
  }

  if (citationKnowledgeBaseName) {
    for (const kind of citationKinds) {
      assertSample(seenKinds.has(kind), `the shared fixture should emit a ${kind} reference`);
    }
  }
}

async function teardown(client) {
  await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
  await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  await client.deleteIndex(INDEX_NAME).catch(() => {});
}

function printResponse(label, response) {
  console.log(`--- ${label} ---`);
  console.log(`  activity records: ${response.activity?.length ?? 0}`);
  for (const record of response.activity ?? []) {
    // The August surface exposes structured model metadata on model-backed activity records.
    if (
      record.type === "modelQueryPlanning" ||
      record.type === "modelAnswerSynthesis" ||
      record.type === "modelWebSummarization"
    ) {
      const modelRecord = record;
      console.log(`    - ${record.type}: modelName=${modelRecord.model?.modelName ?? "<none>"}`);
    } else {
      console.log(`    - ${record.type}`);
    }
  }

  console.log(`  references: ${response.references?.length ?? 0}`);
  for (const ref of response.references ?? []) {
    console.log(`    - ${ref.type}`);
  }
}

async function main() {
  console.log(`Running Knowledge Retrieval Response Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const indexClient = new SearchIndexClient(endpoint, credential);
  const provisionLocalFixture = !citationKnowledgeBaseName;

  if (provisionLocalFixture) {
    await provision(indexClient);
  }
  try {
    const activeKnowledgeBaseName = citationKnowledgeBaseName || KNOWLEDGE_BASE_NAME;
    const retrievalClient = new KnowledgeRetrievalClient(
      endpoint,
      activeKnowledgeBaseName,
      credential,
    );

    // 1. extractiveData — return raw passages, cap output to 5 docs,
    //    include the per-step activity trace.
    const extractiveRequest = {
      intents: [{ type: "semantic", search: "What information is available?" }],
      maxOutputDocuments: 5,
      includeActivity: true,
      outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
    };
    const extractiveResponse = await retrievalClient.retrieve(extractiveRequest);
    printResponse("extractiveData", extractiveResponse);
    validateCitationUrls(extractiveResponse);

    // 2. answerSynthesis — let the planner synthesize an answer using
    //    the KB's configured model. The activity trace exposes the
    //    structured `model` metadata for each model-backed step.
    const synthesisRequest = {
      intents: [{ type: "semantic", search: "Summarize the key points." }],
      maxOutputDocuments: 3,
      includeActivity: true,
      outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
    };
    printResponse("answerSynthesis", await retrievalClient.retrieve(synthesisRequest));
  } finally {
    if (provisionLocalFixture) {
      await teardown(indexClient);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
