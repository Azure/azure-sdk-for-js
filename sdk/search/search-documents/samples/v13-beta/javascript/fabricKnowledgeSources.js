// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Microsoft Fabric knowledge source preview
 * kinds added in `13.1.0-beta.1`:
 *   - `fabricDataAgent`: delegates retrieval to a Fabric Data Agent.
 *   - `fabricOntology`: retrieves entities described by a Fabric
 *     ontology.
 *
 * Both shapes are constructed and created against the service when the
 * required environment variables are present (`FABRIC_WORKSPACE_ID`
 * with either `FABRIC_DATA_AGENT_ID` or `FABRIC_ONTOLOGY_ID`).
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const workspaceId = process.env.FABRIC_WORKSPACE_ID || "";
const dataAgentId = process.env.FABRIC_DATA_AGENT_ID || "";
const ontologyId = process.env.FABRIC_ONTOLOGY_ID || "";

const DATA_AGENT_KS_NAME = "example-fabric-data-agent-knowledge-source-sample";
const ONTOLOGY_KS_NAME = "example-fabric-ontology-knowledge-source-sample";

async function main() {
  console.log(`Running Fabric Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  const fabricDataAgent = {
    name: DATA_AGENT_KS_NAME,
    kind: "fabricDataAgent",
    description: "Delegates retrieval to a Microsoft Fabric Data Agent.",
    fabricDataAgentParameters: {
      workspaceId: workspaceId || "<fabric-workspace-id>",
      dataAgentId: dataAgentId || "<fabric-data-agent-id>",
    },
  };

  const fabricOntology = {
    name: ONTOLOGY_KS_NAME,
    kind: "fabricOntology",
    description: "Retrieves entities described by a Fabric ontology.",
    fabricOntologyParameters: {
      workspaceId: workspaceId || "<fabric-workspace-id>",
      ontologyId: ontologyId || "<fabric-ontology-id>",
    },
  };

  if (!workspaceId || (!dataAgentId && !ontologyId)) {
    console.log(
      "Skipping live create: set FABRIC_WORKSPACE_ID with FABRIC_DATA_AGENT_ID and/or " +
        "FABRIC_ONTOLOGY_ID to provision these knowledge sources against the service.",
    );
    console.log(`  - ${fabricDataAgent.kind}: ${fabricDataAgent.name}`);
    console.log(`  - ${fabricOntology.kind}: ${fabricOntology.name}`);
    return;
  }

  try {
    if (dataAgentId) {
      const created = await client.createKnowledgeSource(fabricDataAgent);
      console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    }
    if (ontologyId) {
      const created = await client.createKnowledgeSource(fabricOntology);
      console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    }
  } finally {
    if (dataAgentId) {
      await client.deleteKnowledgeSource(DATA_AGENT_KS_NAME).catch(() => {});
    }
    if (ontologyId) {
      await client.deleteKnowledgeSource(ONTOLOGY_KS_NAME).catch(() => {});
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
