// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic responses operation
 * using the OpenAI client, while defining a desired JSON schema
 * for the response ("structured output").
 *
 * This sample is inspired by the OpenAI example here:
 * https://platform.openai.com/docs/guides/structured-outputs/supported-schemas
 *
 * @summary This sample demonstrates how to create responses with
 * structured output using a JSON schema.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

// Define the JSON schema for the structured output
const calendarEventSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    date: {
      type: "string",
      description: "Date in YYYY-MM-DD format",
    },
    participants: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["name", "date", "participants"],
  additionalProperties: false,
};

export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating response with structured output...");
  const response = await openAIClient.responses.create({
    model: deploymentName,
    instructions: `
      Extracts calendar event information from the input messages,
      and return it in the desired structured output format.
    `,
    text: {
      format: {
        type: "json_schema",
        name: "CalendarEvent",
        schema: calendarEventSchema,
      },
    },
    input: "Alice and Bob are going to a science fair this Friday, November 7, 2025.",
  });

  console.log(`Response output: ${response.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
