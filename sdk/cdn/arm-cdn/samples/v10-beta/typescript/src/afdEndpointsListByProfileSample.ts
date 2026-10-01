// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists existing AzureFrontDoor endpoints.
 *
 * @summary lists existing AzureFrontDoor endpoints.
 * x-ms-original-file: 2025-12-01/AFDEndpoints_ListByProfile.json
 */
async function afdEndpointsListByProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.afdEndpoints.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await afdEndpointsListByProfile();
}

main().catch(console.error);
