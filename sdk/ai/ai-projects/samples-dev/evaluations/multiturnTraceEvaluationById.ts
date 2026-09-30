// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to evaluate multi-turn conversations captured as
 * agent traces in Application Insights, using specific conversation IDs or trace IDs
 * to select which conversations to evaluate, with the AIProjectClient.
 *
 * This is Scenario 2 of multi-turn evaluations: you provide known conversation or
 * trace identifiers, and the service reconstructs the messages from App Insights
 * traces, then runs conversation-level evaluators against them.
 *
 * Two modes are supported:
 *   - conversation_id_source: Provide Foundry conversation IDs.
 *   - trace_id_source: Provide W3C trace IDs (operation_Id from App Insights).
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Demonstrates a multi-turn trace evaluation over conversations selected by
 * conversation ID or trace ID from Application Insights.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) FOUNDRY_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) FOUNDRY_MODEL_NAME - Required. The model deployment name for AI-assisted evaluators.
 * 3) FOUNDRY_CONVERSATION_IDS - Required (for conversation_id mode). Comma-separated Foundry
 *    conversation IDs to evaluate. Example: "conv_abc123,conv_def456,conv_ghi789".
 * 4) FOUNDRY_TRACE_IDS - Optional (for trace_id mode). Comma-separated W3C trace IDs.
 *    If set, overrides conversation IDs.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

// Choose one: conversation IDs or trace IDs
const conversationIdsStr = process.env["FOUNDRY_CONVERSATION_IDS"] || "";
const traceIdsStr = process.env["FOUNDRY_TRACE_IDS"] || "";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Eval group for trace-based evaluations uses azure_ai_source with scenario "traces".
  const dataSourceConfig = {
    type: "azure_ai_source",
    scenario: "traces",
  };

  // Conversation-level evaluators for trace data.
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
    name: "Multi-turn Trace Evaluation (by ID)",
    data_source_config: dataSourceConfig as any,
    testing_criteria: testingCriteria as any,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Build the data source based on which IDs are provided.
  let traceSource: Record<string, unknown>;
  if (traceIdsStr) {
    // Trace ID mode — provide W3C trace IDs (operation_Id from App Insights).
    const traceIds = traceIdsStr
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    console.log(`Using ${traceIds.length} trace IDs`);
    traceSource = { type: "trace_id_source", trace_ids: traceIds };
  } else {
    // Conversation ID mode — provide Foundry conversation IDs.
    const conversationIds = conversationIdsStr
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c);
    if (conversationIds.length === 0) {
      throw new Error(
        "Set FOUNDRY_CONVERSATION_IDS or FOUNDRY_TRACE_IDS. " +
          "These are IDs from prior agent interactions captured in App Insights.",
      );
    }
    console.log(`Using ${conversationIds.length} conversation IDs`);
    traceSource = { type: "conversation_id_source", conversation_ids: conversationIds };
  }

  // Create run with evaluation_level = "conversation". evaluation_level is the JS analog
  // of Python's extra_body — the OpenAI client forwards unknown body fields.
  console.log("\nCreating evaluation run...");
  let run = await openAIClient.evals.runs.create(evalObject.id, {
    name: "multiturn-trace-by-id-run",
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
