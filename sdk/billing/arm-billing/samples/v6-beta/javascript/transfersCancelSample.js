// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/transfersCancel.json
 */
async function transferCancel() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transfers.cancel(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "yyyy-yyyy-yyy-yyy",
    "aabb123",
  );
  console.log(result);
}

async function main() {
  await transferCancel();
}

main().catch(console.error);
