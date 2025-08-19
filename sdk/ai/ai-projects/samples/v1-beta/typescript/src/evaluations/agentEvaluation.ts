// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to create an agent evaluation using the Azure AI Projects SDK.
 */

import { AIProjectClient, EvaluatorIds, AgentEvaluationRequest } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  // create an agent evaluation
  const agent = await project.agents.createAgent("gpt-4o", {
    name: "agent-evaluation-test",
    instructions: "You are helpful agent",
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  const thread = await project.agents.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);
  const message = await project.agents.messages.create(thread.id, "user", "Hello, tell me a joke");
  console.log(`Created message, message ID: ${message.id}`);
  // Create and poll a run
  console.log("Creating run...");
  const run = await project.agents.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  const agentEvaluationRequest: AgentEvaluationRequest = {
    runId: run.id,
    threadId: thread.id,
    evaluators: {
      violence: {
        id: EvaluatorIds.VIOLENCE,
      },
    },
    samplingConfiguration: {
      name: "test",
      samplingPercent: 100,
      maxRequestRate: 100,
    },
    redactionConfiguration: {
      redactScoreProperties: false,
    },
    appInsightsConnectionString: await project.telemetry.getConnectionString(),
  };

  const agentEvaluationResponse =
    await project.evaluations.createAgentEvaluation(agentEvaluationRequest);
  console.log(`Created agent evaluation, evaluation ID: ${agentEvaluationResponse.id}`);
}

main().catch((err) => {
  console.error("An error occurred:", err);
});
