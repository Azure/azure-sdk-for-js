// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an associated tenant for a billing account.
 *
 * @summary deletes an associated tenant for a billing account.
 * x-ms-original-file: 2024-04-01/associatedTenantsDelete.json
 */
async function associatedTenantsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.associatedTenants.delete(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
  );
}

async function main() {
  await associatedTenantsDelete();
}

main().catch(console.error);
