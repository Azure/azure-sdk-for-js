// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with OpenAPI tool capabilities
 * using the OpenApiTool and synchronous Azure AI Projects client. The agent can call
 * external APIs defined by OpenAPI specifications.
 *
 * @summary This sample demonstrates how to create an agent with OpenAPI tool capabilities,
 * load OpenAPI specifications from local assets, and process streaming responses that may
 * include tool outputs.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  AIProjectClient,
  OpenApiTool,
  OpenApiFunctionDefinition,
  OpenApiAnonymousAuthDetails,
} from "@azure/ai-projects";
import { fileURLToPath } from "node:url";
import * as fs from "node:fs/promises";
import * as path from "path";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const weatherSpecPath = path.resolve(__dirname, "../assets", "weather_openapi.json");

async function loadOpenApiSpec(specPath: string): Promise<unknown> {
  try {
    const data = await fs.readFile(specPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read or parse OpenAPI specification at ${specPath}: ${error}`);
  }
}

function createWeatherTool(spec: unknown): OpenApiTool {
  const auth: OpenApiAnonymousAuthDetails = { type: "anonymous" };
  const definition: OpenApiFunctionDefinition = {
    name: "get_weather",
    description: "Retrieve weather information for a location using wttr.in",
    spec,
    auth,
  };

  return {
    type: "openapi",
    openapi: definition,
  };
}

export async function main(): Promise<void> {
  console.log("Loading OpenAPI specifications from assets directory...");
  const weatherSpec = await loadOpenApiSpec(weatherSpecPath);

  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with OpenAPI tool...");

  const agent = await project.agents.createVersion("MyOpenApiAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant that can call external APIs defined by OpenAPI specs to answer user questions.",
    tools: [createWeatherTool(weatherSpec)],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending request to OpenAPI-enabled agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input:
        "What's the weather in Seattle and how should I plan my outfit for the day based on the forecast?",
      stream: true,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
        tool_choice: "required",
      },
    },
  );

  // Process the streaming response
  for await (const event of streamResponse) {
    if (event.type === "response.created") {
      console.log(`Follow-up response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log("\n\nFollow-up response done!");
    } else if (event.type === "response.output_item.done") {
      const item = event.item as any;
      if (item.type === "message") {
        const content = item.content?.[item.content.length - 1];
        if (content?.type === "output_text" && content.annotations) {
          for (const annotation of content.annotations) {
            if (annotation.type === "url_citation") {
              console.log(
                `URL Citation: ${annotation.url}, Start index: ${annotation.start_index}, End index: ${annotation.end_index}`,
              );
            }
          }
        }
      } else if (item.type === "tool_call") {
        console.log(`Tool call completed: ${item.name ?? "unknown"}`);
      }
    } else if (event.type === "response.completed") {
      console.log("\nFollow-up completed!");
    }
  }

  // Clean up resources by deleting the agent version
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nOpenAPI agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
