// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to send telemetry data using Azure Monitor OpenTelemetry with AIProjectClient.
 * It creates a new agent version while capturing telemetry data about the operation.
 * @summary Demonstrates sending telemetry data with AIProjectClient and Azure Monitor OpenTelemetry.
 */

import { useAzureMonitor, shutdownAzureMonitor } from "@azure/monitor-opentelemetry";
import type { AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";
import { SpanKind } from "@opentelemetry/api";
import "dotenv/config";

const TELEMETRY_CONNECTION_STRING = process.env["TELEMETRY_CONNECTION_STRING"] || "<YOUR_APPLICATION_INSIGHT_CONNECTION_STRING_HERE>";
const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString: TELEMETRY_CONNECTION_STRING,
  },
};

useAzureMonitor(options);

import { trace, SpanStatusCode } from "@opentelemetry/api";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"]!;
const deploymentName = process.env["DEPLOYMENT_NAME"] || "gpt-4o";

async function main(): Promise<void> {
  const tracer = trace.getTracer("azure-ai-telemetry", "1.0.0");
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  await tracer.startActiveSpan(
    "agents.createVersion sample",
    {
      kind: SpanKind.CLIENT,
      attributes: {
        // Core Gen AI attributes that the query filters on
        "gen_ai.system": "az.ai.agents", // must contain
        "gen_ai.provider.name": "microsoft.agents", // must contain
        "model": deploymentName,
        // HTTP attributes
        "http.method": "POST",
        "projectEndpoint": endpoint,
      }
    },
    async (span) => {
      try {
        // sub span for the actual operation
        const response = await tracer.startActiveSpan("agents.createVersion", { kind: SpanKind.CLIENT }, async (agentSpan) => {
          try {
            agentSpan.setAttribute("deploymentName", deploymentName);
            agentSpan.setAttribute("model", deploymentName);
            agentSpan.setAttribute("instructions", "What is the size of France in square miles?");

            const res = await project.agents.createVersion("bg-my-agent", {
              kind: "prompt",
              model: deploymentName,
              instructions: "What is the size of France in square miles?",
            });
            agentSpan.setAttribute("agent.version", res.version);
            agentSpan.setAttribute("agent.id", res.id);
            agentSpan.setAttribute("agent.name", res.name);
            agentSpan.setStatus({ code: SpanStatusCode.OK });
            return res;
          } catch (e) {
            agentSpan.setStatus({ code: SpanStatusCode.ERROR, message: String(e) });
            throw e;
          } finally {
            agentSpan.end();
          };
        });

        // Add HTTP response attributes
        span.setAttribute("http.status_code", 200);
        span.setStatus({ code: SpanStatusCode.OK });

        console.log("Response:", JSON.stringify(response, null, 2));
        return response;

      } catch (e) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: String(e) });
        span.recordException(e as Error);
        span.setAttribute("http.status_code", 500);
        throw e;
      } finally {
        span.end();
      }
    }
  );
  console.log("Telemetry sent successfully");

  await shutdownAzureMonitor();
}

// Run the application
main().catch(async (err) => {
  console.error(err);

  // Also flush on error
  const provider = (trace as any).getTracerProvider?.();
  if (provider && typeof provider.forceFlush === 'function') {
    await provider.forceFlush();
  }
  await new Promise(resolve => setTimeout(resolve, 5000));

  await shutdownAzureMonitor();
});
