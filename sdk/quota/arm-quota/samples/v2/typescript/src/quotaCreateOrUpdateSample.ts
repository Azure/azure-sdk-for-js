// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/putComputeOneSkuQuotaRequest.json
 */
async function quotasPutRequestForCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quota.createOrUpdate(
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
 * This sample demonstrates how to create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/putMachineLearningServicesQuotaRequestLowPriority.json
 */
async function quotasRequestForMachineLearningServicesLowPriorityResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quota.createOrUpdate(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.MachineLearningServices/locations/eastus",
    "TotalLowPriorityCores",
    {
      properties: {
        name: { value: "TotalLowPriorityCores" },
        limit: { limitObjectType: "LimitValue", value: 10 },
        resourceType: "lowPriority",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/putNetworkOneSkuQuotaRequest.json
 */
async function quotasPutRequestForNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quota.createOrUpdate(
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

/**
 * This sample demonstrates how to create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @summary create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 * x-ms-original-file: 2025-09-01/putNetworkOneSkuQuotaRequestStandardSkuPublicIpAddresses.json
 */
async function quotasPutRequestForNetworkStandardSkuPublicIpAddressesResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quota.createOrUpdate(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Network/locations/eastus",
    "StandardSkuPublicIpAddresses",
    {
      properties: {
        name: { value: "StandardSkuPublicIpAddresses" },
        limit: { limitObjectType: "LimitValue", value: 10 },
        resourceType: "PublicIpAddresses",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await quotasPutRequestForCompute();
  await quotasRequestForMachineLearningServicesLowPriorityResource();
  await quotasPutRequestForNetwork();
  await quotasPutRequestForNetworkStandardSkuPublicIpAddressesResource();
}

main().catch(console.error);
