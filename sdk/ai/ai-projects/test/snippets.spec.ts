// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectClient, DatasetVersion } from "../src/index.js";
import type {
  AzureAISearchIndex,
  Connection,
  DatasetVersionUnion,
  ModelDeployment,
} from "../src/index.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import { RestError } from "@azure/core-rest-pipeline";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

describe("snippets", function () {
  let project: AIProjectClient;
  let deploymentName: string = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
  const filePath = "";

  beforeEach(async function (context: VitestTestContext) {
    project = createProjectsClient();
  });

  it("setup", async function () {
    const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
    const client = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  });

  it("openAI", async function () {
    const openAIClient = await project.getOpenAIClient();
    const response = await openAIClient.responses.create({
      model: deploymentName,
      input: "What is the size of France in square miles?",
    });
    console.log("response = ", JSON.stringify(response, null, 2));

    const detailResponse = await openAIClient.responses.create({
      model: deploymentName,
      input: "And what is the capital city?",
      previous_response_id: response.id,
    });
    console.log("detailed response = ", JSON.stringify(detailResponse, null, 2));
  });

  it("agents", async function () {
    const openAIClient = await project.getOpenAIClient();
    const agent = await project.agents.createVersion("my-agent-basic", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
    const conversation = await openAIClient.conversations.create({
      items: [
        { type: "message", role: "user", content: "What is the size of France in square miles?" },
      ],
    });
    console.log(`Created conversation with initial user message (id: ${conversation.id})`);

    // Generate response using the agent
    console.log("\nGenerating response...");
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response output: ${response.output_text}`);

    // Add a second user message to the conversation
    console.log("\nAdding a second user message to the conversation...");
    await openAIClient.conversations.items.create(conversation.id, {
      items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
    });
    console.log("Added a second user message to the conversation");

    // Generate second response
    console.log("\nGenerating second response...");
    const response2 = await openAIClient.responses.create(
      {
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response output: ${response2.output_text}`);

    // Clean up
    console.log("\nCleaning up resources...");
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });

  it("agent-code-interpreter", async function () {
    const openAIClient = await project.getOpenAIClient();
    const response = await openAIClient.responses.create({
      model: deploymentName,
      input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
      tools: [{ type: "code_interpreter", container: { type: "auto" } }],
    });
    console.log(`Response output: ${response.output_text}`);
  });

  it("agent-file-search", async function () {
    const openAIClient = await project.getOpenAIClient();
    const assetFilePath = path.join(
      __dirname,
      "..",
      "samples-dev",
      "agents",
      "assets",
      "product_info.txt",
    );
    const vectorStore = await openAIClient.vectorStores.create({
      name: "ProductInfoStreamStore",
    });
    console.log(`Vector store created (id: ${vectorStore.id})`);

    // Upload file to vector store
    const fileStream = fs.createReadStream(assetFilePath);
    const uploadedFile = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fileStream,
    );
    console.log(`File uploaded to vector store (id: ${uploadedFile.id})`);

    // Create agent with file search tool
    const agent = await project.agents.createVersion("StreamingFileSearchAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful assistant that can search through product information and provide detailed responses. Use the file search tool to find relevant information before answering.",
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStore.id],
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-image-generation", async function () {
    const agent = await project.agents.createVersion("agent-image-generation", {
      kind: "prompt",
      model: deploymentName,
      instructions: "Generate images based on user prompts",
      tools: [
        {
          type: "image_generation",
          quality: "low",
          size: "1024x1024",
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-image-generation-download", async function () {
    const openAIClient = await project.getOpenAIClient();
    const agent = await project.agents.createVersion("agent-image-generation", {
      kind: "prompt",
      model: deploymentName,
      instructions: "Generate images based on user prompts",
      tools: [
        {
          type: "image_generation",
          quality: "low",
          size: "1024x1024",
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
    const response = await openAIClient.responses.create(
      {
        input: "Generate an image of Microsoft logo.",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response created: ${response.id}`);
    const imageData = response.output?.filter((output) => output.type === "image_generation_call");

    if (imageData && imageData.length > 0 && imageData[0].result) {
      console.log("Downloading generated image...");

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filename = "microsoft.png";
      const filePath = path.join(__dirname, filename);

      // Decode base64 and save to file
      const imageBuffer = Buffer.from(imageData[0].result, "base64");
      fs.writeFileSync(filePath, imageBuffer);

      console.log(`Image downloaded and saved to: ${path.resolve(filePath)}`);
    } else {
      console.log("No image data found in the response.");
    }
  });

  it("agent-web-search", async function () {
    const openAIClient = await project.getOpenAIClient();
    // Create Agent with web search tool
    const agent = await project.agents.createVersion("agent-web-search", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that can search the web",
      tools: [
        {
          type: "web_search_preview",
          user_location: {
            type: "approximate",
            country: "GB",
            city: "London",
            region: "London",
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search the web
    console.log("\nSending web search query...");
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "Show me the latest London Underground service updates",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response: ${response.output_text}`);
  });

  it("agent-mcp", async function () {
    const openAIClient = await project.getOpenAIClient();
    const agent = await project.agents.createVersion("agent-mcp", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
      tools: [
        {
          type: "mcp",
          server_label: "api-specs",
          server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
          require_approval: "always",
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Create a conversation thread to maintain context across multiple interactions
    console.log("\nCreating conversation...");
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send initial request that will trigger the MCP tool to access Azure REST API specs
    // This will generate an approval request since requireApproval="always"
    console.log("\nSending request that will trigger MCP approval...");
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "Please summarize the Azure REST API specifications Readme",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
  });

  it("agent-openapi", async function () {
    const weatherSpecPath = path.resolve(__dirname, "../assets", "weather_openapi.json");
    const agent = await project.agents.createVersion("MyOpenApiAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful assistant that can call external APIs defined by OpenAPI specs to answer user questions.",
      tools: [
        {
          type: "openapi",
          openapi: {
            name: "get_weather",
            description: "Retrieve weather information for a location using wttr.in",
            spec: weatherSpecPath,
            auth: { type: "anonymous" },
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-function-tool", async function () {
    /**
     * Define a function tool for the model to use
     */
    const funcTool = {
      type: "function" as const,
      function: {
        name: "get_horoscope",
        description: "Get today's horoscope for an astrological sign.",
        strict: true,
        parameters: {
          type: "object",
          properties: {
            sign: {
              type: "string",
              description: "An astrological sign like Taurus or Aquarius",
            },
          },
          required: ["sign"],
          additional_properties: false,
        },
      },
    };

    const agent = await project.agents.createVersion("function-tool-agent", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that can use function tools.",
      tools: [funcTool],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-azure-ai-search", async function () {
    const aiSearchConnectionId = process.env["AI_SEARCH_CONNECTION_ID"] || "";
    const aiSearchIndexName = process.env["AI_SEARCH_INDEX_NAME"] || "";
    const agent = await project.agents.createVersion("MyAISearchAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful assistant. You must always provide citations for answers using the tool and render them as: `[message_idx:search_idx†source]`.",
      tools: [
        {
          type: "azure_ai_search",
          azure_ai_search: {
            indexes: [
              {
                project_connection_id: aiSearchConnectionId,
                index_name: aiSearchIndexName,
                query_type: "simple",
              },
            ],
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-bing-grounding", async function () {
    const bingProjectConnectionId = process.env["BING_GROUNDING_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("MyBingGroundingAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "bing_grounding",
          bing_grounding: {
            search_configurations: [
              {
                project_connection_id: bingProjectConnectionId,
              },
            ],
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-bing-custom-search", async function () {
    const bingCustomSearchProjectConnectionId =
      process.env["BING_CUSTOM_SEARCH_CONNECTION_ID"] || "";
    const bingCustomSearchInstanceName = process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "";
    const agent = await project.agents.createVersion("MyAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful agent that can use Bing Custom Search tools to assist users. Use the available Bing Custom Search tools to answer questions and perform tasks.",
      tools: [
        {
          type: "bing_custom_search_preview",
          bing_custom_search_preview: {
            search_configurations: [
              {
                project_connection_id: bingCustomSearchProjectConnectionId,
                instance_name: bingCustomSearchInstanceName,
              },
            ],
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-microsoft-fabric", async function () {
    const fabricProjectConnectionId = process.env["FABRIC_PROJECT_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("MyFabricAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "fabric_dataagent_preview",
          fabric_dataagent_preview: {
            project_connections: [
              {
                project_connection_id: fabricProjectConnectionId,
              },
            ],
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-sharepoint", async function () {
    const sharepointProjectConnectionId = process.env["SHAREPOINT_PROJECT_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("MyAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful agent that can use SharePoint tools to assist users. Use the available SharePoint tools to answer questions and perform tasks.",
      // Define SharePoint tool that searches SharePoint content
      tools: [
        {
          type: "sharepoint_grounding_preview",
          sharepoint_grounding_preview: {
            project_connections: [
              {
                project_connection_id: sharepointProjectConnectionId,
              },
            ],
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-browser-automation", async function () {
    const browserAutomationProjectConnectionId =
      process.env["BROWSER_AUTOMATION_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("MyAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions: `You are an Agent helping with browser automation tasks. 
              You can answer questions, provide information, and assist with various tasks 
              related to web browsing using the Browser Automation tool available to you.`,
      // Define Browser Automation tool
      tools: [
        {
          type: "browser_automation_preview",
          browser_automation_preview: {
            connection: {
              project_connection_id: browserAutomationProjectConnectionId,
            },
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-mcp-connection", async function () {
    const mcpProjectConnectionId = process.env["MCP_PROJECT_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("agent-mcp-connection-auth", {
      kind: "prompt",
      model: deploymentName,
      instructions: "Use MCP tools as needed",
      tools: [
        {
          type: "mcp",
          server_label: "api-specs",
          server_url: "https://api.githubcopilot.com/mcp",
          require_approval: "always",
          project_connection_id: mcpProjectConnectionId,
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-a2a", async function () {
    const a2aProjectConnectionId = process.env["A2A_PROJECT_CONNECTION_ID"] || "";
    const agent = await project.agents.createVersion("MyA2AAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      // Define A2A tool for agent-to-agent communication
      tools: [
        {
          type: "a2a_preview",
          project_connection_id: a2aProjectConnectionId,
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("agent-openapi-connection", async function () {
    const tripAdvisorProjectConnectionId = process.env["TRIPADVISOR_PROJECT_CONNECTION_ID"] || "";
    function loadOpenApiSpec(specPath: string): unknown {
      if (!fs.existsSync(specPath)) {
        throw new Error(`OpenAPI specification not found at: ${specPath}`);
      }

      try {
        const data = fs.readFileSync(specPath, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error(`Failed to read or parse OpenAPI specification at ${specPath}: ${error}`);
      }
    }
    const tripAdvisorSpecPath = path.resolve(__dirname, "../assets", "tripadvisor_openapi.json");
    const tripAdvisorSpec = loadOpenApiSpec(tripAdvisorSpecPath);
    const agent = await project.agents.createVersion("MyOpenApiConnectionAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a travel assistant that consults the TripAdvisor Content API via project connection to answer user questions about locations.",
      tools: [
        {
          type: "openapi",
          openapi: {
            name: "get_tripadvisor_location_details",
            description:
              "Fetch TripAdvisor location details, reviews, or photos using the Content API via project connection auth.",
            spec: tripAdvisorSpec,
            auth: {
              type: "project_connection",
              security_scheme: {
                project_connection_id: tripAdvisorProjectConnectionId,
              },
            },
          },
        },
      ],
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  });

  it("deployments", async function () {
    const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";
    console.log("List all deployments:");
    const deployments: ModelDeployment[] = [];
    const properties: Array<Record<string, string>> = [];
    // @ts-preserve-whitespace
    for await (const deployment of project.deployments.list()) {
      // Check if this is a ModelDeployment (has the required properties)
      if (
        deployment.type === "ModelDeployment" &&
        "modelName" in deployment &&
        "modelPublisher" in deployment &&
        "modelVersion" in deployment
      ) {
        deployments.push(deployment);
        properties.push({
          name: deployment.name,
          modelPublisher: deployment.modelPublisher,
          modelName: deployment.modelName,
        });
      }
    }
    console.log(`Retrieved deployments: ${JSON.stringify(properties, null, 2)}`);
    // @ts-preserve-whitespace
    // List all deployments by a specific model publisher (assuming we have one from the list)
    console.log(`List all deployments by the model publisher '${modelPublisher}':`);
    const filteredDeployments: ModelDeployment[] = [];
    for await (const deployment of project.deployments.list({
      modelPublisher,
    })) {
      // Check if this is a ModelDeployment
      if (
        deployment.type === "ModelDeployment" &&
        "modelName" in deployment &&
        "modelPublisher" in deployment &&
        "modelVersion" in deployment
      ) {
        filteredDeployments.push(deployment);
      }
    }
    console.log(
      `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
    );
    // @ts-preserve-whitespace
    // Get a single deployment by name
    if (deployments.length > 0) {
      const deploymentName = deployments[0].name;
      console.log(`Get a single deployment named '${deploymentName}':`);
      const singleDeployment = await project.deployments.get(deploymentName);
      console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment, null, 2)}`);
    }
  });

  it("connections", async function () {
    // List the details of all the connections
    const connections: Connection[] = [];
    const connectionNames: string[] = [];
    for await (const connection of project.connections.list()) {
      connections.push(connection);
      connectionNames.push(connection.name);
    }
    console.log(`Retrieved connections: ${connectionNames}`);
    // @ts-preserve-whitespace
    // Get the details of a connection, without credentials
    const connectionName = connections[0].name;
    const connection = await project.connections.get(connectionName);
    console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);
    // @ts-preserve-whitespace
    const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
    console.log(
      `Retrieved connection with credentials ${JSON.stringify(connectionWithCredentials, null, 2)}`,
    );
    // @ts-preserve-whitespace
    // List all connections of a specific type
    const azureAIConnections: Connection[] = [];
    for await (const azureOpenAIConnection of project.connections.list({
      connectionType: "AzureOpenAI",
      defaultConnection: true,
    })) {
      azureAIConnections.push(azureOpenAIConnection);
    }
    console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);
    // @ts-preserve-whitespace
    // Get the details of a default connection
    const defaultConnection = await project.connections.getDefault("AzureOpenAI", true);
    console.log(`Retrieved default connection ${JSON.stringify(defaultConnection, null, 2)}`);
  });

  it("datasets", async function () {
    const VERSION1 = "1.0";
    const VERSION2 = "2.0";
    const VERSION3 = "3.0";
    // @ts-preserve-whitespace
    // sample files to use in the demonstration
    const sampleFolder = "sample_folder";

    // Create a unique dataset name for this sample run
    const datasetName = `sample-dataset-basic`;

    console.log("Upload a single file and create a new Dataset to reference the file.");
    console.log("Here we explicitly specify the dataset version.");
    // @ts-preserve-whitespace
    const dataset1 = await project.datasets.uploadFile(
      datasetName,
      VERSION1,
      path.join(__dirname, sampleFolder, "sample_file1.txt"),
    );
    console.log("Dataset1 created:", JSON.stringify(dataset1, null, 2));
    // @ts-preserve-whitespace
    const credential = project.datasets.getCredentials(dataset1.name, dataset1.version, {});
    console.log("Credential for the dataset:", credential);

    console.log(
      "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
    );
    console.log("Here again we explicitly specify a new dataset version");

    const dataset2 = await project.datasets.uploadFolder(
      datasetName,
      VERSION2,
      path.join(__dirname, sampleFolder),
    );
    console.log("Dataset2 created:", JSON.stringify(dataset2, null, 2));

    console.log(
      "Upload a single file to the existing dataset, while letting the service increment the version",
    );
    const dataset3 = await project.datasets.uploadFile(
      datasetName,
      VERSION3,
      path.join(__dirname, sampleFolder, "sample_file2.txt"),
    );
    console.log("Dataset3 created:", JSON.stringify(dataset3, null, 2));

    // @ts-preserve-whitespace
    console.log("Get an existing Dataset version `1`:");
    const datasetVersion1 = await project.datasets.get(datasetName, VERSION1);
    console.log("Dataset version 1:", JSON.stringify(datasetVersion1, null, 2));

    console.log(`Listing all versions of the Dataset named '${datasetName}':`);
    const datasetVersions = await project.datasets.listVersions(datasetName);
    for await (const version of datasetVersions) {
      console.log("List versions:", version);
    }

    console.log("List latest versions of all Datasets:");
    const latestDatasets = project.datasets.list();
    for await (const dataset of latestDatasets) {
      console.log("List datasets:", dataset);
    }

    // List the details of all the datasets
    const datasets = project.datasets.listVersions(datasetName);
    const allDatasets: DatasetVersionUnion[] = [];
    for await (const dataset of datasets) {
      allDatasets.push(dataset);
    }
    console.log(`Retrieved ${allDatasets.length} datasets`);

    console.log("Delete all Datasets created above:");
    await project.datasets.delete(datasetName, VERSION1);
    await project.datasets.delete(datasetName, VERSION2);
    await project.datasets.delete(datasetName, dataset3.version);
    console.log("All specified Datasets have been deleted.");
  });

  it("files", async function () {
    const openAIClient = await project.getOpenAIClient();
    console.log("Uploading file");
    const created = await openAIClient.files.create({
      file: fs.createReadStream(filePath),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${created.id}`);
    const uploadedFile = await openAIClient.files.retrieve(created.id);
    console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));

    console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
    const contentResponse = await openAIClient.files.content(uploadedFile.id);
    const buf = Buffer.from(await contentResponse.arrayBuffer());
    console.log(buf.toString("utf-8"));

    // 4) List all files
    console.log("Listing all files:");
    const filesList = await openAIClient.files.list();
    for (const f of filesList.data ?? []) {
      console.log(JSON.stringify(f));
    }

    // 5) Delete the file
    console.log(`Deleting file with ID: ${uploadedFile.id}`);
    const deleted = await openAIClient.files.delete(uploadedFile.id);
    console.log(
      `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(
        deleted?.deleted ?? true,
      )}`,
    );
  });

  it("indexes", async function () {
    const indexName = "sample-index";
    const version = "1";
    const azureAIConnectionConfig: AzureAISearchIndex = {
      name: indexName,
      type: "AzureSearch",
      version,
      indexName,
      connectionName: "sample-connection",
    };
    // @ts-preserve-whitespace
    // Create a new Index
    const newIndex = await project.indexes.createOrUpdate(
      indexName,
      version,
      azureAIConnectionConfig,
    );
    console.log("Created a new Index:", newIndex);
    console.log(`Get an existing Index version '${version}':`);
    const index = await project.indexes.get(indexName, version);
    console.log(index);

    console.log(`Listing all versions of the Index named '${indexName}':`);
    const indexVersions = project.indexes.listVersions(indexName);
    for await (const indexVersion of indexVersions) {
      console.log(indexVersion);
    }

    console.log("List all Indexes:");
    const allIndexes = project.indexes.list();
    for await (const i of allIndexes) {
      console.log("Index:", i);
    }

    console.log("Delete the Index versions created above:");
    await project.indexes.delete(indexName, version);
  });

  it("datasetUpload", async function () {
    const dataset: DatasetVersion = await project.datasets.uploadFile(
      "jss-eval-sample-dataset",
      "1",
      "./samples_folder/sample_data_evaluation.jsonl",
    );
  });

  it("getDefault", async function () {
    const defaultConnection = await project.connections.getDefault("AzureOpenAI");
  });

  it("exceptions", async function () {
    try {
      const result = await project.connections.list();
    } catch (e) {
      if (isRestError(e)) {
        console.log(`Status code: ${e.code}`);
        console.log(e.message);
      } else {
        console.error(e);
      }
    }
  });
});
