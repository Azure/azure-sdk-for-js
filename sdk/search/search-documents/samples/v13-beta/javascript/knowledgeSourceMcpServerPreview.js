// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `mcpServer` knowledge source kind. An
 * MCP server knowledge source delegates retrieval to a remote endpoint
 * that speaks the Model Context Protocol (MCP), invoking one or more
 * tools exposed by that server and folding the parsed results back
 * into the knowledge base response.
 *
 * Authentication is configured via stored HTTP headers; the search
 * service attaches them to every MCP request (for example an API key
 * or a tenant identifier).
 *
 * Lifecycle: create KS → read back → attach to KB → retrieve →
 * teardown.
 *
 * Prerequisites:
 *   - `MCP_SERVER_URL` and `MCP_API_KEY` must be set; otherwise the
 *     sample only prints the constructed shape and exits.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnowledgeRetrievalClient,
  KnownMcpServerOutputParsingKind,
  KnownMcpServerToolInclusionMode,
  SearchIndexClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const mcpServerUrl = process.env.MCP_SERVER_URL || "";
const mcpApiKey = process.env.MCP_API_KEY || "";

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-mcp-server-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-mcp-server-ks-preview-sample";

async function main() {
  console.log(`Running Knowledge Source MCP Server Preview Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const mcpKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "mcpServer",
    description: "MCP server knowledge source delegating retrieval to a remote MCP endpoint.",
    mcpServerParameters: {
      serverURL: mcpServerUrl || "https://contoso.example.com/mcp",
      authentication: {
        kind: "storedHeaders",
        storedHeadersParameters: {
          headers: {
            additionalProperties: {
              "x-api-key": mcpApiKey || "<your-api-key>",
            },
          },
        },
      },
      tools: [
        {
          name: "search",
          outputParsing: { kind: KnownMcpServerOutputParsingKind.Auto },
          inclusionMode: KnownMcpServerToolInclusionMode.Reranked,
          maxOutputTokens: 2048,
        },
        {
          name: "lookup",
          outputParsing: {
            kind: KnownMcpServerOutputParsingKind.Json,
            jsonParameters: { documentsPath: "$.results", includeContext: false },
          },
        },
      ],
    },
  };

  if (!mcpServerUrl || !mcpApiKey) {
    console.log(
      "Skipping live create: set MCP_SERVER_URL and MCP_API_KEY to provision the MCP " +
        "server knowledge source against the service.",
    );
    console.log(`  Constructed: ${mcpKnowledgeSource.name} (kind=${mcpKnowledgeSource.kind})`);
    return;
  }

  try {
    // 1. Create / read back.
    const created = await client.createKnowledgeSource(mcpKnowledgeSource);
    console.log(`Created MCP server knowledge source: ${created.name} (kind=${created.kind})`);
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name}`);

    // 2. Attach to KB.
    const knowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to an MCP server knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 3. Retrieve and look at the mcpServer reference / activity shape.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "What can you tell me about the latest updates?" }],
      includeActivity: true,
    });
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "mcpServer") {
        console.log(`  - mcpServer reference detected`);
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
