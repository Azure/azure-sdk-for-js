// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the NGINX certificates for given NGINX deployment
 *
 * @summary create or update the NGINX certificates for given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Certificates_CreateOrUpdate.json
 */
async function certificatesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate(
    "myResourceGroup",
    "myDeployment",
    "default",
  );
  console.log(result);
}

async function main() {
  await certificatesCreateOrUpdate();
}

main().catch(console.error);
