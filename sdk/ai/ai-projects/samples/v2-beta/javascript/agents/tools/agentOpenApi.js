// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with OpenAPI tool capabilities
 * using the OpenApiAgentTool and synchronous Azure AI Projects client. The agent can call
 * external APIs defined by OpenAPI specifications.
 *
 * @summary This sample demonstrates how to create an agent with OpenAPI tool capabilities,
 * load OpenAPI specifications from local assets, and process streaming responses that may
 * include tool outputs.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const weatherSpecPath = path.resolve(__dirname, "../assets", "weather_openapi.json");

function loadOpenApiSpec(specPath) {
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

function createWeatherTool(spec) {
  const auth = { type: "anonymous" };
  const definition = {
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

async function main() {
  console.log("Loading OpenAPI specifications from assets directory...");
  const weatherSpec = loadOpenApiSpec(weatherSpecPath);

  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

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
      const item = event.item;
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

module.exports = { main };
