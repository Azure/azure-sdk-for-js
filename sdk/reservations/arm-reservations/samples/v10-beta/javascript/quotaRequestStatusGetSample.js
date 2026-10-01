// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 *
 * @summary for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 * x-ms-original-file: 2020-10-25/getQuotaRequestStatusById.json
 */
async function quotaRequestStatus() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.Compute",
    "eastus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 *
 * @summary for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 * x-ms-original-file: 2020-10-25/getQuotaRequestStatusFailed.json
 */
async function quotaRequestFailed() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.Compute",
    "eastus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 *
 * @summary for the specified Azure region (location), get the details and status of the quota request by the quota request ID for the resources of the resource provider. The PUT request for the quota (service limit) returns a response with the requestId parameter.
 * x-ms-original-file: 2020-10-25/getQuotaRequestStatusInProgress.json
 */
async function quotaRequestInProgress() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.quotaRequestStatus.get(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.Compute",
    "westus",
    "2B5C8515-37D8-4B6A-879B-CD641A2CF605",
  );
  console.log(result);
}

async function main() {
  await quotaRequestStatus();
  await quotaRequestFailed();
  await quotaRequestInProgress();
}

main().catch(console.error);
