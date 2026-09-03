// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2025-09-01/getQuotaRequestStatusById.json
 */
async function quotaRequestStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaRequestStatus.get(
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Compute/locations/eastus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2025-09-01/getQuotaRequestStatusFailed.json
 */
async function quotaRequestFailed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.quotaRequestStatus.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2025-09-01/getQuotaRequestStatusInProgress.json
 */
async function quotaRequestInProgress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await quotaRequestStatus();
  await quotaRequestFailed();
  await quotaRequestInProgress();
}

main().catch(console.error);
