// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists existing AzureFrontDoor rule sets within a profile.
 *
 * @summary lists existing AzureFrontDoor rule sets within a profile.
 * x-ms-original-file: 2025-12-01/RuleSets_ListByProfile.json
 */
async function ruleSetsListByProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ruleSets.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ruleSetsListByProfile();
}

main().catch(console.error);
