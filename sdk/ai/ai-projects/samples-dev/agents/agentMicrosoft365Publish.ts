// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use Microsoft 365 publish APIs for an existing agent endpoint.
 *
 * @summary This sample gets publish defaults, generates a Teams package zip, and optionally publishes to Microsoft 365.
 *
 * @azsdk-weight 100
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";
type Microsoft365PublishScope = "Personal" | "Shared" | "Tenant";
const publishScope = (process.env["FOUNDRY_M365_PUBLISH_SCOPE"] ||
  "Personal") as Microsoft365PublishScope;
const publishEnabled = process.env["FOUNDRY_M365_PUBLISH_ENABLED"] === "true";

export async function main(): Promise<void> {
  console.log("Creating AI Project client...");
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log(`Ensuring agent '${agentName}' exists...`);
  await project.agents.get(agentName);

  console.log("Getting Microsoft 365 publish defaults...");
  const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);
  console.log("Defaults:", {
    appPublishScope: defaults.appPublishScope,
    appVersion: defaults.appVersion,
    recommendedNextAppVersion: defaults.recommendedNextAppVersion,
  });

  console.log("Generating Microsoft 365 package (zip bytes)...");
  const pkg = await project.agents.getMicrosoft365Package(agentName, publishScope, {
    agentDisplayName: `${agentName}-sample`,
    appVersion: defaults.recommendedNextAppVersion || "1.0.0",
    optionalPermissionScopes: [],
  });
  console.log("Generated package response received:", {
    hasReadableStreamBody: !!pkg.readableStreamBody,
    hasBlobBody: !!pkg.blobBody,
  });

  if (!publishEnabled) {
    console.log(
      "Skipping publish call. Set FOUNDRY_M365_PUBLISH_ENABLED=true to execute publishToMicrosoft365.",
    );
    return;
  }

  console.log("Publishing agent to Microsoft 365...");
  const publish = await project.agents.publishToMicrosoft365(agentName, publishScope, {
    agentDisplayName: `${agentName}-sample`,
    appVersion: defaults.recommendedNextAppVersion || "1.0.0",
    optionalPermissionScopes: [],
  });
  console.log("Publish completed:", publish);
  console.log("Model used for agent workflows:", modelName);
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
