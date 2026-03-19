// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a network access rule.
 *
 * @summary Creates or updates a network access rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspAccessRulePut.json
 */
async function nspAccessRulePut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const profileName = "profile1";
  const accessRuleName = "accessRule1";
  const parameters = {
    addressPrefixes: ["10.11.0.0/16", "10.10.1.0/24"],
    direction: "Inbound",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.createOrUpdate(
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await nspAccessRulePut();
}

main().catch(console.error);
