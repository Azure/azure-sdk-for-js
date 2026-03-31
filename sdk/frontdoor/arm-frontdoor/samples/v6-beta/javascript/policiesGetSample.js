// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve protection policy with specified name within a resource group.
 *
 * @summary retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: 2025-11-01/WafPolicyGet.json
 */
async function getPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.get("rg1", "Policy1");
  console.log(result);
}

async function main() {
  await getPolicy();
}

main().catch(console.error);
