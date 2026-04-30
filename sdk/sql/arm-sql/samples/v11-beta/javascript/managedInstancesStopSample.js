// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops the managed instance.
 *
 * @summary stops the managed instance.
 * x-ms-original-file: 2025-02-01-preview/StopManagedInstance.json
 */
async function stopsTheManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.stop("stoprg", "mitostop");
  console.log(result);
}

async function main() {
  await stopsTheManagedInstance();
}

main().catch(console.error);
