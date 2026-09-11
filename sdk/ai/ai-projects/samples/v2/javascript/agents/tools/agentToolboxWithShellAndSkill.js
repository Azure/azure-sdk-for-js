// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to put a shell tool and an inline Skill in a
 * Toolbox and use them with a Prompt Agent. The Skill instructs the shell to
 * print "Welcome to shell tool" before reporting the Python version and the
 * working-directory contents of its auto-provisioned, network-isolated container.
 *
 * The sample downloads the persisted Skill's `SKILL.md` into the Prompt Agent
 * instructions. The agent reaches the shell through an `MCPTool` pointed at
 * the Toolbox's versioned `/mcp` URL. The sample prints the tools exposed by
 * the MCP server, each shell command's arguments and output, and the agent's
 * final response.
 *
 * @summary Create an agent that uses a shell tool and an inline skill from a Foundry Toolbox.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { RestError } = require("@azure/core-rest-pipeline");
const { inflateRawSync } = require("node:zlib");
const { buffer } = require("node:stream/consumers");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

const SKILL_NAME = "sandbox-environment-inspection";
const TOOLBOX_NAME = "toolbox_with_shell_tool";
const TOOLBOX_MCP_LABEL = "shell-toolbox";

/** Delete a resource, ignoring a 404 when it does not exist yet. */
async function deleteIfExists(label, remove) {
  try {
    await remove();
    console.log(`Deleted ${label}`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }
}

/**
 * Read a single entry out of a zip archive. Node has no built-in zip reader, so
 * this walks the central directory to locate the entry and inflates its bytes.
 */
function readZipEntry(zip, entryName) {
  // Locate the End Of Central Directory record by scanning backwards for its signature.
  let eocd = -1;
  for (let i = zip.length - 22; i >= 0; i--) {
    if (zip.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) {
    throw new Error("Not a valid zip archive: no end-of-central-directory record.");
  }

  const entryCount = zip.readUInt16LE(eocd + 10);
  let pointer = zip.readUInt32LE(eocd + 16);

  for (let i = 0; i < entryCount; i++) {
    const nameLength = zip.readUInt16LE(pointer + 28);
    const extraLength = zip.readUInt16LE(pointer + 30);
    const commentLength = zip.readUInt16LE(pointer + 32);
    const name = zip.toString("utf8", pointer + 46, pointer + 46 + nameLength);

    if (name === entryName) {
      const compressionMethod = zip.readUInt16LE(pointer + 10);
      const compressedSize = zip.readUInt32LE(pointer + 20);
      const localHeader = zip.readUInt32LE(pointer + 42);

      // The local header repeats the name/extra lengths; file data follows them.
      const localNameLength = zip.readUInt16LE(localHeader + 26);
      const localExtraLength = zip.readUInt16LE(localHeader + 28);
      const dataStart = localHeader + 30 + localNameLength + localExtraLength;
      const data = zip.subarray(dataStart, dataStart + compressedSize);

      // 0 = stored, 8 = deflate. Anything else is unexpected for a skill package.
      if (compressionMethod === 0) return data.toString("utf8");
      if (compressionMethod === 8) return inflateRawSync(data).toString("utf8");
      throw new Error(`Unsupported zip compression method ${compressionMethod} for ${entryName}.`);
    }

    pointer += 46 + nameLength + extraLength + commentLength;
  }

  throw new Error(`Entry \`${entryName}\` not found in the skill package.`);
}

async function main() {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  // Clear out anything left over from a previous run.
  await deleteIfExists(`pre-existing toolbox \`${TOOLBOX_NAME}\``, () =>
    project.toolboxes.delete(TOOLBOX_NAME),
  );
  await deleteIfExists(`pre-existing skill \`${SKILL_NAME}\``, () =>
    project.beta.skills.delete(SKILL_NAME),
  );

  // ── Create an inline skill describing how to inspect the sandbox ──────
  const skillVersion = await project.beta.skills.create(SKILL_NAME, {
    inlineContent: {
      description: "Inspect the runtime environment of a sandboxed shell container.",
      instructions:
        "When asked to inspect the sandbox environment, first run " +
        "`printf 'Welcome to shell tool\\n'` with the shell tool. Then run the relevant " +
        "commands. For Python version and working-directory contents, run " +
        "`python --version`, `pwd`, and `ls -la`. Report the exact command output.",
    },
  });
  console.log(`Created skill \`${skillVersion.name}\` (version ${skillVersion.version}).`);

  try {
    // ── Download the persisted skill and pull SKILL.md out of the package ──
    const download = await project.beta.skills.downloadVersion(
      skillVersion.name,
      skillVersion.version,
    );
    const skillArchive = download.readableStreamBody
      ? await buffer(download.readableStreamBody)
      : Buffer.from(await (await download.blobBody).arrayBuffer());
    const skillInstructions = readZipEntry(skillArchive, "SKILL.md");
    console.log(
      `Loaded instructions from skill \`${skillVersion.name}\` version ${skillVersion.version}.`,
    );

    // ── Create a toolbox holding the shell tool and referencing the skill ──
    const shellTool = {
      type: "shell",
      name: "shell",
      description: "Runs shell commands in a sandboxed container.",
      environment: { type: "container_auto" },
    };
    const skillSearchTool = {
      type: "toolbox_search",
      name: "skill_search",
    };

    const toolboxVersion = await project.toolboxes.createVersion(
      TOOLBOX_NAME,
      [shellTool, skillSearchTool],
      {
        description: "Toolbox with a shell tool and an environment-inspection skill.",
        skills: [
          {
            type: "skill_reference",
            name: skillVersion.name,
            version: skillVersion.version,
          },
        ],
      },
    );
    console.log(`Created toolbox \`${TOOLBOX_NAME}\` (version ${toolboxVersion.version}).`);

    // ── Point an MCP tool at the toolbox's versioned /mcp endpoint ─────────
    const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${TOOLBOX_NAME}/versions/${toolboxVersion.version}/mcp?api-version=v1`;
    const token = (await credential.getToken("https://ai.azure.com/.default")).token;

    const toolboxMcpTool = {
      type: "mcp",
      server_label: TOOLBOX_MCP_LABEL,
      server_url: toolboxMcpUrl,
      authorization: token,
      require_approval: "never",
    };

    // ── Create a prompt agent that follows the downloaded skill ────────────
    const agent = await project.agents.createVersion(agentName, {
      kind: "prompt",
      model: modelName,
      instructions:
        "You have a shell tool that runs commands in a sandboxed container with no " +
        "network access. Follow the loaded skill instructions below and report the exact " +
        `command output back to the user.\n\n${skillInstructions}`,
      tools: [toolboxMcpTool],
    });
    console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

    try {
      const response = await openAIClient.responses.create(
        {
          input:
            "Use the sandbox environment inspection skill to determine which Python version " +
            "is installed and what is in the working directory.",
        },
        {
          body: { agent_reference: { name: agent.name, type: "agent_reference" } },
        },
      );

      for (const item of response.output) {
        if (item.type === "mcp_list_tools") {
          const toolNames = (item.tools ?? []).map((tool) => tool.name);
          console.log(`server_label=${item.server_label}, tools=${JSON.stringify(toolNames)}`);
        } else if (item.type === "mcp_call") {
          console.log(`server_label=${item.server_label}, name=${item.name}, error=${item.error}`);
          console.log(`  arguments: ${item.arguments}`);
          console.log(`  output: ${item.output}`);
        }
      }

      console.log(`\nResponse: ${response.output_text}`);
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
      console.log("\nAgent deleted");
    }
  } finally {
    // ── Cleanup ───────────────────────────────────────────────────────────
    await deleteIfExists(`toolbox \`${TOOLBOX_NAME}\``, () =>
      project.toolboxes.delete(TOOLBOX_NAME),
    );
    await deleteIfExists(`skill \`${SKILL_NAME}\``, () => project.beta.skills.delete(SKILL_NAME));
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
