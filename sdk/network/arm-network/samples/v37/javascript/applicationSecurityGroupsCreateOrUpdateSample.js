// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an application security group.
 *
 * @summary creates or updates an application security group.
 * x-ms-original-file: 2025-05-01/ApplicationSecurityGroupCreate.json
 */
async function createApplicationSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationSecurityGroups.createOrUpdate("rg1", "test-asg", {
    location: "westus",
  });
  console.log(result);
}

async function main() {
  await createApplicationSecurityGroup();
}

main().catch(console.error);
