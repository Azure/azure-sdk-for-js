// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CloudLink
 *
 * @summary create a CloudLink
 * x-ms-original-file: 2024-09-01/CloudLinks_CreateOrUpdate.json
 */
async function cloudLinksCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.cloudLinks.createOrUpdate("group1", "cloud1", "cloudLink1", {
    properties: {
      linkedCloud:
        "/subscriptions/12341234-1234-1234-1234-123412341234/resourceGroups/mygroup/providers/Microsoft.AVS/privateClouds/cloud2",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudLinksCreateOrUpdate();
}

main().catch(console.error);
