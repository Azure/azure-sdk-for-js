// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates deploying a code-based Hosted Agent that discovers
 * and uses skills from a Foundry Toolbox MCP endpoint.
 *
 * The sample:
 * 1. Creates a shipping-cost skill.
 * 2. Creates a toolbox version that references the skill.
 * 3. Uploads the `toolbox-agent` code zip as a new Hosted Agent version,
 *    forwarding the project endpoint, model name, and toolbox MCP URL.
 * 4. Waits for the version to become active and routes the agent endpoint to it.
 * 5. Sends a query to the agent via the Responses API.
 * 6. Cleans up created resources (agent version, toolbox, and skill).
 *
 * The hosted agent must already exist; create it first with the
 * `createHostedAgentFromImage` sample.
 *
 * @summary Deploy a hosted agent that uses skills from a Foundry Toolbox MCP endpoint.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { createHash } = require("node:crypto");
const { readFileSync } = require("node:fs");
const path = require("node:path");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";

const codeZipPath = path.resolve(__dirname, "../assets/toolbox-agent.zip");

const skillName = "shipping-cost-skill";
const toolboxName = "toolbox_with_skill";

function sha256Hex(data) {
  return createHash("sha256").update(data).digest("hex");
}

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // ── Create a skill ────────────────────────────────────────────────────
  const skillVersion = await project.beta.skills.create(skillName, {
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
  console.log(`Created skill: ${skillVersion.name} version=${skillVersion.version}`);

  // ── Create a toolbox that references the skill ────────────────────────
  const toolboxVersion = await project.toolboxes.createVersion(
    toolboxName,
    [{ type: "toolbox_search_preview" }],
    {
      description: "Toolbox exposing a shipping-cost skill.",
      skills: [
        {
          type: "skill_reference",
          name: skillVersion.name,
          version: skillVersion.version,
        },
      ],
    },
  );
  console.log(`Created toolbox: ${toolboxVersion.name} version=${toolboxVersion.version}`);

  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${toolboxName}/versions/${toolboxVersion.version}/mcp?api-version=v1`;

  const codeZip = readFileSync(codeZipPath);
  const codeZipSha256 = sha256Hex(codeZip);

  const definition = {
    kind: "hosted",
    cpu: "0.5",
    memory: "1Gi",
    protocol_versions: [{ protocol: "responses", version: "2.0.0" }],
    code_configuration: {
      runtime: "python_3_14",
      entry_point: ["python", "main.py"],
      dependency_resolution: "remote_build",
    },
    environment_variables: {
      FOUNDRY_PROJECT_ENDPOINT: projectEndpoint,
      FOUNDRY_MODEL_NAME: modelName,
      MCP_SERVER_URL: toolboxMcpUrl,
    },
  };

  // ── Create a hosted agent version from the toolbox agent code ─────────
  const content = {
    metadata: {
      description: "Hosted agent code for toolbox MCP skills with shipping-cost skill.",
      definition,
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };
  const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  try {
    // Poll until agent version is active
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 3_000));
      const versionDetails = await project.agents.getVersion(agentName, createdVersion);
      const status = versionDetails.status;
      console.log(`Agent version status: ${status} (attempt ${attempt + 1})`);
      if (status === "active") break;
      if (status === "failed") {
        throw new Error(`Agent version provisioning failed: ${JSON.stringify(versionDetails)}`);
      }
      if (attempt === 59) {
        throw new Error("Timed out waiting for agent version to become active");
      }
    }

    // ── Route the agent endpoint to the new version ─────────────────────
    const endpointConfig = {
      version_selector: {
        version_selection_rules: [
          {
            type: "FixedRatio",
            agent_version: createdVersion,
            traffic_percentage: 100,
          },
        ],
      },
      protocol_configuration: { responses: {} },
    };
    await project.agents.updateAgent(agentName, { agentEndpoint: endpointConfig });
    console.log(`Agent endpoint configured for version ${createdVersion}`);

    // ── Invoke the agent via the OpenAI Responses API ───────────────────
    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    const userInput = "Compute the shipping cost for a 3 kg package shipped domestically.";
    console.log(`User: ${userInput}`);
    let response = await openAIClient.responses.create({ input: userInput });

    // Loading a toolbox skill goes through an MCP tool call that requires
    // approval. Approve any pending requests and resubmit until the agent
    // produces its final answer.
    for (let round = 0; round < 5; round++) {
      const approvals = [];
      for (const item of response.output) {
        if (item.type === "mcp_approval_request" && item.id) {
          console.log(`Approving MCP request: ${item.name} (id: ${item.id})`);
          approvals.push({
            type: "mcp_approval_response",
            approval_request_id: item.id,
            approve: true,
          });
        }
      }
      if (approvals.length === 0) break;
      response = await openAIClient.responses.create({
        input: approvals,
        previous_response_id: response.id,
      });
    }

    console.log("Response:");
    console.log(response.output_text);
  } finally {
    // ── Cleanup ───────────────────────────────────────────────────────────
    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Agent version ${createdVersion} deleted.`);
    await project.toolboxes.delete(toolboxName);
    console.log("Toolbox deleted");
    await project.beta.skills.delete(skillName);
    console.log("Skill deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
