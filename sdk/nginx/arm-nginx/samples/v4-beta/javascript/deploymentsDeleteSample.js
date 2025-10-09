// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the NGINX deployment resource
 *
 * @summary delete the NGINX deployment resource
 * x-ms-original-file: 2025-03-01-preview/Deployments_Delete.json
 */
async function deploymentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  await client.deployments.delete("myResourceGroup", "myDeployment");
}

async function main() {
  await deploymentsDelete();
}

main().catch(console.error);
