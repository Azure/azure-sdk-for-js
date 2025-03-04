// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions with structured output for a chat context.
 *
 * @summary Get chat completions with structured output.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");
const { createRestError } = require("@azure-rest/core-client");

// Load the .env file if it exists
require("dotenv/config");
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

// Defines a JSON schema for a cooking recipe. You would like the AI model to respond in this format.
const json_schema = {
  type: "object",
  properties: {
    title: { type: "string", description: "The name of the recipe" },
    servings: { type: "integer", description: "How many servings are in this recipe" },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the ingredient",
          },
          quantity: {
            type: "string",
            description: "The quantity of the ingredient",
          },
        },
        required: ["name", "quantity"],
        additionalProperties: false,
      },
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          step: {
            type: "integer",
            description: "Enumerates the step",
          },
          directions: {
            type: "string",
            description: "Description of the recipe step",
          },
        },
        required: ["step", "directions"],
        additionalProperties: false,
      },
    },
    prep_time: {
      type: "integer",
      description: "Preperation time in minutes",
    },
    cooking_time: {
      type: "integer",
      description: "Cooking time in minutes",
    },
    notes: {
      type: "string",
      description: "Any additional notes related to this recipe",
    },
  },
  required: ["title", "servings", "ingredients", "steps", "prep_time", "cooking_time", "notes"],
  additionalProperties: false,
};

const response_format = {
  type: "json_schema",
  json_schema: {
    name: "Recipe_JSON_Schema",
    schema: json_schema,
    description:
      "Descripes a recipe in details, listing the ingredients, the steps and the time needed to prepare it",
    strict: true,
  },
};

async function main() {
  console.log("== Chat Completions Structured Output Sample ==");

  const client = createModelClient();
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." }, // System role not supported for some models
        {
          role: "user",
          content: "Please give me directions and ingredients to bake a chocolate cake.",
        },
      ],
      model: modelName,
      response_format,
    },
  });

  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.content);
  }
}

/*
 * This function creates a model client.
 */
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { apiVersion: "2024-08-01-preview", credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
