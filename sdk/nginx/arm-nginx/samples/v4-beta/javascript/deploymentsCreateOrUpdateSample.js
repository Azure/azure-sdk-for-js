// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the NGINX deployment
 *
 * @summary create or update the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Deployments_Create.json
 */
async function deploymentsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("myResourceGroup", "myDeployment");
  console.log(result);
}

async function main() {
  await deploymentsCreate();
}

main().catch(console.error);
