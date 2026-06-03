// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates uploading a code zip as a new version of a
 * code-based Hosted Agent, polling for provisioning, and downloading
 * it back to verify the round-trip.
 *
 * The dependency resolution mode is selected via the
 * `FOUNDRY_HOSTED_AGENT_REMOTE_BUILD` environment variable (default: `false`):
 *
 * - `false` (bundled) — uploads `assets/responses-echo-agent.zip`, which
 *   bundles the agent source plus pre-built dependencies so the service
 *   skips dependency installation entirely.
 * - `true` (remote_build) — uploads the same zip but instructs the service
 *   to resolve dependencies remotely from the manifest included in the zip.
 *
 * The agent must already exist; create it first with the `createHostedAgent` sample.
 *
 * @summary Upload code to an existing hosted agent, poll until active, then download and verify.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { createHash } = require("node:crypto");
const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const { buffer } = require("node:stream/consumers");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";
const useRemoteBuild =
  (process.env["FOUNDRY_HOSTED_AGENT_REMOTE_BUILD"] || "false").trim().toLowerCase() === "true";

const codeZipPath = path.resolve(__dirname, "../assets/responses-echo-agent.zip");

function sha256Hex(data) {
  return createHash("sha256").update(data).digest("hex");
}

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const dependencyResolution = useRemoteBuild ? "remote_build" : "bundled";

  const codeZip = readFileSync(codeZipPath);
  const codeZipSha256 = sha256Hex(codeZip);

  const definition = {
    kind: "hosted",
    cpu: "0.5",
    memory: "1Gi",
    protocol_versions: [{ protocol: "responses", version: "1.0.0" }],
    code_configuration: {
      runtime: "python_3_13",
      entry_point: ["python", "main.py"],
      dependency_resolution: dependencyResolution,
    },
  };

  // ── Create a new version on the existing agent ──────────────────────
  console.log(
    `Creating code-based agent version (dependency_resolution=${dependencyResolution})...`,
  );
  const content = {
    metadata: {
      description: `Code-based hosted agent uploaded with dependency_resolution=${dependencyResolution}.`,
      definition,
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };

  const created = await project.beta.agents.createVersionFromCode(
    agentName,
    codeZipSha256,
    content,
  );
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  // ── Poll until agent version is active ───────────────────────────────
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

  // ── Download the code for the version we just created ────────────────
  console.log("\nDownloading agent version code...");
  const downloadResult = await project.beta.agents.downloadAgentCode(agentName, {
    agentVersion: createdVersion,
    foundryFeatures: "CodeAgents=V1Preview",
  });

  const downloadedBytes = downloadResult.readableStreamBody
    ? new Uint8Array(await buffer(downloadResult.readableStreamBody))
    : downloadResult.blobBody
      ? new Uint8Array(await (await downloadResult.blobBody).arrayBuffer())
      : undefined;

  if (downloadedBytes) {
    const downloadedSha256 = sha256Hex(downloadedBytes);
    const downloadPath = path.join(__dirname, `${agentName}-${createdVersion}.zip`);
    writeFileSync(downloadPath, downloadedBytes);
    console.log(
      `Downloaded version code zip to ${downloadPath}: ${downloadedBytes.length} bytes, ` +
        `sha256=${downloadedSha256} (matches uploaded: ${downloadedSha256 === codeZipSha256})`,
    );
  } else {
    console.warn("No content found in the downloaded agent code.");
  }

  console.log("\nSample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
