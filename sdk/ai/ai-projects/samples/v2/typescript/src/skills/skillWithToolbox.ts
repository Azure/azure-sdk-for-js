// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to expose a Skill to a Prompt Agent via a
 * Toolbox, using the AIProjectClient and the OpenAI-compatible client.
 *
 * It creates a Skill with inline content describing how to compute shipping
 * cost, then creates a Toolbox version that references the skill. A Prompt
 * Agent is created with an `MCPTool` pointed at the toolbox's versioned
 * `/mcp` endpoint. The skill's instructions are injected into the agent's
 * context, so when asked a shipping-cost question the agent answers directly
 * using the skill's formula.
 *
 * Skills and Toolboxes are currently preview features. In the JS SDK, you
 * access these operations via `project.beta.skills` and
 * `project.toolboxes`.
 *
 * @summary Demonstrates adding a skill to a toolbox and invoking it via a Prompt Agent.
 */

import type { MCPTool, ToolboxSkillReference } from "@azure/ai-projects";
import { AIProjectClient, RestError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

const SKILL_NAME = "shipping-cost-skill";
const TOOLBOX_NAME = "toolbox_with_skill";
const AGENT_NAME = "SkillToolboxAgent";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  // --- Clean up any prior runs ---
  try {
    await project.toolboxes.delete(TOOLBOX_NAME);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) throw e;
  }
  try {
    await project.beta.skills.delete(SKILL_NAME);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) throw e;
  }

  // --- 1. Create a skill ---
  const skill = await project.beta.skills.create(SKILL_NAME, {
    inlineContent: {
      description: "Compute shipping cost for a package given weight and destination.",
      instructions:
        "You are a shipping cost calculator. When asked to compute " +
        "shipping cost, use this formula: cost (USD) = 5 + 2 * weight_kg " +
        "for domestic destinations, and cost (USD) = 15 + 4 * weight_kg " +
        "for international destinations. Always state the formula you used.",
      metadata: { revision: "1" },
    },
  });
  console.log(`Created skill: ${skill.name} version=${skill.version}`);

  // --- 2. Create a toolbox version with toolbox_search_preview and the skill ---
  const skillRef: ToolboxSkillReference = {
    type: "skill_reference",
    name: skill.name,
    version: skill.version,
  };

  const toolboxVersion = await project.toolboxes.createVersion(
    TOOLBOX_NAME,
    [{ type: "toolbox_search_preview" }],
    {
      description: "Toolbox exposing a shipping-cost skill.",
      skills: [skillRef],
    },
  );
  console.log(`Created toolbox: ${toolboxVersion.name} version=${toolboxVersion.version}`);

  // --- 3. Build the MCP tool reference to the toolbox endpoint ---
  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${TOOLBOX_NAME}/versions/${toolboxVersion.version}/mcp?api-version=v1`;
  const token = (await credential.getToken("https://ai.azure.com/.default"))!.token;

  const toolboxMcpTool: MCPTool = {
    type: "mcp",
    server_label: "skill-toolbox",
    server_url: toolboxMcpUrl,
    authorization: token,
    require_approval: "never",
  };

  // --- 4. Create a prompt agent with the toolbox MCP tool ---
  const agent = await project.agents.createVersion(AGENT_NAME, {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "Answer the user using the `shipping-cost-skill` instructions " +
      "available in your context. Do not call `tool_search`; the " +
      "skill rules are already part of your knowledge. Apply the " +
      "skill's formula exactly as given and state the formula in " +
      "your answer.",
    temperature: 0,
    tools: [toolboxMcpTool],
  });
  console.log(`Agent created (id=${agent.id}, name=${agent.name}, version=${agent.version})`);

  // --- 5. Send a query ---
  const userInput = "Compute the shipping cost for a 3 kg package shipped domestically.";
  console.log(`User: ${userInput}`);

  const response = await openAIClient.responses.create(
    { input: userInput },
    {
      body: {
        agent_reference: { name: agent.name, type: "agent_reference" },
      },
    },
  );

  for (const item of response.output) {
    if (item.type === "mcp_list_tools") {
      console.log(
        `mcp_list_tools server_label=${item.server_label} tools=${(item.tools || []).map((t: any) => t.name)}`,
      );
    } else if (item.type === "mcp_call") {
      console.log(
        `mcp_call server_label=${item.server_label} name=${item.name} error=${item.error}`,
      );
      if ("output" in item && item.output) {
        console.log(`  output: ${item.output}`);
      }
    } else if (item.type === "mcp_approval_request") {
      console.log(`mcp_approval_request server_label=${item.server_label} name=${item.name}`);
    } else {
      console.log(`output item type=${item.type}`);
    }
  }

  console.log(`Response: ${response.output_text}`);

  // --- 6. Clean up ---
  await project.toolboxes.delete(TOOLBOX_NAME);
  console.log("Toolbox deleted");
  await project.beta.skills.delete(SKILL_NAME);
  console.log("Skill deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
