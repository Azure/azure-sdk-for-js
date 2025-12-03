// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type {
  AgentsOperations,
  AIProjectClient,
  OpenApiFunctionDefinition,
} from "../../../src/index.js";

const firstAgentName = "firstAgent";
const agentInstructions = "You are a helpful agent";

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

describe("agents - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and delete an agent version", async () => {
    const agent = await agents.createVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, firstAgentName);
    console.log(`Created agent, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });

  it("should create and delete an agent with OpenApiTool", async () => {
    const openApiToolDefinition: OpenApiFunctionDefinition = {
      name: "get_weather",
      description: "Retrieve weather information for a location",
      spec: weatherOpenApiSpec,
      auth: {
        type: "anonymous",
      },
    };

    const agent = await agents.createVersion("openApiAgent", {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: "You are a helpful weather assistant.",
      tools: [
        {
          type: "openapi",
          openapi: openApiToolDefinition,
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "openApiAgent");
    assert.equal(agent.definition.kind, "prompt");
    const definition = agent.definition as { kind: "prompt"; tools?: unknown[] };
    assert.isNotNull(definition.tools);
    assert.equal(definition.tools!.length, 1);
    console.log(`Created agent with OpenApiTool, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent with OpenApiTool, agent name: ${agent.name}`);
  });
});
