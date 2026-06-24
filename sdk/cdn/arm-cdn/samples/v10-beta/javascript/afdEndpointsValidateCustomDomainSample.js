// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS.
 *
 * @summary validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS.
 * x-ms-original-file: 2025-12-01/AFDEndpoints_ValidateCustomDomain.json
 */
async function endpointsValidateCustomDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdEndpoints.validateCustomDomain("RG", "profile1", "endpoint1", {
    hostName: "www.someDomain.com",
  });
  console.log(result);
}

async function main() {
  await endpointsValidateCustomDomain();
}

main().catch(console.error);
