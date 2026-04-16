// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedOpsClient } from "@azure/arm-managedops";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the ManagedOps instance.
 *
 * @summary deletes the ManagedOps instance.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_Delete.json
 */
async function managedOpsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  await client.managedOps.delete("default");
}

async function main(): Promise<void> {
  await managedOpsDelete();
}

main().catch(console.error);
