// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe.runIf(isLiveMode())("mcp tools - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should connect to MCP endpoint and list available tools", async function () {
    const projectEndpoint =
      process.env["FOUNDRY_PROJECT_ENDPOINT"] ||
      "https://Sanitized.azure.com/api/projects/test-project";

    const credential = new DefaultAzureCredential();
    const scope = "https://ai.azure.com";
    const azureADTokenProvider = await getBearerTokenProvider(credential, scope);
    const tokenResponse = await azureADTokenProvider();

    const mcpClient = new Client({
      name: "azure-ai-projects-mcp-client",
      version: "1.0.0",
    });

    const transport = new StreamableHTTPClientTransport(
      new URL(`${projectEndpoint}/mcp_tools?api-version=v1`),
      {
        requestInit: {
          headers: {
            Authorization: `Bearer ${tokenResponse}`,
          },
        },
      },
    );

    await mcpClient.connect(transport);

    try {
      const toolsResult = await mcpClient.listTools();
      assert.isArray(toolsResult.tools);
      console.log(`Available tools: ${toolsResult.tools.map((t) => t.name).join(", ")}`);

      for (const tool of toolsResult.tools) {
        console.log(`Tool: ${tool.name}`);
      }
    } finally {
      await mcpClient.close();
    }
  });

  it("should call code interpreter tool via MCP", async function () {
    const projectEndpoint =
      process.env["FOUNDRY_PROJECT_ENDPOINT"] ||
      "https://Sanitized.azure.com/api/projects/test-project";

    const credential = new DefaultAzureCredential();
    const scope = "https://ai.azure.com";
    const azureADTokenProvider = await getBearerTokenProvider(credential, scope);
    const tokenResponse = await azureADTokenProvider();

    const mcpClient = new Client({
      name: "azure-ai-projects-mcp-client",
      version: "1.0.0",
    });

    const transport = new StreamableHTTPClientTransport(
      new URL(`${projectEndpoint}/mcp_tools?api-version=v1`),
      {
        requestInit: {
          headers: {
            Authorization: `Bearer ${tokenResponse}`,
          },
        },
      },
    );

    await mcpClient.connect(transport);

    try {
      const result = await mcpClient.callTool({
        name: "code_interpreter",
        arguments: { code: "print('Hello from Microsoft Foundry MCP Code Interpreter tool!')" },
      });

      assert.isNotNull(result);
      assert.isArray(result.content);
      console.log(`Code Interpreter Output: ${JSON.stringify(result.content)}`);
    } finally {
      await mcpClient.close();
    }
  });

  it("should call file search tool via MCP with uploaded file", async function () {
    const projectEndpoint =
      process.env["FOUNDRY_PROJECT_ENDPOINT"] ||
      "https://Sanitized.azure.com/api/projects/test-project";
    const openAIClient = projectsClient.getOpenAIClient();

    const credential = new DefaultAzureCredential();
    const scope = "https://ai.azure.com";
    const azureADTokenProvider = await getBearerTokenProvider(credential, scope);
    const tokenResponse = await azureADTokenProvider();

    const mcpClient = new Client({
      name: "azure-ai-projects-mcp-client",
      version: "1.0.0",
    });

    const transport = new StreamableHTTPClientTransport(
      new URL(`${projectEndpoint}/mcp_tools?api-version=v1`),
      {
        requestInit: {
          headers: {
            Authorization: `Bearer ${tokenResponse}`,
          },
        },
      },
    );

    await mcpClient.connect(transport);

    // Create a vector store and upload a file
    const vectorStore = await openAIClient.vectorStores.create({
      name: "sample_vector_store",
    });

    const productInfoPath = path.resolve(__dirname, "data", "product_info.md");
    const fileStream = fs.createReadStream(productInfoPath);
    const vectorStoreFile = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fileStream,
    );
    console.log(`Uploaded file ID: ${vectorStoreFile.id} to vector store ID: ${vectorStore.id}`);

    try {
      const result = await mcpClient.callTool({
        name: "file_search",
        arguments: { queries: ["What feature does Smart Eyewear offer?"] },
        _meta: { vector_store_ids: [vectorStore.id] },
      });

      assert.isNotNull(result);
      assert.isArray(result.content);
      console.log(`File Search Output: ${JSON.stringify(result.content)}`);
    } finally {
      await mcpClient.close();
      // Clean up vector store
      await openAIClient.vectorStores.delete(vectorStore.id);
    }
  });
});
