// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the NGINX deployment
 *
 * @summary get the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Deployments_Get.json
 */
async function deploymentsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.get("myResourceGroup", "myDeployment");
  console.log(result);
}

/**
 * This sample demonstrates how to get the NGINX deployment
 *
 * @summary get the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Deployments_Get_AutoScale.json
 */
async function deploymentsGetAutoScale() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.get("myResourceGroup", "myDeployment");
  console.log(result);
}

async function main() {
  await deploymentsGet();
  await deploymentsGetAutoScale();
}

main().catch(console.error);
