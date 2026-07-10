// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * with GenAI tracing enabled using Azure Monitor. Traces can be
 * viewed in Microsoft Foundry.
 *
 * To use Azure Monitor tracing, add an Application Insights resource
 * to your Microsoft Foundry project.
 *
 * Set the following environment variables before running:
 *   FOUNDRY_PROJECT_ENDPOINT - Your Microsoft Foundry project endpoint URL
 *   FOUNDRY_MODEL_NAME       - The deployment name of the model to use
 *
 * @summary Demonstrates agent operations with Azure Monitor tracing.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { useAzureMonitor, shutdownAzureMonitor } from "@azure/monitor-opentelemetry";
import { context, trace } from "@opentelemetry/api";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Get Application Insights connection string (from environment or your project)
  const connectionString =
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<connection string>";

  // Configure Azure Monitor tracing (must be done before creating the client)
  useAzureMonitor({
    azureMonitorExporterOptions: { connectionString },
    samplingRatio: 1,
    tracesPerSecond: 0,
  });

  // Create AI Project client with tracing enabled (experimental)
  // To capture prompt and completion content in traces, set contentRecording to true.
  // Note: content recording may include sensitive data such as user inputs and model outputs.
  // Alternatively, you can set these options via environment variables:
  //   contentRecording:           OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT (default: false)
  //   traceContextPropagation:    AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION (default: true)
  //   experimental:               AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING (default: false)
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
    tracingOptions: {
      experimental: true,
      contentRecording: true,
      traceContextPropagation: true,
    },
  });
  const openAIClient = project.getOpenAIClient();

  const tracer = trace.getTracer("AgentBasicWithAzureMonitorTracing");
  const scenario = "agentBasicWithAzureMonitorTracing";

  // Create a parent span for the scenario
  const span = tracer.startSpan(scenario);
  const ctx = trace.setSpan(context.active(), span);

  await context.with(ctx, async () => {
    // Create agent
    console.log("Creating agent...");
    const agent = await project.agents.createVersion("my-agent-azure-monitor-tracing", {
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

  // Shut down Azure Monitor to flush all pending traces before exit
  await shutdownAzureMonitor();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
