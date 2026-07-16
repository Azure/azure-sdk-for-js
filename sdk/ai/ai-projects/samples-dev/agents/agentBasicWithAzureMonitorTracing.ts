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
 *   FOUNDRY_AGENT_NAME       - Optional agent name. Defaults to "MyAgent"
 *
 * @summary Demonstrates agent operations with Azure Monitor tracing.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { useAzureMonitor, shutdownAzureMonitor } from "@azure/monitor-opentelemetry";
import { context, trace } from "@opentelemetry/api";
import "dotenv/config";
import { withAgentVersionEndpoint } from "./agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

export async function main(): Promise<void> {
  // Create AI Project client with per-instance tracing options.
  // To capture prompt and completion content in traces, set contentRecording to true.
  // Note: content recording may include sensitive data such as user inputs and model outputs.
  // Precedence: tracingOptions property > environment variable > default value.
  // Environment variables (used when a property is omitted):
  //   contentRecording:           OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT (default: false)
  //   traceContextPropagation:    AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION (default: true)
  //   experimental:               AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING (default: false)
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
    tracingOptions: {
      contentRecording: false,
      traceContextPropagation: true,
      experimental: true,
    },
  });

  // Get Application Insights connection string from the project
  const connectionString = await project.telemetry.getApplicationInsightsConnectionString();

  // Configure Azure Monitor tracing
  useAzureMonitor({
    azureMonitorExporterOptions: { connectionString },
    samplingRatio: 1,
    tracesPerSecond: 0,
  });

  const tracer = trace.getTracer("AgentBasicWithAzureMonitorTracing");
  const scenario = "agentBasicWithAzureMonitorTracing";

  // Create a parent span for the scenario
  const span = tracer.startSpan(scenario);
  const ctx = trace.setSpan(context.active(), span);

  await context.with(ctx, async () => {
    await withAgentVersionEndpoint(
      project,
      agentName,
      {
        kind: "prompt",
        model: deploymentName,
        instructions: "You are a helpful assistant that answers general questions",
      },
      async (agent) => {
        console.log(
          `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
        );
        const openAIClient = project.getOpenAIClient({
          azureConfig: { allowPreview: true, agentName },
        });

        // Create an empty conversation
        console.log("\nCreating conversation...");
        const conversation = await openAIClient.conversations.create({});
        console.log(`Created conversation (id: ${conversation.id})`);

        // Generate response using the agent, passing user message as input
        console.log("\nGenerating response...");
        const response = await openAIClient.responses.create({
          conversation: conversation.id,
          input: "What is the size of France in square miles?",
        });
        console.log(`Response output: ${response.output_text}`);

        // Clean up conversation
        await openAIClient.conversations.delete(conversation.id);
        console.log("Conversation deleted");
      },
    );
  });

  span.end();

  // Shut down Azure Monitor to flush all pending traces before exit
  await shutdownAzureMonitor();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
