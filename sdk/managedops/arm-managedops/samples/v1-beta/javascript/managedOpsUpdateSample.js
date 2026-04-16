// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedOpsClient } = require("@azure/arm-managedops");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the ManagedOps instance with the supplied fields.
 *
 * @summary updates the ManagedOps instance with the supplied fields.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_Update.json
 */
async function managedOpsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  const result = await client.managedOps.update("default", {});
  console.log(result);
}

async function main() {
  await managedOpsUpdate();
}

main().catch(console.error);
