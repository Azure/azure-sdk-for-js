// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified Security Partner Provider.
 *
 * @summary Deletes the specified Security Partner Provider.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/SecurityPartnerProviderDelete.json
 */
async function deleteSecurityPartnerProvider() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const securityPartnerProviderName = "securityPartnerProvider";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityPartnerProviders.beginDeleteAndWait(
    resourceGroupName,
    securityPartnerProviderName,
  );
  console.log(result);
}

async function main() {
  await deleteSecurityPartnerProvider();
}

main().catch(console.error);
