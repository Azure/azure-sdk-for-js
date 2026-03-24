// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get assigned Gateway Certificate Authority details.
 *
 * @summary get assigned Gateway Certificate Authority details.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGatewayCertificateAuthority.json
 */
async function apiManagementGetGatewayCertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayCertificateAuthority.get(
    "rg1",
    "apimService1",
    "gw1",
    "cert1",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetGatewayCertificateAuthority();
}

main().catch(console.error);
