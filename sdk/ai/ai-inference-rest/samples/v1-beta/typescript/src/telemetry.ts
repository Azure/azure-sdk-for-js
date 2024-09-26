// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get instrumentation by open telemetry.
 *
 * @summary get instrumentation by open telemetry.
 */

import { trace, context } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { ConsoleSpanExporter, NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import * as dotenv from "dotenv";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"] || "<key>";
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
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";

async function main() {
  console.log("== Chat Completions Sample ==");

  const tracer = trace.getTracer('sample', '0.1.0');

  const response = await tracer.startActiveSpan('main', async (span) => {
    const client = ModelClient(endpoint, new AzureKeyCredential(key));
    return client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "What's the weather like in Boston?" }],
        temperature: 1.0,
        max_tokens: 1000,
        top_p: 1.0
      },
      tracingOptions: { tracingContext: context.active() }
    }).then((response) => {
      span.end();
      return response;
    });
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.content);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
