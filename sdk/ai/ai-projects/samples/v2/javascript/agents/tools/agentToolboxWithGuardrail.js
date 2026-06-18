// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an agent that uses a toolbox with a guardrail (RAI policy).
 * The toolbox is configured with a web_search tool and an RAI policy that filters responses.
 *
 * @summary Create an agent with a toolbox that has a guardrail (RAI policy) applied.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const raiPolicyName =
  process.env["RAI_POLICY_NAME"] ||
  "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.CognitiveServices/accounts/<account-name>/raiPolicies/<policy-name>";

async function main() {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  console.log("Creating toolbox with guardrail (RAI policy)...");
  const toolboxVersion = await project.toolboxes.createVersion(
    "my-toolbox",
    [{ type: "web_search" }],
    {
      description: "Toolbox with guardrail",
      policies: {
        rai_config: {
          rai_policy_name: raiPolicyName,
        },
      },
    },
  );
  console.log(`Toolbox version created: ${toolboxVersion.version}`);

  console.log("\nCreating agent with deferred MCP tool and tool_search...");
  const token = (await credential.getToken("https://ai.azure.com/.default")).token;
  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/my-toolbox/versions/${toolboxVersion.version}/mcp?api-version=v1`;

  const agent = await project.agents.createVersion("MyGuardrailAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant. Use web search when needed to answer questions.",
    tools: [
      {
        type: "mcp",
        server_label: "my-toolbox",
        server_url: toolboxMcpUrl,
        authorization: token,
        headers: { "Foundry-Features": "Toolboxes=V1Preview" },
        require_approval: "never",
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending request to the agent...");
  try {
    const response = await openAIClient.responses.create(
      {
        input: "What are the latest developments in responsible AI?",
      },
      {
        body: {
          agent_reference: { name: agent.name, type: "agent_reference" },
        },
      },
    );
    console.log(`\nResponse output: ${response.output_text}`);
  } catch (e) {
    if (e.status === 400 && e.message?.includes("blocked by policy: RAI")) {
      console.log("\nThe RAI guardrail blocked the tool call as expected.");
      console.log(`Details: ${e.message}`);
    } else {
      throw e;
    }
  }

  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  await project.toolboxes.deleteVersion("my-toolbox", toolboxVersion.version);
  console.log("Agent and toolbox deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
