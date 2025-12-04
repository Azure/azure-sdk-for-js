// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient, getToolConnectionId } from "../utils/createClient.js";
import { assert, beforeEach, it, describe } from "vitest";
import { isLiveMode, isRecordMode } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

const isLiveOrRecord = isLiveMode() || isRecordMode();
// OpenAI SDK tests don't work with test recorder
// Skip in playback mode (only run in live/record mode)
describe.skipIf(!isLiveOrRecord)("My test", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;

  beforeEach(async function () {
    projectsClient = createProjectsClient();
    openAIClient = await projectsClient.getOpenAIClient();
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
      previous_response_id: response.id,
      input: input_list,
    });

    assert.isNotNull(secondResponse);
    assert.isNotNull(secondResponse.output_text);
    console.log(
      `MCP tool response, response ID: ${secondResponse.id}, output text: ${secondResponse.output_text}`,
    );
  });

  it("should create responses with web search tool", async function () {
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
});
