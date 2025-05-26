// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric managed application type version resource with the specified name.
 *
 * @summary create or update a Service Fabric managed application type version resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ApplicationTypeVersionPutOperation_example.json
 */
async function putAnApplicationTypeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.applicationTypeVersions.createOrUpdate(
    "resRg",
    "myCluster",
    "myAppType",
    "1.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putAnApplicationTypeVersion();
}

main().catch(console.error);
