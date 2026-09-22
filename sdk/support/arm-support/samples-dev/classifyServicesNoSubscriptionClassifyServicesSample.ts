// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to classify the list of right Azure services.
 *
 * @summary classify the list of right Azure services.
 * x-ms-original-file: 2025-06-01-preview/ClassifyServices.json
 */
async function classifyListOfAzureServices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.classifyServicesNoSubscription.classifyServices({
    issueSummary: "Can not connect to Windows VM",
    resourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgname/providers/Microsoft.Compute/virtualMachines/vmname",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await classifyListOfAzureServices();
}

main().catch(console.error);
