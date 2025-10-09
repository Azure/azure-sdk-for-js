// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the NGINX configuration of given NGINX deployment.
 *
 * @summary list the NGINX configuration of given NGINX deployment.
 * x-ms-original-file: 2025-03-01-preview/Configurations_List.json
 */
async function configurationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await configurationsList();
}

main().catch(console.error);
