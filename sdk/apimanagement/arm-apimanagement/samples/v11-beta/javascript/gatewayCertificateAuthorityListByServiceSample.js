// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the collection of Certificate Authorities for the specified Gateway entity.
 *
 * @summary lists the collection of Certificate Authorities for the specified Gateway entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGatewayCertificateAuthorities.json
 */
async function apiManagementListGatewaycertificateAuthorities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gatewayCertificateAuthority.listByService(
    "rg1",
    "apimService1",
    "gw1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListGatewaycertificateAuthorities();
}

main().catch(console.error);
