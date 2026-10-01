// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of the Enabled Resource Types.
 *
 * @summary gets the list of the Enabled Resource Types.
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsListEnabledResourceTypes.json
 */
async function getCustomLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customLocations.listEnabledResourceTypes(
    "testresourcegroup",
    "customLocation01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getCustomLocation();
}

main().catch(console.error);
