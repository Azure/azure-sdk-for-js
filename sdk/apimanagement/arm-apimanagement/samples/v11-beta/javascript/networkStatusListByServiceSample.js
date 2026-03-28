// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService.
 *
 * @summary gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetNetworkStatus.json
 */
async function apiManagementServiceGetNetworkStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.networkStatus.listByService("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementServiceGetNetworkStatus();
}

main().catch(console.error);
