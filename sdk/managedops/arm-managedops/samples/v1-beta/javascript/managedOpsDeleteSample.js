// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedOpsClient } = require("@azure/arm-managedops");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the ManagedOps instance.
 *
 * @summary deletes the ManagedOps instance.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_Delete.json
 */
async function managedOpsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  await client.managedOps.delete("default");
}

async function main() {
  await managedOpsDelete();
}

main().catch(console.error);
