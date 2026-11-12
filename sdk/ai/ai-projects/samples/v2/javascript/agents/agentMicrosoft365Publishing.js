// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieve Microsoft 365 publishing defaults,
 * generate a Microsoft Teams app package, and publish an existing Foundry agent.
 *
 * The agent must already exist. Some workspaces also require the Azure Bot Service
 * resource ID in `FOUNDRY_AGENT_BOT_SERVICE_ARM_ID`.
 *
 * @summary Generate and publish a Microsoft 365 app package for an existing Foundry agent.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { writeFile } = require("node:fs/promises");
const path = require("node:path");
const { buffer } = require("node:stream/consumers");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";
const botServiceArmId = process.env["FOUNDRY_AGENT_BOT_SERVICE_ARM_ID"];
const publishScope = "Personal";

function createPublishOptions(defaults) {
  return {
    agentDisplayName: defaults.agentDisplayName ?? agentName,
    botServiceArmId: defaults.botServiceArmId ?? botServiceArmId,
    appVersion: defaults.recommendedNextAppVersion ?? "1.0.0",
    shortDescription: defaults.shortDescription ?? "A Foundry agent for Microsoft Teams.",
    fullDescription:
      defaults.fullDescription ?? "A Foundry agent published to Microsoft 365 and Microsoft Teams.",
    developerName: defaults.developerName ?? "Contoso",
    developerWebsiteUrl: defaults.developerWebsiteUrl ?? "https://www.contoso.com",
    privacyUrl: defaults.privacyUrl ?? "https://www.contoso.com/privacy",
    termsOfUseUrl: defaults.termsOfUseUrl ?? "https://www.contoso.com/terms",
  };
}

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log(`Getting Microsoft 365 publishing defaults for agent "${agentName}"...`);
  const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);
  const publishOptions = createPublishOptions(defaults);
  console.log(`Using publish scope: ${publishScope}`);

  console.log("Generating the Microsoft Teams app package...");
  const appPackage = await project.agents.getMicrosoft365Package(
    agentName,
    publishScope,
    publishOptions,
  );
  const packageBytes = appPackage.readableStreamBody
    ? new Uint8Array(await buffer(appPackage.readableStreamBody))
    : appPackage.blobBody
      ? new Uint8Array(await (await appPackage.blobBody).arrayBuffer())
      : undefined;

  if (!packageBytes) {
    throw new Error("The service did not return a Microsoft Teams app package.");
  }

  const packagePath = path.resolve("microsoft365-agent-app.zip");
  await writeFile(packagePath, packageBytes);
  console.log(`Saved the Microsoft Teams app package to ${packagePath}`);

  console.log("Publishing the agent to Microsoft 365...");
  const published = await project.agents.publishToMicrosoft365(
    agentName,
    publishScope,
    publishOptions,
  );
  console.log(`Microsoft 365 title ID: ${published.titleId ?? "<not returned>"}`);
  console.log(`Microsoft Teams app ID: ${published.teamsAppId ?? "<not returned>"}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
