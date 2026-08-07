// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to classify the list of right Azure services.
 *
 * @summary classify the list of right Azure services.
 * x-ms-original-file: 2026-07-01/ClassifyServicesForSubscription.json
 */
async function classifyListOfAzureServicesForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.classifyServices.classifyServices({
    issueSummary: "Can not connect to Windows VM",
    resourceId:
      "/subscriptions/76cb77fa-8b17-4eab-9493-b65dace99813/resourceGroups/rgname/providers/Microsoft.Compute/virtualMachines/vmname",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await classifyListOfAzureServicesForASubscription();
}

main().catch(console.error);
