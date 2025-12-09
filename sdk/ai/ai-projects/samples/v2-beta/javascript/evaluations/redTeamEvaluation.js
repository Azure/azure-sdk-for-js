// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform red team evaluation on an Azure AI agent
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an agent, define testing criteria
 * for red teaming, create evaluation taxonomies, run red teaming evaluation,
 * and clean up resources.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) AZURE_AI_AGENT_NAME - Required. The name of the Agent to perform red teaming evaluation on.
 * 3) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for the agent.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const path = require("path");
const fs = require("fs");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["AZURE_AI_AGENT_NAME"] || "my-red-team-agent";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

// Construct the paths to the data folder
const dataFolder = "./data_folder";

/**
 * Helper function to get agent safety evaluation criteria
 */
function getAgentSafetyEvaluationCriteria() {
  return [
    {
      type: "azure_ai_evaluator",
      name: "Prohibited Actions",
      evaluator_name: "builtin.prohibited_actions",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Task Adherence",
      evaluator_name: "builtin.task_adherence",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Sensitive Data Leakage",
      evaluator_name: "builtin.sensitive_data_leakage",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Self Harm",
      evaluator_name: "builtin.self_harm",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Violence",
      evaluator_name: "builtin.violence",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Sexual",
      evaluator_name: "builtin.sexual",
      evaluator_version: "1",
    },
    {
      type: "azure_ai_evaluator",
      name: "Hate Unfairness",
      evaluator_name: "builtin.hate_unfairness",
      evaluator_version: "1",
    },
  ];
}

/**
 * Helper function to extract tool descriptions from an agent version
 */
function getToolDescriptions(agent) {
  const tools = agent.definition?.tools || [];
  const toolDescriptions = [];

  for (const tool of tools) {
    if (tool.type === "openapi") {
      toolDescriptions.push({
        name: tool.openapi?.name || "Unnamed Tool",
        description: tool.openapi?.description || "No description provided",
      });
    } else {
      toolDescriptions.push({
        name: tool.name || "Unnamed Tool",
        description: tool.description || "No description provided",
      });
    }
  }

  return toolDescriptions;
}

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  try {
    // Create agent
    console.log("Creating agent...");
    const agentVersion = await project.agents.createVersion(agentName, {
      kind: "prompt",
      model: modelDeploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    });
    console.log(
      `Agent created (id: ${agentVersion.id}, name: ${agentVersion.name}, version: ${agentVersion.version})`,
    );

    // Create evaluation group and run names
    const evalGroupName = `Red Team Agent Safety Evaluation - ${Date.now()}`;
    const evalRunName = `Red Team Agent Safety Eval Run for ${agentName} - ${Date.now()}`;
    const dataSourceConfig = { type: "azure_ai_source", scenario: "red_team" };

    // Define testing criteria for red teaming
    const testingCriteria = getAgentSafetyEvaluationCriteria();
    console.log("Defining testing criteria for red teaming for agent target");
    console.log(JSON.stringify(testingCriteria, null, 2));

    // Create red teaming evaluation
    console.log("\nCreating red teaming evaluation");
    const evalObject = await openAIClient.evals.create({
      name: evalGroupName,
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria,
    });
    console.log(`Evaluation created for red teaming: ${evalGroupName}`);

    // Get evaluation by ID
    console.log(`\nGet evaluation by Id: ${evalObject.id}`);
    const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
    console.log("Evaluation Response:");
    console.log(JSON.stringify(evalObjectResponse, null, 2));

    // Define risk categories for taxonomy
    const riskCategoriesForTaxonomy = ["ProhibitedActions"];

    // Define agent target
    const target = {
      type: "azure_ai_agent",
      name: agentName,
      version: agentVersion.version,
      tool_descriptions: getToolDescriptions(agentVersion),
    };

    // Create agent taxonomy input
    const agentTaxonomyInput = {
      type: "agent",
      riskCategories: riskCategoriesForTaxonomy,
      target: target,
    };

    // Create evaluation taxonomy
    console.log("\nCreating Eval Taxonomies");
    const evaluationTaxonomyInput = {
      name: agentName,
      version: "1",
      description: "Taxonomy for red teaming evaluation",
      taxonomyInput: agentTaxonomyInput,
    };

    const taxonomy = await project.evaluationTaxonomies.create(agentName, evaluationTaxonomyInput);

    // Create the data folder if it doesn't exist
    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder, { recursive: true });
    }

    const taxonomyPath = path.join(dataFolder, `taxonomy_${agentName}.json`);
    fs.writeFileSync(taxonomyPath, JSON.stringify(taxonomy, null, 2));
    console.log(
      `Red teaming Taxonomy created for agent: ${agentName}. Taxonomy written to ${taxonomyPath}`,
    );

    // Create red teaming evaluation run
    console.log("\nCreating red teaming Eval Run");
    const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
      name: evalRunName,
      data_source: {
        type: "azure_ai_red_team",
        item_generation_params: {
          type: "red_team_taxonomy",
          attack_strategies: ["Flip", "Base64"],
          num_turns: 5,
          source: { type: "file_id", id: taxonomy.id || "" },
        },
        target: target,
      },
    });

    console.log(`Eval Run created for red teaming: ${evalRunName}`);
    console.log(JSON.stringify(evalRunObject, null, 2));

    // Get evaluation run by ID
    console.log(`\nGet Eval Run by Id: ${evalRunObject.id}`);
    let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Eval Run Response:");
    console.log(JSON.stringify(evalRunResponse, null, 2));

    // Poll for completion
    while (!["completed", "failed"].includes(evalRunResponse.status)) {
      evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
        eval_id: evalObject.id,
      });
      console.log(`Waiting for eval run to complete... ${evalRunResponse.status}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Get output items when run completes
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalRunResponse.id, {
      eval_id: evalObject.id,
    })) {
      outputItems.push(item);
    }

    const outputItemsPath = path.join(dataFolder, `redteam_eval_output_items_${agentName}.json`);
    fs.writeFileSync(outputItemsPath, JSON.stringify(outputItems, null, 2));
    console.log(
      `\nRedTeam Eval Run completed with status: ${evalRunResponse.status}. Output items written to ${outputItemsPath}`,
    );

    // Clean up
    console.log("\nDeleting evaluation");
    await openAIClient.evals.delete(evalObject.id);
    console.log("Evaluation deleted");

    console.log("\nDeleting agent");
    await project.agents.delete(agentName);
    console.log("Agent deleted");
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
