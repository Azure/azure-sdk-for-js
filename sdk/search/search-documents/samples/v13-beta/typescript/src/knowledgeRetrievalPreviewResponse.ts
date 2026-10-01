// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only retrieve request/response
 * surface in the 2026-08-01-preview data plane:
 *   - `maxOutputDocuments` to cap the number of documents returned.
 *   - `includeActivity` to receive per-step activity records.
 *   - Activity records that carry the structured `model` used (e.g. for
 *     query-planning and answer-synthesis steps).
 *   - Reference-level Purview sensitivity-label metadata via
 *     `searchSensitivityLabelInfo` (per reference) and
 *     `responseSensitivityLabelInfo` (per response).
 *   - The current output modes — `extractiveData` and `answerSynthesis`.
 *
 * The sample provisions a knowledge base backed by a search-index
 * knowledge source, issues two retrieval requests demonstrating each
 * output mode, and validates the relevant preview fields. Set
 * `CITATION_KNOWLEDGE_BASE_NAME` to run the shared six-kind citation
 * fixture (searchIndex, azureBlob, indexedSharePoint, indexedOneLake,
 * file, and indexedSql).
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  KnowledgeBase,
  KnowledgeBaseModelAnswerSynthesisActivityRecord,
  KnowledgeBaseModelQueryPlanningActivityRecord,
  KnowledgeBaseModelWebSummarizationActivityRecord,
  KnowledgeBaseRetrievalRequest,
  SearchIndexKnowledgeSource,
} from "@azure/search-documents";
import {
  KnowledgeRetrievalClient,
  KnownKnowledgeRetrievalOutputMode,
  KnownKnowledgeSourceResultsProcessing,
  SearchIndexClient,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

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
const citationNegativeControls = new Set([
  "workIQ",
  "fabricDataAgent",
  "fabricOntology",
  "web",
  "remoteSharePoint",
  "mcpServer",
]);

function assertSample(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function provision(client: SearchIndexClient): Promise<void> {
  await client.createIndex({
    name: INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
    ],
  });

  const ks: SearchIndexKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "searchIndex",
    resultsProcessing: KnownKnowledgeSourceResultsProcessing.Rerank,
    searchIndexParameters: { searchIndexName: INDEX_NAME },
  };
  await client.createKnowledgeSource(ks);

  const searchClient = client.getSearchClient<{ id: string; content: string }>(INDEX_NAME);
  await searchClient.uploadDocuments([
    { id: "sample-1", content: "The August preview adds behavioral retrieval controls." },
  ]);

  const knowledgeBase: KnowledgeBase = {
    name: KNOWLEDGE_BASE_NAME,
    description: "Knowledge base for the retrieve preview-response sample.",
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
  };
  await client.createKnowledgeBase(knowledgeBase);
}

function validateCitationUrls(
  response: Awaited<ReturnType<KnowledgeRetrievalClient["retrieve"]>>,
): void {
  const seenKinds = new Set<string>();
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
    if (citationNegativeControls.has(reference.type)) {
      assertSample(
        !("citationUrl" in reference) || reference.citationUrl === undefined,
        `${reference.type} is a negative control and should not expose citationUrl`,
      );
    }
  }

  if (citationKnowledgeBaseName) {
    for (const kind of citationKinds) {
      assertSample(seenKinds.has(kind), `the shared fixture should emit a ${kind} reference`);
    }
  }
}

async function teardown(client: SearchIndexClient): Promise<void> {
  await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
  await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  await client.deleteIndex(INDEX_NAME).catch(() => {});
}

function printResponse(
  label: string,
  response: Awaited<ReturnType<KnowledgeRetrievalClient["retrieve"]>>,
): void {
  console.log(`--- ${label} ---`);
  console.log(`  activity records: ${response.activity?.length ?? 0}`);
  for (const record of response.activity ?? []) {
    // The August surface exposes structured model metadata on model-backed activity records.
    if (
      record.type === "modelQueryPlanning" ||
      record.type === "modelAnswerSynthesis" ||
      record.type === "modelWebSummarization"
    ) {
      const modelRecord = record as
        | KnowledgeBaseModelQueryPlanningActivityRecord
        | KnowledgeBaseModelAnswerSynthesisActivityRecord
        | KnowledgeBaseModelWebSummarizationActivityRecord;
      console.log(`    - ${record.type}: modelName=${modelRecord.model?.modelName ?? "<none>"}`);
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

async function main(): Promise<void> {
  console.log(`Running Knowledge Retrieval Preview Response Sample....`);
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
    const extractiveRequest: KnowledgeBaseRetrievalRequest = {
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
    const synthesisRequest: KnowledgeBaseRetrievalRequest = {
      intents: [{ type: "semantic", search: "Summarize the key points." }],
      maxOutputDocuments: 3,
      includeActivity: true,
      outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
    };
    printResponse("answerSynthesis", await retrievalClient.retrieve(synthesisRequest));

    if (provisionLocalFixture) {
      const noRerankResponse = await retrievalClient.retrieve({
        intents: [{ type: "semantic", search: "What changed in the August preview?" }],
        outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
        knowledgeSourceParams: [
          {
            kind: "searchIndex",
            knowledgeSourceName: KNOWLEDGE_SOURCE_NAME,
            resultsProcessing: KnownKnowledgeSourceResultsProcessing.None,
          },
        ],
      });
      assertSample(
        (noRerankResponse.references ?? []).every(
          (reference) => reference.rerankerScore === undefined,
        ),
        "resultsProcessing=none should omit rerankerScore",
      );

      const excludedResponse = await retrievalClient.retrieve({
        intents: [{ type: "semantic", search: "What changed in the August preview?" }],
        outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
        retrievalReasoningEffort: { kind: "medium" },
        knowledgeSourceParams: [
          {
            kind: "searchIndex",
            knowledgeSourceName: KNOWLEDGE_SOURCE_NAME,
            neverQuerySource: true,
          },
        ],
      });
      assertSample(
        !(excludedResponse.references ?? []).some((reference) => reference.type === "searchIndex"),
        "request-local neverQuerySource should exclude the source from this nonminimal retrieval",
      );
      const storedKnowledgeBase = await indexClient.getKnowledgeBase(KNOWLEDGE_BASE_NAME);
      assertSample(
        storedKnowledgeBase.knowledgeSources.some(
          (source) => source.name === KNOWLEDGE_SOURCE_NAME,
        ),
        "request-local neverQuerySource must not remove the stored KB member",
      );
      const storedSource = await indexClient.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
      assertSample(
        storedSource.resultsProcessing === KnownKnowledgeSourceResultsProcessing.Rerank,
        "request overrides must not mutate stored resultsProcessing",
      );
    }
  } finally {
    if (provisionLocalFixture) {
      await teardown(indexClient);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
