// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `mcpServer` knowledge source preview kind
 * added in `13.1.0-beta.1`. An MCP server knowledge source delegates
 * retrieval to a remote endpoint that speaks the Model Context Protocol
 * (MCP), invoking one or more tools exposed by that server and folding
 * the parsed results back into the knowledge base response.
 *
 * Authentication is configured via stored HTTP headers, which the
 * search service attaches to every request it issues to the MCP
 * endpoint (for example an API key or a tenant identifier).
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnownMcpServerOutputParsingKind,
  KnownMcpServerToolInclusionMode,
  SearchIndexClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const mcpServerUrl = process.env.MCP_SERVER_URL || "";
const mcpApiKey = process.env.MCP_API_KEY || "";

const KNOWLEDGE_SOURCE_NAME = "example-mcp-server-knowledge-source-sample";

async function main() {
  console.log(`Running MCP Server Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Build an MCP server knowledge source authenticated via stored HTTP
  // headers. The search service attaches these headers to every MCP
  // request — use them to carry API keys, tenant identifiers, or other
  // bearer-style secrets accepted by the MCP endpoint.
  const mcpKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "mcpServer",
    description: "MCP server knowledge source that delegates retrieval to a remote MCP endpoint.",
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
          // Auto-detect the parsing strategy for the tool's output.
          outputParsing: { kind: KnownMcpServerOutputParsingKind.Auto },
          // Fold tool results into the reranked result stream (default).
          inclusionMode: KnownMcpServerToolInclusionMode.Reranked,
          maxOutputTokens: 2048,
        },
        {
          name: "lookup",
          // Parse the tool output as JSON, extracting the `results` array.
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
    return;
  }

  try {
    const created = await client.createKnowledgeSource(mcpKnowledgeSource);
    console.log(`Created MCP server knowledge source: ${created.name} (kind=${created.kind})`);
  } finally {
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
