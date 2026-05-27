// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `workIQ` knowledge source preview kind added
 * in `13.1.0-beta.1`. A Work IQ knowledge source retrieves Work IQ
 * signals scoped to the calling user and requires no additional
 * parameters — the user identity is carried in the retrieval request.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";

const KNOWLEDGE_SOURCE_NAME = "example-workiq-knowledge-source-sample";

async function main() {
  console.log(`Running Work IQ Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  const workIQ = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "workIQ",
    description: "Retrieves Work IQ signals scoped to the calling user.",
  };

  try {
    const created = await client.createKnowledgeSource(workIQ);
    console.log(`Created ${created.kind} knowledge source: ${created.name}`);
  } finally {
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
