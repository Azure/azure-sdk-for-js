// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all certificates of given NGINX deployment
 *
 * @summary list all certificates of given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Certificates_List.json
 */
async function certificatesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificates.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await certificatesList();
}

main().catch(console.error);
