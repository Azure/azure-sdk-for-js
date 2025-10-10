// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve enterprise add-on details information
 *
 * @summary retrieve enterprise add-on details information
 * x-ms-original-file: 2025-08-01/EnterpriseDetails_Post.json
 */
async function enterpriseDetailsPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.checkEnterpriseDetails("myResourceGroup", "myWorkspace");
  console.log(result);
}

async function main() {
  await enterpriseDetailsPost();
}

main().catch(console.error);
