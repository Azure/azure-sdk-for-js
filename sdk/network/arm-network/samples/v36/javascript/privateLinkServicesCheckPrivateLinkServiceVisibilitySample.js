// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Checks whether the subscription is visible to private link service.
 *
 * @summary Checks whether the subscription is visible to private link service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CheckPrivateLinkServiceVisibility.json
 */
async function checkPrivateLinkServiceVisibility() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const parameters = {
    privateLinkServiceAlias: "mypls.00000000-0000-0000-0000-000000000000.azure.privatelinkservice",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.beginCheckPrivateLinkServiceVisibilityAndWait(
    location,
    parameters,
  );
  console.log(result);
}

async function main() {
  await checkPrivateLinkServiceVisibility();
}

main().catch(console.error);
