// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a certificate of given NGINX deployment
 *
 * @summary get a certificate of given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Certificates_Get.json
 */
async function certificatesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.certificates.get("myResourceGroup", "myDeployment", "default");
  console.log(result);
}

async function main() {
  await certificatesGet();
}

main().catch(console.error);
