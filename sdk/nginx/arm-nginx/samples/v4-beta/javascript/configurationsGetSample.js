// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the NGINX configuration of given NGINX deployment
 *
 * @summary get the NGINX configuration of given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Configurations_Get.json
 */
async function configurationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.configurations.get("myResourceGroup", "myDeployment", "default");
  console.log(result);
}

async function main() {
  await configurationsGet();
}

main().catch(console.error);
