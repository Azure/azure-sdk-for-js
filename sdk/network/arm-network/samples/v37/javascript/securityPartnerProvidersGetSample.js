// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Security Partner Provider.
 *
 * @summary gets the specified Security Partner Provider.
 * x-ms-original-file: 2025-05-01/SecurityPartnerProviderGet.json
 */
async function getSecurityPartnerProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityPartnerProviders.get("rg1", "securityPartnerProvider");
  console.log(result);
}

async function main() {
  await getSecurityPartnerProvider();
}

main().catch(console.error);
