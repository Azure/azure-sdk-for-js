// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2026-09-01-preview/getQuotaRequestStatusById.json
 */
async function quotaRequestStatus() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
    "subscriptions/D7EC67B3-7657-4966-BFFC-41EFD36BAAB3/providers/Microsoft.Compute/locations/eastus",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2026-09-01-preview/getQuotaRequestStatusFailed.json
 */
async function quotaRequestFailed() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @summary get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 * x-ms-original-file: 2026-09-01-preview/getQuotaRequestStatusInProgress.json
 */
async function quotaRequestInProgress() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
    "subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Compute/locations/eastus",
  );
  console.log(result);
}

async function main() {
  await quotaRequestStatus();
  await quotaRequestFailed();
  await quotaRequestInProgress();
}

main().catch(console.error);
