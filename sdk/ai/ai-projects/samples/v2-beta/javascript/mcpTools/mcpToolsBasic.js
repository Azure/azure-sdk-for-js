// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to directly interact with MCP (Model Context Protocol) tools
 * using the low-level MCP client library to connect to the Foundry Project's MCP tools API:
 *     {AZURE_AI_PROJECT_ENDPOINT}/mcp_tools?api-version=2025-05-15-preview
 *
 * For agent-based MCP tool usage, see samples in samples/agents/tools/sample_agent_mcp.ts
 * and related files in that directory.
 *
 * WORKFLOW:
 * This sample demonstrates a typical MCP client workflow:
 * 1. Establish connection to the Foundry Project MCP endpoint using Client
 * 2. Initialize the session and discover available tools
 * 3. Invoke tools programmatically with specific arguments and metadata
 * 4. Process and save tool outputs (e.g., writing image generation results to a file)
 * 5. Chain multiple tool calls together (code interpreter -> image generation -> file search)
 *
 * @summary This sample demonstrates how to interact with MCP tools using the MCP client library.
 */

const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const { Client } = require("@modelcontextprotocol/sdk/client");
const {
  StreamableHTTPClientTransport,
} = require("@modelcontextprotocol/sdk/client/streamableHttp.js");
const fs = require("fs");
const { writeFile } = require("node:fs/promises");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const imageGenDeploymentName = process.env["IMAGE_GENERATION_MODEL_DEPLOYMENT_NAME"] || "";

async function main() {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  const scope = "https://ai.azure.com";
  const azureADTokenProvider = await getBearerTokenProvider(credential, scope);

  // Get the token for Azure AI
  const tokenResponse = await azureADTokenProvider();

  // Create MCP client
  const mcpClient = new Client({
    name: "azure-ai-projects-mcp-client",
    version: "1.0.0",
  });

  // Create Streamable HTTP transport with Authorization header
  const transport = new StreamableHTTPClientTransport(
    new URL(`${projectEndpoint}/mcp_tools?api-version=2025-05-15-preview`),
    {
      requestInit: {
        headers: {
          Authorization: `Bearer ${tokenResponse}`,
        },
      },
    },
  );

  // Connect the client to the server
  await mcpClient.connect(transport);

  try {
    // List available tools
    const toolsResult = await mcpClient.listTools();
    console.log(`Available tools: ${toolsResult.tools.map((tool) => tool.name).join(", ")}`);

    // For each tool, print its details
    for (const tool of toolsResult.tools) {
      console.log(`\n\nTool Name: ${tool.name}, Input Schema: ${JSON.stringify(tool.inputSchema)}`);
    }

    // Run the code interpreter tool
    const codeInterpreterResult = await mcpClient.callTool({
      name: "code_interpreter",
      arguments: { code: "print('Hello from Microsoft Foundry MCP Code Interpreter tool!')" },
    });
    console.log(`\n\nCode Interpreter Output: ${JSON.stringify(codeInterpreterResult.content)}`);

    // Run the image_generation tool
    const imageGenerationResult = await mcpClient.callTool({
      name: "image_generation",
      arguments: { prompt: "Draw a cute puppy riding a skateboard" },
      _meta: { imagegen_model_deployment_name: imageGenDeploymentName },
    });

    // Save the image generation output to a file
    if (imageGenerationResult.content && Array.isArray(imageGenerationResult.content)) {
      const imageContent = imageGenerationResult.content[0];
      if (imageContent && imageContent.type === "image" && "data" in imageContent) {
        console.log("\nDownloading generated image...");
        const filename = "puppy.png";
        const filePath = path.resolve(__dirname, filename);
        await writeFile(filePath, Buffer.from(imageContent.data, "base64"));
        console.log(`Image saved to: ${filePath}`);
      }
    }

    // Create a vector store
    const vectorStore = await openAIClient.vectorStores.create({
      name: "sample_vector_store",
    });

    // Upload a file to the vector store
    const productInfoPath = path.resolve(__dirname, "./assets/product_info.md");
    const fileStream = fs.createReadStream(productInfoPath);
    const vectorStoreFile = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fileStream,
    );

    console.log(
      `\n\nUploaded file, file ID: ${vectorStoreFile.id} to vector store ID: ${vectorStore.id}`,
    );

    // Call the file_search tool
    const fileSearchResult = await mcpClient.callTool({
      name: "file_search",
      arguments: { queries: ["What feature does Smart Eyewear offer?"] },
      _meta: { vector_store_ids: [vectorStore.id] },
    });
    console.log(`\n\nFile Search Output: ${JSON.stringify(fileSearchResult.content)}`);
  } finally {
    // Close the MCP client connection
    await mcpClient.close();
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
