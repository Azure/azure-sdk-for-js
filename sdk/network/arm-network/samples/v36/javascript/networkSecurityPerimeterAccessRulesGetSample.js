// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified NSP access rule by name.
 *
 * @summary Gets the specified NSP access rule by name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspAccessRuleGet.json
 */
async function nspAccessRuleGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const profileName = "profile1";
  const accessRuleName = "accessRule1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.get(
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
  );
  console.log(result);
}

async function main() {
  await nspAccessRuleGet();
}

main().catch(console.error);
