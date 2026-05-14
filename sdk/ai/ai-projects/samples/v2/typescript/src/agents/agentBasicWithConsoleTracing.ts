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

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, enableGenAITracing } from "@azure/ai-projects";
import { NodeTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { context, trace } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
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
  enableGenAITracing({ contentRecording: false, traceContextPropagation: true, experimental: true });

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
      // Create conversation with initial user message
      console.log("\nCreating conversation with initial user message...");
      const conversation = await openAIClient.conversations.create({
        items: [
          { type: "message", role: "user", content: "What is the size of France in square miles?" },
        ],
      });
      console.log(`Created conversation with initial user message (id: ${conversation.id})`);

      // Generate response using the agent
      console.log("\nGenerating response...");
      const response = await openAIClient.responses.create(
        {
          conversation: conversation.id,
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
