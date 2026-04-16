// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedOpsClient } = require("@azure/arm-managedops");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all ManagedOps instances in the subscription.
 *
 * @summary list all ManagedOps instances in the subscription.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_List.json
 */
async function managedOpsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedOps.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await managedOpsList();
}

main().catch(console.error);
