// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary lists the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/policiesGetByCustomer.json
 */
async function policiesGetByCustomer() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.getByCustomer(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "11111111-1111-1111-1111-111111111111",
    "default",
  );
  console.log(result);
}

async function main() {
  await policiesGetByCustomer();
}

main().catch(console.error);
