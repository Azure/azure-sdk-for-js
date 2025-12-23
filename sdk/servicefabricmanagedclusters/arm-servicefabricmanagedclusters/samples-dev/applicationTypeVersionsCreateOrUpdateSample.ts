// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric managed application type version resource with the specified name.
 *
 * @summary create or update a Service Fabric managed application type version resource with the specified name.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeVersionPutOperation_example.json
 */
async function putAnApplicationTypeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypeVersions.createOrUpdate(
    "resRg",
    "myCluster",
    "myAppType",
    "1.0",
    {
      location: "eastus",
      properties: { appPackageUrl: "http://fakelink.test.com/MyAppType" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putAnApplicationTypeVersion();
}

main().catch(console.error);
