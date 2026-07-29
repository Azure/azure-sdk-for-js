// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only retrieve request/response
 * surface introduced by the 2026-05-01-preview data plane:
 *   - `maxOutputDocuments` to cap the number of documents returned.
 *   - `includeActivity` to receive per-step activity records.
 *   - Activity records that carry the `modelName` used (e.g. for
 *     query-planning and answer-synthesis steps).
 *   - Reference-level Purview sensitivity-label metadata via
 *     `searchSensitivityLabelInfo` (per reference) and
 *     `responseSensitivityLabelInfo` (per response).
 *   - The current output modes — `extractiveData` and `answerSynthesis`.
 *
 * The sample provisions a knowledge base backed by a search-index
 * knowledge source, issues two retrieval requests demonstrating each
 * output mode, and prints the relevant preview fields from the
 * response.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnowledgeRetrievalClient,
  KnownKnowledgeRetrievalOutputMode,
  SearchIndexClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";

const INDEX_NAME = "example-index-for-retrieve-preview-sample";
const KNOWLEDGE_SOURCE_NAME = "example-ks-for-retrieve-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-retrieve-preview-sample";

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

  const knowledgeBase = {
    name: KNOWLEDGE_BASE_NAME,
    description: "Knowledge base for the retrieve preview-response sample.",
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
  };
  await client.createKnowledgeBase(knowledgeBase);
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
    // The preview surface adds `modelName` to model-backed activity
    // records (query planning, answer synthesis, web summarization).
    if (
      record.type === "modelQueryPlanning" ||
      record.type === "modelAnswerSynthesis" ||
      record.type === "modelWebSummarization"
    ) {
      const modelRecord = record;
      console.log(`    - ${record.type}: modelName=${modelRecord.modelName ?? "<none>"}`);
    } else {
      console.log(`    - ${record.type}`);
    }
  }

  console.log(`  references: ${response.references?.length ?? 0}`);
  for (const ref of response.references ?? []) {
    // Purview sensitivity-label metadata is surfaced per reference for
    // source kinds that support it (e.g. searchIndex, remoteSharePoint).
    const refLabel =
      "searchSensitivityLabelInfo" in ref ? ref.searchSensitivityLabelInfo : undefined;
    console.log(
      `    - ${ref.type}` + (refLabel?.displayName ? ` [label=${refLabel.displayName}]` : ""),
    );
  }

  if (response.responseSensitivityLabelInfo?.displayName) {
    console.log(
      `  responseSensitivityLabelInfo: ${response.responseSensitivityLabelInfo.displayName}`,
    );
  }
}

async function main() {
  console.log(`Running Knowledge Retrieval Preview Response Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const indexClient = new SearchIndexClient(endpoint, credential);

  await provision(indexClient);
  try {
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);

    // 1. extractiveData — return raw passages, cap output to 5 docs,
    //    include the per-step activity trace.
    const extractiveRequest = {
      intents: [{ type: "semantic", search: "What information is available?" }],
      maxOutputDocuments: 5,
      includeActivity: true,
      outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
    };
    printResponse("extractiveData", await retrievalClient.retrieve(extractiveRequest));

    // 2. answerSynthesis — let the planner synthesize an answer using
    //    the KB's configured model. The activity trace exposes the
    //    `modelName` of each model-backed step.
    const synthesisRequest = {
      intents: [{ type: "semantic", search: "Summarize the key points." }],
      maxOutputDocuments: 3,
      includeActivity: true,
      outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
    };
    printResponse("answerSynthesis", await retrievalClient.retrieve(synthesisRequest));
  } finally {
    await teardown(indexClient);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
