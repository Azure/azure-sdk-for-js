// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the NGINX deployment
 *
 * @summary Get the NGINX deployment
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/Deployments_Get.json
 */
async function deploymentsGet() {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.get(resourceGroupName, deploymentName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the NGINX deployment
 *
 * @summary Get the NGINX deployment
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/Deployments_Get_AutoScale.json
 */
async function deploymentsGetAutoScale() {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.get(resourceGroupName, deploymentName);
  console.log(result);
}

async function main() {
  await deploymentsGet();
  await deploymentsGetAutoScale();
}

main().catch(console.error);
