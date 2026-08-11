// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workspace manager configuration
 *
 * @summary deletes a workspace manager configuration
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerConfigurations/DeleteWorkspaceManagerConfiguration.json
 */
async function deleteAWorkspaceManagerConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.workspaceManagerConfigurations.delete("myRg", "myWorkspace", "default");
}

async function main(): Promise<void> {
  await deleteAWorkspaceManagerConfiguration();
}

main().catch(console.error);
