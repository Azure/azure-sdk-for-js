// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample creates a Toolbox version that exposes a Reminder Preview tool
 * over a Foundry Toolbox MCP endpoint, then uploads the `toolbox-agent` code as
 * a new Hosted Agent version. It waits for the version to become active, routes
 * the Hosted Agent endpoint to that version, sends a reminder request through
 * the Responses API, queries routines to find the service-created one-shot
 * routine, and finally restores the previous endpoint and deletes the temporary
 * agent version and toolbox.
 *
 * The hosted agent must already exist; create it first with the
 * `createHostedAgentFromImage` sample.
 *
 * @summary Deploy a hosted agent that uses a Reminder Preview tool from a
 * Foundry Toolbox MCP endpoint.
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

const toolboxName = "toolbox_with_reminder_preview";

function sha256Hex(data) {
  return createHash("sha256").update(data).digest("hex");
}

async function listRoutineNames(project) {
  const names = new Set();
  for await (const routine of project.beta.routines.list()) {
    if (routine.name) {
      names.add(routine.name);
    }
  }
  return names;
}

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // ── Create a toolbox exposing a reminder preview tool ─────────────────
  try {
    await project.toolboxes.delete(toolboxName);
  } catch {
    // ignore 404
  }

  const toolboxVersion = await project.toolboxes.createVersion(
    toolboxName,
    [
      {
        type: "reminder_preview",
        name: "reminder",
        description: "Schedule a reminder to re-invoke the agent after a short delay.",
      },
    ],
    {
      description: "Toolbox exposing a reminder preview tool.",
      metadata: { enableVnextExperience: "true" },
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
    protocol_versions: [
      { protocol: "responses", version: "2.0.0" },
      { protocol: "invocations", version: "2.0.0" },
    ],
    code_configuration: {
      runtime: "python_3_13",
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
      description: "Hosted agent code for toolbox MCP reminder preview tool.",
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

    const routinesBefore = await listRoutineNames(project);

    const userInput = "Use the reminder tool to remind me in 1 minute to check the coffee.";
    console.log(`User: ${userInput}`);
    const response = await openAIClient.responses.create({ input: userInput });
    console.log("Response:");
    console.log(response.output_text ?? "");

    // The reminder tool schedules a service-created one-shot routine. Poll the
    // routine list to find any routine created since the request was sent.
    console.log("Routines after scheduling the reminder:");
    let createdRoutineNames = new Set();
    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      const routinesAfter = await listRoutineNames(project);
      createdRoutineNames = new Set([...routinesAfter].filter((n) => !routinesBefore.has(n)));
      if (createdRoutineNames.size > 0) break;
      console.log("No new routine found yet; checking again shortly...");
      await new Promise((resolve) => setTimeout(resolve, 5_000));
    }

    if (createdRoutineNames.size > 0) {
      console.log("Retrieved new routine details:");
      for (const routineName of [...createdRoutineNames].sort()) {
        const routine = await project.beta.routines.get(routineName);
        console.log(
          `  - ${routine.name} enabled=${routine.enabled} description=${JSON.stringify(routine.description)}`,
        );
      }
    } else {
      console.log(
        "No new routine was visible in project.beta.routines.list() after scheduling the reminder.",
      );
    }

    // ── Cleanup the temporary hosted agent version ──────────────────────
    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Agent version ${createdVersion} deleted.`);
  } finally {
    await project.toolboxes.delete(toolboxName);
    console.log("Toolbox deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
