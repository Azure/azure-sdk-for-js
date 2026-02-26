// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createProjectsClient,
  createRecorder,
  getToolConnectionId,
} from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

describe("tools - basic", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create responses with code interpreter tool", async function () {
    const instructions =
      "You are a personal math tutor. When asked a math question, \
        write and run code using the python tool to answer the question.";

    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [{ type: "code_interpreter", container: { type: "auto" } }],
      instructions,
      input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Created response, response ID: ${response.id}, output text: ${response.output_text}`,
    );
  }, 50000);

  it("should create responses with function tool", async function () {
    // 1. Define a list of callable tools for the model
    const tools: any[] = [
      {
        type: "function",
        strict: true,
        name: "get_horoscope",
        description: "Get today's horoscope for an astrological sign.",
        parameters: {
          type: "object",
          properties: {
            sign: {
              type: "string",
              description: "An astrological sign like Taurus or Aquarius",
            },
          },
          required: ["sign"],
          additionalProperties: false,
        },
      },
    ];

    const get_horoscope = (sign: string): string => {
      return `Today's horoscope for ${sign}: You will find great success in your endeavors.`;
    };

    const instructions = "You are a helpful assistant that can use function tools.";
    // 2. Prompt the model with tools defined
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools,
      instructions,
      input: "What is my horoscope? I am an Aquarius.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);

    const input_list: any[] = [];

    // 3. Process function calls
    for (const item of response.output) {
      if (item.type === "function_call" && item.name === tools[0].name) {
        const parsed_arguments = JSON.parse(item.arguments);
        const horoscope = get_horoscope(parsed_arguments.sign);
        input_list.push({
          type: "function_call_output",
          call_id: item.call_id,
          output: JSON.stringify({ horoscope: horoscope }),
        });
      }
    }

    const second_response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      instructions,
      previous_response_id: response.id,
      input: input_list,
    });
    assert.isNotNull(second_response);
    assert.isNotNull(second_response.output_text);

    // 4. The model should be able to give a response
    console.log(
      `Function tool response, response ID: ${second_response.id}, output text: ${second_response.output_text}`,
    );
  }, 150000);

  it.skip("should create and list responses with an azure specific tool definition", async function () {
    const tool: any = {
      type: "azure_search",
      parameters: {
        endpoint: "https://fake-search-endpoint.search.windows.net",
        index_name: "fake-index-name",
        max_documents: 3,
      },
    };
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      input: "Tell me a three sentence bedtime story about a unicorn.",
      tools: [tool],
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Created response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    const retrievedResponse = await openAIClient.responses.retrieve(response.id);
    assert.isNotNull(retrievedResponse);
    assert.isNotNull(retrievedResponse.id);
    assert.isNotNull(retrievedResponse.output_text);
  }, 50000);

  it("should create responses with MCP tool", async function () {
    // Define MCP tool that connects to Azure REST API specifications GitHub repository
    // The tool requires approval for each operation to ensure user control over external requests
    const mcpTool: any = {
      type: "mcp",
      server_label: "api-specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "always",
    };

    const instructions =
      "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.";

    // Create a conversation thread to maintain context across multiple interactions
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send initial request that will trigger the MCP tool to access Azure REST API specs
    // This will generate an approval request since require_approval="always"
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [mcpTool],
      instructions,
      conversation: conversation.id,
      input: "Please summarize the Azure REST API specifications Readme",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(`Created response (id: ${response.id})`);

    // Process any MCP approval requests that were generated
    // When require_approval="always", the agent will request permission before accessing external resources
    const input_list: any[] = [];
    for (const item of response.output) {
      if (item.type === "mcp_approval_request" && item.server_label === "api-specs" && item.id) {
        // Automatically approve the MCP request to allow the agent to proceed
        // In production, you might want to implement more sophisticated approval logic
        input_list.push({
          type: "mcp_approval_response",
          approve: true,
          approval_request_id: item.id,
        });
      }
    }

    console.log(`Processing ${input_list.length} approval requests`);

    // Send the approval response back to continue the agent's work
    // This allows the MCP tool to access the GitHub repository and complete the original request
    const secondResponse = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [mcpTool],
      instructions,
      conversation: conversation.id,
      input: input_list,
    });

    assert.isNotNull(secondResponse);
    assert.isNotNull(secondResponse.output_text);
    console.log(
      `MCP tool response, response ID: ${secondResponse.id}, output text: ${secondResponse.output_text}`,
    );
  });

  it.skip("should create responses with web search tool", async function () {
    const instructions = "You are a helpful assistant that can search the web";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search the web
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [{ type: "web_search_preview" }],
      instructions,
      conversation: conversation.id,
      input: "What's a positive news story from today?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Web search response, response ID: ${response.id}, output text: ${response.output_text}`,
    );
  });

  it("should create responses with OpenAPI tool", async function () {
    // Inline OpenAPI spec for weather API (wttr.in)
    const weatherOpenApiSpec = {
      openapi: "3.1.0",
      info: {
        title: "get weather data",
        description: "Retrieves current weather data for a location based on wttr.in.",
        version: "v1.0.0",
      },
      servers: [{ url: "https://wttr.in" }],
      auth: [],
      paths: {
        "/{location}": {
          get: {
            description: "Get weather information for a specific location",
            operationId: "GetCurrentWeather",
            parameters: [
              {
                name: "location",
                in: "path",
                description: "City or location to retrieve the weather for",
                required: true,
                schema: { type: "string" },
              },
              {
                name: "format",
                in: "query",
                description: "Always use j1 value for this parameter",
                required: true,
                schema: { type: "string", default: "j1" },
              },
            ],
            responses: {
              "200": {
                description: "Successful response",
                content: { "text/plain": { schema: { type: "string" } } },
              },
              "404": { description: "Location not found" },
            },
            deprecated: false,
          },
        },
      },
      components: { schemes: {} },
    };

    const openApiTool: any = {
      type: "openapi",
      openapi: {
        name: "get_weather",
        description: "Retrieve weather information for a location",
        spec: weatherOpenApiSpec,
        auth: { type: "anonymous" },
      },
    };

    const instructions =
      "You are a helpful weather assistant. Use the get_weather tool to retrieve current weather information.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to get weather information
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [openApiTool],
      instructions,
      conversation: conversation.id,
      input: "What is the weather in Seattle?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `OpenAPI tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain weather information or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with SharePoint tool", async function () {
    const sharepointConnectionId = getToolConnectionId("sharepoint");

    const sharepointTool: any = {
      type: "sharepoint_grounding_preview",
      sharepoint_grounding_preview: {
        project_connections: [
          {
            project_connection_id: sharepointConnectionId,
          },
        ],
      },
    };

    const instructions =
      "You are a helpful agent that can use SharePoint tools to assist users. Use the available SharePoint tools to answer questions and perform tasks.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search SharePoint content
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [sharepointTool],
      instructions,
      conversation: conversation.id,
      input: "Please summarize the last meeting notes stored in SharePoint.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `SharePoint tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain SharePoint content or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with Microsoft Fabric tool", async function () {
    const fabricConnectionId = getToolConnectionId("fabric");

    const fabricTool: any = {
      type: "fabric_dataagent_preview",
      fabric_dataagent_preview: {
        project_connections: [
          {
            project_connection_id: fabricConnectionId,
          },
        ],
      },
    };

    const instructions =
      "You are a helpful assistant that can query Microsoft Fabric data sources.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to Fabric data sources
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [fabricTool],
      instructions,
      conversation: conversation.id,
      input: "Tell me about sales records.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Fabric tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain Fabric data or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with A2A (Agent-to-Agent) tool", async function () {
    const a2aConnectionId = getToolConnectionId("a2a");

    const a2aTool: any = {
      type: "a2a_preview",
      project_connection_id: a2aConnectionId,
    };

    const instructions = "You are a helpful assistant that can communicate with other agents.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to trigger A2A communication
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [a2aTool],
      instructions,
      conversation: conversation.id,
      input: "What can the secondary agent do?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `A2A tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain A2A communication result or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with Bing Custom Search tool", async function () {
    const bingCustomSearchConnectionId = getToolConnectionId("bing-custom-search");
    const bingCustomSearchInstanceName =
      process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "test-instance";

    const bingCustomSearchTool: any = {
      type: "bing_custom_search_preview",
      bing_custom_search_preview: {
        search_configurations: [
          {
            project_connection_id: bingCustomSearchConnectionId,
            instance_name: bingCustomSearchInstanceName,
          },
        ],
      },
    };

    const instructions =
      "You are a helpful agent that can use Bing Custom Search tools to assist users. Use the available Bing Custom Search tools to answer questions and perform tasks.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search using Bing Custom Search
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [bingCustomSearchTool],
      instructions,
      conversation: conversation.id,
      input: "Tell me more about foundry agent service.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Bing Custom Search tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain search results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with Bing Grounding tool", async function () {
    const bingGroundingConnectionId = getToolConnectionId("bing-grounding");

    const bingGroundingTool: any = {
      type: "bing_grounding",
      bing_grounding: {
        search_configurations: [
          {
            project_connection_id: bingGroundingConnectionId,
          },
        ],
      },
    };

    const instructions =
      "You are a helpful assistant that can search the web for current information.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query that requires current information from the web
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [bingGroundingTool],
      instructions,
      conversation: conversation.id,
      input: "What is today's date and weather in Seattle?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Bing Grounding tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain grounded web results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it.skip("should create responses with Azure AI Search tool", async function () {
    const aiSearchConnectionId = getToolConnectionId("azure-ai-search");
    const aiSearchIndexName = process.env["AI_SEARCH_INDEX_NAME"] || "test-index";

    const aiSearchTool: any = {
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
    };

    const instructions =
      "You are a helpful assistant. You must always provide citations for answers using the tool.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search indexed content
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [aiSearchTool],
      instructions,
      conversation: conversation.id,
      input: "Tell me about the services available.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Azure AI Search tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain search results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);

  it("should create responses with Browser Automation tool", async function () {
    const browserAutomationConnectionId = getToolConnectionId("browser-automation");

    const browserAutomationTool: any = {
      type: "browser_automation_preview",
      browser_automation_preview: {
        connection: {
          project_connection_id: browserAutomationConnectionId,
        },
      },
    };

    const instructions = `You are an Agent helping with browser automation tasks. 
      You can answer questions, provide information, and assist with various tasks 
      related to web browsing using the Browser Automation tool available to you.`;

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a browser automation request
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [browserAutomationTool],
      instructions,
      conversation: conversation.id,
      input: "Go to finance.yahoo.com and search for MSFT stock price.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Browser Automation tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain browser automation results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 120000);

  it.skip("should create responses with Memory Search tool", async function () {
    const chatModelDeployment = process.env["AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";
    const embeddingModelDeployment =
      process.env["AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME"] || "text-embedding-3-large";
    const memoryStoreName = `test_memory_store_${Date.now()}`;
    const scope = "test_user_123";

    try {
      // Create a memory store with chat and embedding models
      const memoryStore = await projectsClient.beta.memoryStores.create(
        memoryStoreName,
        {
          kind: "default",
          chat_model: chatModelDeployment,
          embedding_model: embeddingModelDeployment,
        },
        {
          description: "Memory store for test conversations",
        },
      );
      console.log(`Created memory store: ${memoryStore.name} (${memoryStore.id})`);

      const memorySearchTool: any = {
        type: "memory_search",
        memory_store_name: memoryStore.name,
        scope,
        update_delay: 1,
      };

      const instructions =
        "You are a helpful assistant that remembers user preferences using the memory search tool.";

      // Create a conversation for the agent interaction
      const conversation = await openAIClient.conversations.create();
      console.log(`Created conversation (id: ${conversation.id})`);

      // Send a request to store a memory
      const response = await openAIClient.responses.create({
        model: "gpt-5-mini",
        tools: [memorySearchTool],
        instructions,
        conversation: conversation.id,
        input: "My favorite color is blue. Please remember this.",
      });

      assert.isNotNull(response);
      assert.isNotNull(response.id);
      console.log(
        `Memory Search tool response, response ID: ${response.id}, output text: ${response.output_text}`,
      );

      // The response should indicate memory was stored or tool usage
      assert.isNotNull(response.output);
      console.log(`Response output items: ${response.output.length}`);

      // Clean up memory store
      await projectsClient.beta.memoryStores.delete(memoryStoreName);
      console.log(`Deleted memory store: ${memoryStoreName}`);
    } catch (error: any) {
      // Clean up memory store on error
      try {
        await projectsClient.beta.memoryStores.delete(memoryStoreName);
      } catch {
        // Ignore cleanup errors
      }
      throw error;
    }
  }, 120000);

  it.skip("should create responses with Computer Use tool", async function () {
    const computerUseModelDeployment =
      process.env["COMPUTER_USE_MODEL_DEPLOYMENT_NAME"] || "computer-use-preview";

    const computerUseTool: any = {
      type: "computer_use_preview",
      display_width: 1026,
      display_height: 769,
      environment: "windows",
    };

    const instructions = `You are a computer automation assistant. Be direct and efficient.`;

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send an initial request with a text prompt (no screenshot for basic test)
    // Computer Use models require truncation: "auto"
    const response = await openAIClient.responses.create({
      model: computerUseModelDeployment,
      tools: [computerUseTool],
      instructions,
      conversation: conversation.id,
      input: "Describe what you would do to search for 'Azure AI' in a web browser.",
      truncation: "auto",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Computer Use tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain computer use actions or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);
  }, 120000);

  it.skip("should create responses with Image Generation tool", async function () {
    const imageGenModelDeployment = "gpt-image-1";

    const imageGenTool: any = {
      type: "image_generation",
      quality: "low",
      size: "1024x1024",
    };

    const instructions = "Generate images based on user prompts.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a request to generate an image
    const response = await openAIClient.responses.create(
      {
        model: "gpt-5-mini",
        tools: [imageGenTool],
        instructions,
        conversation: conversation.id,
        input: "Generate a simple image of a blue circle.",
      },
      {
        headers: { "x-ms-oai-image-generation-deployment": imageGenModelDeployment },
      },
    );

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `Image Generation tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain image generation results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);

    // Check if image data was generated
    const imageData = response.output?.filter(
      (output: any) => output.type === "image_generation_call",
    );
    if (imageData && imageData.length > 0) {
      console.log("Image generation call found in response");
    }
  }, 120000);

  it.skip("should create responses with MCP tool using project connection auth", async function () {
    const mcpConnectionId = getToolConnectionId("mcp-connection");

    const mcpTool: any = {
      type: "mcp",
      server_label: "api-specs",
      server_url: "https://api.githubcopilot.com/mcp",
      require_approval: "always",
      project_connection_id: mcpConnectionId,
    };

    const instructions = "Use MCP tools as needed.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a request that will trigger MCP tool
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [mcpTool],
      instructions,
      conversation: conversation.id,
      input: "What is my username in Github profile?",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(`MCP Connection Auth tool response, response ID: ${response.id}`);

    // The response should contain MCP approval requests or tool usage
    assert.isNotNull(response.output);
    console.log(`Response output items: ${response.output.length}`);

    // Process any MCP approval requests that were generated
    const inputList: OpenAI.Responses.ResponseInputItem.McpApprovalResponse[] = [];
    for (const item of response.output) {
      if (item.type === "mcp_approval_request") {
        if (item.server_label === "api-specs" && item.id) {
          console.log(`\nReceived MCP approval request (id: ${item.id})`);
          console.log(`  Server: ${item.server_label}`);
          console.log(`  Tool: ${item.name}`);

          // Automatically approve the MCP request to allow the agent to proceed
          // In production, you might want to implement more sophisticated approval logic
          inputList.push({
            type: "mcp_approval_response",
            approval_request_id: item.id,
            approve: true,
          });
        }
      }
    }

    console.log(`\nProcessing ${inputList.length} approval request(s)`);
    console.log("Final input:");
    console.log(JSON.stringify(inputList, null, 2));

    // Send the approval response back to continue the agent's work
    // This allows the MCP tool to access the GitHub repository and complete the original request
    console.log("\nSending approval response...");
    const finalResponse = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [mcpTool],
      instructions,
      input: inputList,
      conversation: conversation.id,
    });

    assert.isNotNull(finalResponse.output);
    assert.isNotNull(finalResponse.output_text);
    console.log(`\nResponse: ${finalResponse.output_text}`);
  }, 60000);

  it.skip("should create responses with OpenAPI tool using project connection auth", async function () {
    const openApiConnectionId = getToolConnectionId("openapi");

    // Inline TripAdvisor OpenAPI spec (simplified for testing)
    const tripAdvisorOpenApiSpec = {
      openapi: "3.1.0",
      info: {
        title: "TripAdvisor Content API",
        description: "Fetch TripAdvisor location details.",
        version: "v1.0.0",
      },
      servers: [{ url: "https://api.content.tripadvisor.com/api/v1" }],
      paths: {
        "/location/{locationId}/details": {
          get: {
            description: "Get location details",
            operationId: "getLocationDetails",
            parameters: [
              {
                name: "locationId",
                in: "path",
                description: "The TripAdvisor location ID",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": { description: "Successful response" },
            },
          },
        },
      },
    };

    const openApiTool: any = {
      type: "openapi",
      openapi: {
        name: "get_tripadvisor_location_details",
        description: "Fetch TripAdvisor location details via project connection auth.",
        spec: tripAdvisorOpenApiSpec,
        auth: {
          type: "project_connection",
          security_scheme: {
            project_connection_id: openApiConnectionId,
          },
        },
      },
    };

    const instructions =
      "You are a travel assistant that consults the TripAdvisor Content API to answer user questions about locations.";

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a request to get location details
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      tools: [openApiTool],
      instructions,
      conversation: conversation.id,
      input: "Get details for TripAdvisor location 293919.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(
      `OpenAPI Connection Auth tool response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    // The response should contain OpenAPI tool results or indicate tool usage
    assert.isNotNull(response.output);
    console.log(`Response output: ${response.output}`);
    console.log(`Response output items: ${response.output.length}`);
  }, 60000);
});
