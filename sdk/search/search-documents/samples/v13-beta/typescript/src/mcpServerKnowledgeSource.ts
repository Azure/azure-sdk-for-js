// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `mcpServer` knowledge source preview kind
 * added in `13.1.0-beta.1`. An MCP server knowledge source delegates
 * retrieval to a remote endpoint that speaks the Model Context Protocol
 * (MCP), invoking one or more tools exposed by that server and folding
 * the parsed results back into the knowledge base response.
 *
 * The sample shows two authentication shapes:
 *   - `foundryConnection`  — authenticate via an Azure AI Foundry
 *     connection identifier.
 *   - `storedHeaders`      — authenticate using HTTP headers stored on
 *     the search service.
 *
 * Only the `foundryConnection` variant is created against the service in
 * this sample, because the `storedHeaders` shape is shown purely to
 * illustrate the construction of the request object — running it
 * requires real header values.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  McpServerKnowledgeSource,
  McpServerStoredHeadersAuthentication,
} from "@azure/search-documents";
import {
  KnownMcpServerOutputParsingKind,
  KnownMcpServerToolInclusionMode,
  SearchIndexClient,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const foundryConnectionId = process.env.MCP_FOUNDRY_CONNECTION_ID || "";
const mcpServerUrl = process.env.MCP_SERVER_URL || "https://contoso.example.com/mcp";

const KNOWLEDGE_SOURCE_NAME = "example-mcp-server-knowledge-source-sample";

async function main(): Promise<void> {
  console.log(`Running MCP Server Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Build an MCP server knowledge source authenticated via a Foundry connection.
  const mcpKnowledgeSource: McpServerKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "mcpServer",
    description: "MCP server knowledge source that delegates retrieval to a remote MCP endpoint.",
    mcpServerParameters: {
      serverURL: mcpServerUrl,
      authentication: {
        kind: "foundryConnection",
        foundryConnectionParameters: {
          connectionId: foundryConnectionId || "<your-foundry-connection-id>",
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

  // Illustrative-only: the stored-headers auth variant for sites that
  // require custom HTTP headers (e.g. an API key) on every MCP request.
  const storedHeadersAuthExample: McpServerStoredHeadersAuthentication = {
    kind: "storedHeaders",
    storedHeadersParameters: {
      headers: {
        additionalProperties: {
          "x-api-key": "<your-api-key>",
          "x-tenant-id": "<your-tenant-id>",
        },
      },
    },
  };
  console.log(`storedHeaders auth shape (illustrative): ${storedHeadersAuthExample.kind}`);

  if (!foundryConnectionId) {
    console.log(
      "Skipping live create: set MCP_FOUNDRY_CONNECTION_ID (and optionally MCP_SERVER_URL) " +
        "to provision the MCP server knowledge source against the service.",
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
