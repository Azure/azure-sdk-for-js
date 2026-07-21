// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workspace manager configuration
 *
 * @summary gets a workspace manager configuration
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerConfigurations/GetWorkspaceManagerConfiguration.json
 */
async function getAWorkspaceManagerConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerConfigurations.get("myRg", "myWorkspace", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceManagerConfiguration();
}

main().catch(console.error);
