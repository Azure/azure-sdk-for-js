// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to enable remote telemetry for inference operations using AIProjectClient.
 */

const { trace } = require("@opentelemetry/api");
const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

const options = {
  azureMonitorExporterOptions: {
    connectionString: process.env["TELEMETRY_CONNECTION_STRING"] || "<your connection string>",
  },
};
useAzureMonitor(options);

async function main() {
  const tracer = trace.getTracer("inference-sample", "0.1.0");

  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const client = await project.getAzureOpenAIClient({
    apiVersion: "2024-10-21",
  });
  const response = await tracer.startActiveSpan("chatCompletions", async (span) => {
    const res = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. You will talk like a pirate.",
        }, // System role not supported for some models
        { role: "user", content: "How many feet are in a mile?" },
      ],
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
