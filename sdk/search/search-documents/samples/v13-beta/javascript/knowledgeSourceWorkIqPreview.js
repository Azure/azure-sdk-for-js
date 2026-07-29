// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `workIQ` knowledge source kind. A
 * Work IQ knowledge source retrieves Work IQ signals scoped to the
 * calling user and requires no additional parameters — the user
 * identity is carried in the retrieval request via
 * `RetrieveOptions.querySourceAuthorization`.
 *
 * Lifecycle: create KS → read back → attach to KB → retrieve (with
 * a delegated user token) → teardown.
 *
 * Prerequisites for the live retrieve:
 *   - `WORK_IQ_USER_TOKEN` — an OBO/delegated user token suitable for
 *     `querySourceAuthorization`. When unset, the retrieve call is
 *     skipped and the sample only exercises CRUD.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { KnowledgeRetrievalClient, SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const workIQUserToken = process.env.WORK_IQ_USER_TOKEN || "";

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-workiq-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-workiq-ks-preview-sample";

async function main() {
  console.log(`Running Knowledge Source Work IQ Preview Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const workIQ = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "workIQ",
    description: "Retrieves Work IQ signals scoped to the calling user.",
  };

  try {
    // 1. Create / read back.
    const created = await client.createKnowledgeSource(workIQ);
    console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name}`);

    // 2. Attach to KB.
    const knowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a Work IQ knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 3. Retrieve. Work IQ needs a delegated user token.
    if (!workIQUserToken) {
      console.log(
        "Skipping retrieve: set WORK_IQ_USER_TOKEN to a delegated user token to issue a " +
          "Work IQ retrieval call. The KS + KB were still created and listed.",
      );
      return;
    }
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve(
      {
        intents: [{ type: "semantic", search: "What did I work on this week?" }],
        includeActivity: true,
      },
      { querySourceAuthorization: workIQUserToken },
    );
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "workIQ") {
        const wiq = ref;
        console.log(`  - workIQ reference: ${wiq.attributions?.length ?? 0} attribution(s)`);
      }
    }
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
