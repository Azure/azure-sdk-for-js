// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the managed instance.
 *
 * @summary starts the managed instance.
 * x-ms-original-file: 2025-02-01-preview/StartManagedInstance.json
 */
async function startsTheManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.start("startrg", "mitostart");
  console.log(result);
}

async function main() {
  await startsTheManagedInstance();
}

main().catch(console.error);
