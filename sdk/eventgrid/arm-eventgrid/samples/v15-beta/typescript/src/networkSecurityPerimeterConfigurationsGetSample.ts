// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific network security perimeter configuration with a topic or domain.
 *
 * @summary get a specific network security perimeter configuration with a topic or domain.
 * x-ms-original-file: 2025-07-15-preview/NetworkSecurityPerimeterConfigurations_Get.json
 */
async function networkSecurityPerimeterConfigurationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "examplerg",
    "topics",
    "exampleResourceName",
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40perimeter",
    "someAssociation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationsGet();
}

main().catch(console.error);
