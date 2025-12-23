// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and manage evaluation rules
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an agent, create an evaluation,
 * create a continuous evaluation rule that runs on agent response completions,
 * and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["AZURE_AI_AGENT_NAME"] || "my-eval-rule-agent";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that answers general questions",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create evaluation
  console.log("\nCreating evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Continuous Evaluation",
    data_source_config: {
      type: "azure_ai_source",
      scenario: "responses",
    },
    testing_criteria: [
      {
        type: "azure_ai_evaluator",
        name: "violence_detection",
        evaluator_name: "builtin.violence",
      },
    ],
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Create continuous evaluation rule
  console.log("\nCreating continuous evaluation rule...");
  const continuousEvalRule = await project.evaluationRules.createOrUpdate(
    "my-continuous-eval-rule",
    {
      displayName: "My Continuous Eval Rule",
      description: "An eval rule that runs on agent response completions",
      action: {
        type: "continuousEvaluation",
        evalId: evalObject.id,
        maxHourlyRuns: 100,
      },
      eventType: "responseCompleted",
      filter: {
        agentName: agent.name,
      },
      enabled: true,
    },
  );
  console.log(
    `Continuous Evaluation Rule created (id: ${continuousEvalRule.id}, name: ${continuousEvalRule.displayName})`,
  );

  // Clean up
  console.log("\nCleaning up resources...");

  await project.evaluationRules.delete(continuousEvalRule.id);
  console.log("Continuous Evaluation Rule deleted");

  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  await project.agents.delete(agent.name);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
