// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedOpsClient } from "@azure/arm-managedops";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the information of the ManagedOps instance.
 *
 * @summary gets the information of the ManagedOps instance.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_Get.json
 */
async function managedOpsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  const result = await client.managedOps.get("default");
  console.log(result);
}

async function main(): Promise<void> {
  await managedOpsGet();
}

main().catch(console.error);
