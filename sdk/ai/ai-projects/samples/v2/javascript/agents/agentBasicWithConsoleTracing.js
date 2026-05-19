// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * with GenAI tracing enabled using a console exporter.
 *
 * Set the following environment variables before running:
 *   FOUNDRY_PROJECT_ENDPOINT - Your Microsoft Foundry project endpoint URL
 *   FOUNDRY_MODEL_NAME       - The deployment name of the model to use
 *
 * @summary Demonstrates agent operations with OpenTelemetry console tracing.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient, enableGenAITracing } = require("@azure/ai-projects");
const {
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { context, trace } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  // Set up OpenTelemetry with a console exporter
  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  });
  provider.register();

  // Bridge @azure/core-tracing to OpenTelemetry
  registerInstrumentations({ instrumentations: [createAzureSdkInstrumentation()] });

  // Enable GenAI tracing (experimental)
  // To capture prompt and completion content in traces, set contentRecording to true.
  // Note: content recording may include sensitive data such as user inputs and model outputs.
  // Alternatively, you can set these options via environment variables:
  //   contentRecording:           OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT (default: false)
  //   traceContextPropagation:    AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION (default: true)
  //   experimental:               AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING (default: false)
  enableGenAITracing({
    contentRecording: false,
    traceContextPropagation: true,
    experimental: true,
  });

  const tracer = trace.getTracer("AgentBasicWithConsoleTraces");

  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create a parent span for the scenario
  const span = tracer.startSpan("agentBasicWithConsoleTraces");
  const ctx = trace.setSpan(context.active(), span);

  await context.with(ctx, async () => {
    // Create agent
    console.log("Creating agent...");
    const agent = await project.agents.createVersion("my-agent-console-tracing", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    try {
      // Create an empty conversation
      console.log("\nCreating conversation...");
      const conversation = await openAIClient.conversations.create({});
      console.log(`Created conversation (id: ${conversation.id})`);

      // Generate response using the agent, passing user message as input
      console.log("\nGenerating response...");
      const response = await openAIClient.responses.create(
        {
          conversation: conversation.id,
          input: "What is the size of France in square miles?",
        },
        {
          body: { agent_reference: { name: agent.name, type: "agent_reference" } },
        },
      );
      console.log(`Response output: ${response.output_text}`);

      // Clean up conversation
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    }
  });

  span.end();
  await provider.shutdown();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
