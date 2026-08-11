// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workspace manager configuration.
 *
 * @summary creates or updates a workspace manager configuration.
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerConfigurations/CreateOrUpdateWorkspaceManagerConfiguration.json
 */
async function createOrUpdateAWorkspaceManagerConfiguration(): Promise<void> {
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

async function main(): Promise<void> {
  await createOrUpdateAWorkspaceManagerConfiguration();
}

main().catch(console.error);
