// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent that uses OpenAPI tools
 * authenticated via a project connection. The agent loads the TripAdvisor
 * OpenAPI specification from local assets and can invoke the API through the
 * configured project connection.
 *
 * @summary Demonstrates how to create an OpenAPI-enabled agent that uses a project connection for
 * authentication and stream responses that include tool invocation details.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  AIProjectClient,
  OpenApiTool,
  OpenApiFunctionDefinition,
  OpenApiProjectConnectionAuthDetails,
} from "@azure/ai-projects";
import { fileURLToPath } from "node:url";
import * as fs from "node:fs/promises";
import * as path from "path";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const tripAdvisorProjectConnectionId =
  process.env["TRIPADVISOR_PROJECT_CONNECTION_ID"] || "<tripadvisor project connection id>";
const tripAdvisorSpecPath = path.resolve(__dirname, "../assets", "tripadvisor_openapi.json");

async function loadOpenApiSpec(specPath: string): Promise<unknown> {
  try {
    const data = await fs.readFile(specPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read or parse OpenAPI specification at ${specPath}: ${error}`);
  }
}

function createTripAdvisorTool(spec: unknown): OpenApiTool {
  const auth: OpenApiProjectConnectionAuthDetails = {
    type: "project_connection",
    security_scheme: {
      project_connection_id: tripAdvisorProjectConnectionId,
    },
  };

  const definition: OpenApiFunctionDefinition = {
    name: "get_tripadvisor_location_details",
    description:
      "Fetch TripAdvisor location details, reviews, or photos using the Content API via project connection auth.",
    spec,
    auth,
  };

  return {
    type: "openapi",
    openapi: definition,
  };
}

export async function main(): Promise<void> {
  console.log("Loading TripAdvisor OpenAPI specification from assets directory...");
  const tripAdvisorSpec = await loadOpenApiSpec(tripAdvisorSpecPath);

  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with OpenAPI project-connection tool...");

  const agent = await project.agents.createVersion("MyOpenApiConnectionAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a travel assistant that consults the TripAdvisor Content API via project connection to answer user questions about locations.",
    tools: [createTripAdvisorTool(tripAdvisorSpec)],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending request to TripAdvisor OpenAPI agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input:
        "Provide a quick overview of the TripAdvisor location 293919 including its name, rating, and review count.",
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

  console.log("\nTripAdvisor OpenAPI agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
