// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workspace manager member
 *
 * @summary gets a workspace manager member
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerMembers/GetWorkspaceManagerMember.json
 */
async function getAWorkspaceManagerMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerMembers.get(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceManagerMember();
}

main().catch(console.error);
