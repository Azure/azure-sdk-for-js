// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a custom IP prefix.
 *
 * @summary Creates or updates a custom IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CustomIpPrefixCreateCustomizedValues.json
 */
async function createCustomIPPrefixAllocationMethod() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const customIpPrefixName = "test-customipprefix";
  const parameters = { cidr: "0.0.0.0/24", location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.beginCreateOrUpdateAndWait(
    resourceGroupName,
    customIpPrefixName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createCustomIPPrefixAllocationMethod();
}

main().catch(console.error);
