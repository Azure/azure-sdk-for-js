// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update the NGINX deployment
 *
 * @summary Create or update the NGINX deployment
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/Deployments_Create.json
 */
async function deploymentsCreate() {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    deploymentName,
  );
  console.log(result);
}

async function main() {
  await deploymentsCreate();
}

main().catch(console.error);
