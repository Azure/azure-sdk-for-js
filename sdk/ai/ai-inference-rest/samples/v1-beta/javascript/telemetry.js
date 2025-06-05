// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get instrumentation by open telemetry.
 *
 * @summary get instrumentation by open telemetry.
 */

const { trace, context } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
const {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
require("dotenv/config");
const { AzureKeyCredential } = require("@azure/core-auth");
const { createRestError } = require("@azure-rest/core-client");
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];
const connectionString = process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"];

const provider = new NodeTracerProvider();
if (connectionString) {
  const exporter = new AzureMonitorTraceExporter({ connectionString });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

// any import such as ai-inference has core-tracing as dependency must be imported after the instrumentation is registered
const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  console.log("== Chat Completions Sample ==");

  const tracer = trace.getTracer("sample", "0.1.0");

  const client = createModelClient();

  const response = await tracer.startActiveSpan("main", async (span) => {
    return client
      .path("/chat/completions")
      .post({
        body: {
          messages: [{ role: "user", content: "What's the weather like in Boston?" }],
          temperature: 1.0,
          max_tokens: 1000,
          top_p: 1.0,
          model: modelName,
        },
        tracingOptions: { tracingContext: context.active() },
      })
      .then((res) => {
        span.end();
        return res;
      });
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

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
