// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified application security group.
 *
 * @summary gets information about the specified application security group.
 * x-ms-original-file: 2025-05-01/ApplicationSecurityGroupGet.json
 */
async function getApplicationSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationSecurityGroups.get("rg1", "test-asg");
  console.log(result);
}

async function main() {
  await getApplicationSecurityGroup();
}

main().catch(console.error);
