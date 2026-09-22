// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `fabricOntology` knowledge source
 * kind. A Fabric Ontology knowledge source retrieves entities described
 * by an ontology hosted in a Microsoft Fabric workspace.
 *
 * Lifecycle: create KS → read back → attach to KB → retrieve →
 * teardown.
 *
 * Prerequisites:
 *   - `FABRIC_WORKSPACE_ID` and `FABRIC_ONTOLOGY_ID` must be set;
 *     otherwise the sample only prints the constructed shape and exits.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { KnowledgeRetrievalClient, SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const workspaceId = process.env.FABRIC_WORKSPACE_ID || "";
const ontologyId = process.env.FABRIC_ONTOLOGY_ID || "";

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-fabric-ontology-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-fabric-ontology-ks-preview-sample";

async function main() {
  console.log(`Running Knowledge Source Fabric Ontology Preview Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const fabricOntology = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "fabricOntology",
    description: "Retrieves entities described by a Fabric ontology.",
    fabricOntologyParameters: {
      workspaceId: workspaceId || "<fabric-workspace-id>",
      ontologyId: ontologyId || "<fabric-ontology-id>",
    },
  };

  if (!workspaceId || !ontologyId) {
    console.log(
      "Skipping live create: set FABRIC_WORKSPACE_ID and FABRIC_ONTOLOGY_ID to provision " +
        "the Fabric Ontology knowledge source against the service.",
    );
    console.log(`  Constructed: ${fabricOntology.name} (kind=${fabricOntology.kind})`);
    return;
  }

  try {
    // 1. Create / read back.
    const created = await client.createKnowledgeSource(fabricOntology);
    console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name}`);

    // 2. Attach to KB.
    const knowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a Fabric Ontology knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 3. Retrieve and inspect the fabricOntology-specific reference shape.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "Show me related entities." }],
      includeActivity: true,
    });
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "fabricOntology") {
        console.log(`  - fabricOntology reference detected`);
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
