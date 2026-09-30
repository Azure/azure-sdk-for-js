// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to evaluate multi-turn agent conversations by
 * filtering traces from Application Insights using an agent name/version or agent ID,
 * with optional smart filtering, using the AIProjectClient.
 *
 * This is Scenario 3 of multi-turn evaluations: instead of providing specific
 * conversation or trace IDs, you specify an agent identity and a time window. The
 * service samples traces from App Insights matching that agent and evaluates the
 * reconstructed conversations.
 *
 * Three agent filter forms are supported:
 *   - agent_name + agent_version: Specify the agent by name and version separately.
 *   - agent_id: Specify the agent as a single "name:version" string (FOUNDRY_AGENT_ID).
 *   - smart_filtering: Set FOUNDRY_SMART_FILTER=true to bias trace selection toward
 *     more interesting conversations.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Demonstrates a multi-turn trace evaluation that selects conversations by
 * filtering Application Insights traces for a given agent and time window.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) FOUNDRY_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) FOUNDRY_MODEL_NAME - Required. The model deployment name for AI-assisted evaluators.
 * 3) FOUNDRY_AGENT_NAME - Required. The name of the agent whose traces to evaluate.
 * 4) FOUNDRY_AGENT_VERSION - Optional. The agent version. If not set, latest is used.
 * 5) FOUNDRY_AGENT_ID - Optional. Agent ID in "name:version" format; overrides name/version.
 * 6) FOUNDRY_SMART_FILTER - Optional. Set to "true" to use the smart_filtering strategy.
 * 7) FOUNDRY_MAX_TRACES - Optional. Max traces to evaluate (default: 5).
 * 8) FOUNDRY_LOOKBACK_HOURS - Optional. Hours to look back (default: 24).
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";
const agentVersion = process.env["FOUNDRY_AGENT_VERSION"] || "";
const agentId = process.env["FOUNDRY_AGENT_ID"] || "";
const smartFilter = (process.env["FOUNDRY_SMART_FILTER"] || "").toLowerCase() === "true";
const maxTraces = Number(process.env["FOUNDRY_MAX_TRACES"] || "5");
const lookbackHours = Number(process.env["FOUNDRY_LOOKBACK_HOURS"] || "24");

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Eval group for trace-based evaluations uses azure_ai_source with scenario "traces".
  const dataSourceConfig = {
    type: "azure_ai_source",
    scenario: "traces",
  };

  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "customer_satisfaction",
      evaluator_name: "builtin.customer_satisfaction",
      initialization_parameters: { model: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
    {
      type: "azure_ai_evaluator",
      name: "task_completion",
      evaluator_name: "builtin.task_completion",
      initialization_parameters: { model: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
    {
      type: "azure_ai_evaluator",
      name: "conversation_coherence",
      evaluator_name: "builtin.coherence",
      initialization_parameters: { model: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
    {
      type: "azure_ai_evaluator",
      name: "groundedness",
      evaluator_name: "builtin.groundedness",
      initialization_parameters: { model: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
  ];

  console.log("Creating trace-based evaluation group...");
  const evalObject = await openAIClient.evals.create({
    name: "Multi-turn Trace Evaluation (Agent Filter)",
    data_source_config: dataSourceConfig as any,
    testing_criteria: testingCriteria as any,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Compute time window in unix seconds.
  // Pad end_time by +600s (10 min) to avoid ingestion-delay edge exclusion.
  const nowUnix = Math.floor(Date.now() / 1000);
  const endTime = nowUnix + 600;
  const startTime = nowUnix - lookbackHours * 3600;

  // Build trace_source based on mode.
  const traceSource: Record<string, unknown> = {
    type: "agent_filter",
    start_time: startTime,
    end_time: endTime,
    max_traces: maxTraces,
  };

  if (agentId) {
    // agent_id form: single "name:version" string.
    traceSource.agent_id = agentId;
    console.log(`Using agent_id filter: ${agentId}`);
  } else {
    // agent_name + agent_version form.
    traceSource.agent_name = agentName;
    if (agentVersion) {
      traceSource.agent_version = agentVersion;
    }
    console.log(`Using agent filter: ${agentName} v${agentVersion || "(latest)"}`);
  }

  if (smartFilter) {
    traceSource.filter_strategy = "smart_filtering";
    console.log("Filter strategy: smart_filtering");
  }

  // evaluation_level is the JS analog of Python's extra_body — the OpenAI client
  // forwards unknown body fields.
  console.log("\nCreating evaluation run...");
  let run = await openAIClient.evals.runs.create(evalObject.id, {
    name: "multiturn-agent-filter-run",
    data_source: { type: "azure_ai_trace_data_source", trace_source: traceSource },
    evaluation_level: "conversation",
  } as any);
  console.log(`Evaluation run created (id: ${run.id})`);

  // Poll for completion
  while (!["completed", "failed"].includes(run.status)) {
    run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evalObject.id });
    console.log(`Waiting for eval run to complete... current status: ${run.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (run.status === "completed") {
    console.log("\nEvaluation run completed successfully!");
    console.log(`Result Counts: ${JSON.stringify(run.result_counts)}`);

    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(run.id, {
      eval_id: evalObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
    console.log("-".repeat(60));
    console.log(JSON.stringify(outputItems, null, 2));
    console.log("-".repeat(60));
    console.log(`\nEval Run Report URL: ${run.report_url}`);
  } else {
    console.log("\nEvaluation run failed.");
  }

  // Clean up
  console.log("\nDeleting evaluation...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
