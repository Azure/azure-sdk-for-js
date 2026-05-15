// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Security Partner Provider.
 *
 * @summary deletes the specified Security Partner Provider.
 * x-ms-original-file: 2025-05-01/SecurityPartnerProviderDelete.json
 */
async function deleteSecurityPartnerProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityPartnerProviders.delete("rg1", "securityPartnerProvider");
}

async function main() {
  await deleteSecurityPartnerProvider();
}

main().catch(console.error);
