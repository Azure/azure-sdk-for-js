// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates of updates hostname configuration for a Gateway.
 *
 * @summary creates of updates hostname configuration for a Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGatewayHostnameConfiguration.json
 */
async function apiManagementCreateGatewayHostnameConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayHostnameConfiguration.createOrUpdate(
    "rg1",
    "apimService1",
    "gw1",
    "default",
    {
      certificateId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/certificates/cert1",
      hostname: "*",
      http2Enabled: true,
      negotiateClientCertificate: false,
      tls10Enabled: false,
      tls11Enabled: false,
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateGatewayHostnameConfiguration();
}

main().catch(console.error);
