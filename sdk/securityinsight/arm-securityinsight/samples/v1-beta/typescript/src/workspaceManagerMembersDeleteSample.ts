// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workspace manager member
 *
 * @summary deletes a workspace manager member
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerMembers/DeleteWorkspaceManagerMember.json
 */
async function deleteAWorkspaceManagerMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.workspaceManagerMembers.delete(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
  );
}

async function main(): Promise<void> {
  await deleteAWorkspaceManagerMember();
}

main().catch(console.error);
