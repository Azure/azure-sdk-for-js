// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists existing AzureFrontDoor domains.
 *
 * @summary lists existing AzureFrontDoor domains.
 * x-ms-original-file: 2025-12-01/AFDCustomDomains_ListByProfile.json
 */
async function afdCustomDomainsListByProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.afdCustomDomains.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await afdCustomDomainsListByProfile();
}

main().catch(console.error);
