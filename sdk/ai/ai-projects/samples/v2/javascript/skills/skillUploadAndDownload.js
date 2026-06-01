// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates uploading and downloading a skill package using
 * the AIProjectClient.
 *
 * 1) Delete an existing skill with the same name (if it exists).
 * 2) Upload a package with `createFromPackage(...)`.
 * 3) Retrieve the uploaded skill with `get(...)`.
 * 4) Download the package with `download(...)` to a temp folder.
 * 5) Delete the uploaded skill.
 *
 * Skills are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.skills`.
 *
 * @summary Demonstrates uploading and downloading a skill package.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { RestError } = require("@azure/core-rest-pipeline");
const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const { buffer } = require("node:stream/consumers");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const skillName = "canvas-design";
const skillFilePath = path.resolve(__dirname, "../assets/canvas-design.zip");
const downloadFolder = path.dirname(skillFilePath);

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Clean up any existing skill with this name
  try {
    await project.beta.skills.delete(skillName);
    console.log(`Skill \`${skillName}\` deleted`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }

  // Upload a skill package
  const packageBytes = readFileSync(skillFilePath);
  const imported = await project.beta.skills.createFromPackage(packageBytes);
  console.log(
    `Imported skill from package: ${imported.name} (${imported.skill_id}) has_blob=${imported.has_blob}`,
  );

  // Retrieve the uploaded skill
  const fetched = await project.beta.skills.get(imported.name);
  console.log(
    `Fetched imported skill: ${fetched.name} (${fetched.skill_id}) has_blob=${fetched.has_blob}`,
  );

  // Download the skill package
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const downloadPath = path.join(downloadFolder, `${fetched.name}_${timestamp}.zip`);
  const downloadResult = await project.beta.skills.download(fetched.name);

  const content = downloadResult.readableStreamBody
    ? new Uint8Array(await buffer(downloadResult.readableStreamBody))
    : downloadResult.blobBody
      ? new Uint8Array(await (await downloadResult.blobBody).arrayBuffer())
      : undefined;

  if (content) {
    writeFileSync(downloadPath, content);
    console.log(`Downloaded skill package path: ${downloadPath}`);
  } else {
    console.warn("No content found in the downloaded skill package.");
  }

  // Delete the uploaded skill
  const deleteResult = await project.beta.skills.delete(fetched.name);
  console.log(`Deleted imported skill: ${deleteResult.name} (deleted: ${deleteResult.deleted})`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
