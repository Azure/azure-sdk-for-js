// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `fabricDataAgent` knowledge source
 * kind. A Fabric Data Agent knowledge source delegates retrieval to a
 * data agent hosted in a Microsoft Fabric workspace.
 *
 * Lifecycle: create KS → read back → attach to KB → retrieve →
 * teardown.
 *
 * Prerequisites:
 *   - `FABRIC_WORKSPACE_ID` and `FABRIC_DATA_AGENT_ID` must be set;
 *     otherwise the sample only prints the constructed shape and exits.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { KnowledgeRetrievalClient, SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const workspaceId = process.env.FABRIC_WORKSPACE_ID || "";
const dataAgentId = process.env.FABRIC_DATA_AGENT_ID || "";

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-fabric-data-agent-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-fabric-data-agent-ks-preview-sample";

async function main() {
  console.log(`Running Knowledge Source Fabric Data Agent Preview Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const fabricDataAgent = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "fabricDataAgent",
    description: "Delegates retrieval to a Microsoft Fabric Data Agent.",
    fabricDataAgentParameters: {
      workspaceId: workspaceId || "<fabric-workspace-id>",
      dataAgentId: dataAgentId || "<fabric-data-agent-id>",
    },
  };

  if (!workspaceId || !dataAgentId) {
    console.log(
      "Skipping live create: set FABRIC_WORKSPACE_ID and FABRIC_DATA_AGENT_ID to provision " +
        "the Fabric Data Agent knowledge source against the service.",
    );
    console.log(`  Constructed: ${fabricDataAgent.name} (kind=${fabricDataAgent.kind})`);
    return;
  }

  try {
    // 1. Create / read back.
    const created = await client.createKnowledgeSource(fabricDataAgent);
    console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name}`);

    // 2. Attach to KB.
    const knowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a Fabric Data Agent knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 3. Retrieve and inspect the fabricDataAgent-specific reference shape.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "What insights does the data agent surface?" }],
      includeActivity: true,
    });
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "fabricDataAgent") {
        console.log(`  - fabricDataAgent reference detected`);
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
