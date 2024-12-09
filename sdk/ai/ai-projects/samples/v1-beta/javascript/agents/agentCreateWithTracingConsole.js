// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates How to instrument and get tracing using open telemetry.
 *
 * @summary Create Agent and instrument using open telemetry.
 */

const { trace, context } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
const {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");

require("dotenv").config();

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

const { AIProjectsClient } = require("@azure/ai-projects");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>>;<subscription>;<resource group>;<project>";
let appInsightsConnectionString = process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"];

async function main() {
  const tracer = trace.getTracer("Agents Sample", "1.0.0");

  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  if (!appInsightsConnectionString) {
    appInsightsConnectionString = await client.telemetry.getConnectionString();
  }

  if (appInsightsConnectionString) {
    const exporter = new AzureMonitorTraceExporter({
      connectionString: appInsightsConnectionString,
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  }

  await tracer.startActiveSpan("main", async (span) => {
    client.telemetry.updateSettings({ enableContentRecording: true });

    const agent = await client.agents.createAgent(
      "gpt-4o",
      { name: "my-agent", instructions: "You are helpful agent" },
      { tracingOptions: { tracingContext: context.active() } },
    );

    console.log(`Created agent, agent ID : ${agent.id}`);

    const thread = await client.agents.createThread();
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content: "Hello, tell me a joke",
    });
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    let run = await client.agents.createRun(thread.id, agent.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await delay(1000);
      run = await client.agents.getRun(thread.id, run.id);
      console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
    }

    await client.agents.deleteAgent(agent.id);

    console.log(`Deleted agent`);

    await client.agents.listMessages(thread.id);

    span.end();
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
