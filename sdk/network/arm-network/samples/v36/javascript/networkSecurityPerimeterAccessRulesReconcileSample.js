// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Reconcile NSP access rules
 *
 * @summary Reconcile NSP access rules
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspAccessRuleReconcile.json
 */
async function nspAccessRuleReconcile() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const profileName = "profile1";
  const accessRuleName = "accessRuleName1";
  const parameters = { properties: {} };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.reconcile(
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    accessRuleName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await nspAccessRuleReconcile();
}

main().catch(console.error);
