// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available PowerPlatform REST API operations.
 *
 * @summary lists all of the available PowerPlatform REST API operations.
 * x-ms-original-file: 2020-10-30-preview/listOperations.json
 */
async function listsAllOfTheAvailablePowerPlatformRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailablePowerPlatformRestAPIOperations();
}

main().catch(console.error);
