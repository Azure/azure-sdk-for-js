// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to enable telemetry for AIAgentClient at local development.
 */

import { trace, context } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});

provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

export async function main(): Promise<void> {
  const tracer = trace.getTracer("agents-basic-sample", "0.1.0");

  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const runResponse = await tracer.startActiveSpan("basicMessages", async (span) => {
    // Create an agent
    const agent = await client.createAgent(modelDeploymentName, {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID : ${agent.id}`);

    // Create a thread
    const thread = await client.threads.create();
    console.log(`Created thread, thread ID : ${thread.id}`);

    // Create a message
    const message = await client.messages.create(thread.id, "user", "Hello, tell me a joke");
    console.log(`Created message, message ID : ${message.id}`);

    // Create and poll a run
    console.log("Creating run...");
    const run = await tracer.startActiveSpan("createAndPoll", async (pollSpan) => {
      try {
        const result = await client.runs.createAndPoll(thread.id, agent.id, {
          tracingOptions: {
            tracingContext: context.active(),
          },
          pollingOptions: {
            intervalInMs: 2000,
          },
          onResponse: (response): void => {
            const parsedBody =
              typeof response.parsedBody === "object" && response.parsedBody !== null
                ? response.parsedBody
                : null;
            const status = parsedBody && "status" in parsedBody ? parsedBody.status : "unknown";
            console.log(`Received response with status: ${status}`);
          },
        });
        pollSpan.setAttribute("run.status", result.status);
        pollSpan.setAttribute("run.id", result.id);
        return result;
      } finally {
        pollSpan.end();
      }
    });
    console.log(`Run finished with status: ${run.status}`);

    // Delete agent
    await client.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
    span.end();
    return run;
  });

  console.log("run response = ", JSON.stringify(runResponse, null, 2));
}

main().catch((err) => {
  console.error("Error running sample:", err);
});
