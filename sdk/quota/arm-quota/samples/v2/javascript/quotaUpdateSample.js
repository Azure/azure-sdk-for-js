// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/patchComputeQuotaRequest.json
 */
async function quotasRequestPatchForCompute() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quota.update(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Compute/locations/eastus",
    "standardFSv2Family",
    {
      properties: {
        name: { value: "standardFSv2Family" },
        limit: { limitObjectType: "LimitValue", value: 10 },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/patchNetworkOneSkuQuotaRequest.json
 */
async function quotasRequestPatchForNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quota.update(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Network/locations/eastus",
    "MinPublicIpInterNetworkPrefixLength",
    {
      properties: {
        name: { value: "MinPublicIpInterNetworkPrefixLength" },
        limit: { limitObjectType: "LimitValue", value: 10 },
        resourceType: "MinPublicIpInterNetworkPrefixLength",
      },
    },
  );
  console.log(result);
}

async function main() {
  await quotasRequestPatchForCompute();
  await quotasRequestPatchForNetwork();
}

main().catch(console.error);
