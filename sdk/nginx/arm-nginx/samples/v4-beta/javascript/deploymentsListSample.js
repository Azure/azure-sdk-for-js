// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the NGINX deployments resources
 *
 * @summary list the NGINX deployments resources
 * x-ms-original-file: 2025-03-01-preview/Deployments_List.json
 */
async function deploymentsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deployments.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deploymentsList();
}

main().catch(console.error);
