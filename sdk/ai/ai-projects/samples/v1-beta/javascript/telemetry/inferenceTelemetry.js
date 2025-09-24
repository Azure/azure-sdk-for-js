// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to enable telemetry for inference operations using AIProjectClient.
 */

const { trace, context } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
const {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});

provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

async function main() {
  const tracer = trace.getTracer("inference-sample", "0.1.0");

  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const client = project.inference.chatCompletions({
    apiVersion: "2024-05-01-preview",
  });
  const response = await tracer.startActiveSpan("chatCompletions", async (span) => {
    const res = await client.post({
      body: {
        model: deploymentName,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. You will talk like a pirate.",
          }, // System role not supported for some models
          { role: "user", content: "How many feet are in a mile?" },
        ],
      },
      tracingOptions: {
        tracingContext: context.active(),
      },
    });
    span.end();
    return res;
  });

  console.log("response = ", JSON.stringify(response, null, 2));
}

main().catch((err) => {
  console.error("Error running sample:", err);
});

module.exports = { main };
