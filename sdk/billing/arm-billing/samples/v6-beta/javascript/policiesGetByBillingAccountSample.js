// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policies for a billing account of Enterprise Agreement type.
 *
 * @summary get the policies for a billing account of Enterprise Agreement type.
 * x-ms-original-file: 2024-04-01/policiesGetByBillingAccount.json
 */
async function policiesGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.getByBillingAccount("1234567");
  console.log(result);
}

async function main() {
  await policiesGetByBillingAccount();
}

main().catch(console.error);
