// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists recovery configuration profiles under a recovery plan.
 *
 * @summary lists recovery configuration profiles under a recovery plan.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_List_MaximumSet_Gen.json
 */
async function recoveryConfigProfilesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recoveryConfigProfiles.list(
    "contoso-service-group",
    "cyber-plan",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await recoveryConfigProfilesListMaximumSet();
}

main().catch(console.error);
