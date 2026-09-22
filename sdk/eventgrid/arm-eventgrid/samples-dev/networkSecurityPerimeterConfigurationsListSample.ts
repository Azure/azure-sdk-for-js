// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all network security perimeter configurations associated with a topic or domain.
 *
 * @summary get all network security perimeter configurations associated with a topic or domain.
 * x-ms-original-file: 2025-07-15-preview/NetworkSecurityPerimeterConfigurations_List.json
 */
async function networkSecurityPerimeterConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list(
    "examplerg",
    "topics",
    "exampleResourceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationsList();
}

main().catch(console.error);
