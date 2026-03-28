// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a workspace manager configuration.
 *
 * @summary creates or updates a workspace manager configuration.
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerConfigurations/CreateOrUpdateWorkspaceManagerConfiguration.json
 */
async function createOrUpdateAWorkspaceManagerConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerConfigurations.createOrUpdate(
    "myRg",
    "myWorkspace",
    "default",
    { mode: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAWorkspaceManagerConfiguration();
}

main().catch(console.error);
