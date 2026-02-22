// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a certificate from the NGINX deployment
 *
 * @summary deletes a certificate from the NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Certificates_Delete.json
 */
async function certificatesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  await client.certificates.delete("myResourceGroup", "myDeployment", "default");
}

async function main() {
  await certificatesDelete();
}

main().catch(console.error);
