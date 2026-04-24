// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to activates the specified application package. This should be done after the `ApplicationPackage` was created and uploaded. This needs to be done before an `ApplicationPackage` can be used on Pools or Tasks.
 *
 * @summary activates the specified application package. This should be done after the `ApplicationPackage` was created and uploaded. This needs to be done before an `ApplicationPackage` can be used on Pools or Tasks.
 * x-ms-original-file: 2025-06-01/ApplicationPackageActivate.json
 */
async function applicationPackageActivate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.applicationPackage.activate(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
    "1",
    { format: "zip" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationPackageActivate();
}

main().catch(console.error);
