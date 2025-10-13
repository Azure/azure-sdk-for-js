// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the NGINX deployment
 *
 * @summary update the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Deployments_Update.json
 */
async function deploymentsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.update("myResourceGroup", "myDeployment");
  console.log(result);
}

/**
 * This sample demonstrates how to update the NGINX deployment
 *
 * @summary update the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Deployments_UpdateSubnet.json
 */
async function deploymentsUpdateSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.update("myResourceGroup", "myDeployment");
  console.log(result);
}

async function main() {
  await deploymentsUpdate();
  await deploymentsUpdateSubnet();
}

main().catch(console.error);
