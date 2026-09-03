// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the quota (service limits) of this resource to the requested value.
 * • To get the quota information for specific resource, send a GET request.
 * • To increase the quota, update the limit field from the GET response to a new value.
 * • To update the quota value, submit the JSON response to the quota request API to update the quota.
 * • To update the quota. use the PATCH operation.
 *
 * @summary update the quota (service limits) of this resource to the requested value.
 * • To get the quota information for specific resource, send a GET request.
 * • To increase the quota, update the limit field from the GET response to a new value.
 * • To update the quota value, submit the JSON response to the quota request API to update the quota.
 * • To update the quota. use the PATCH operation.
 * x-ms-original-file: 2020-10-25/patchComputeQuotaRequest.json
 */
async function quotasRequestPatchForCompute() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.quota.update(
    "D7EC67B3-7657-4966-BFFC-41EFD36BAAB3",
    "Microsoft.Compute",
    "eastus",
    "standardFSv2Family",
    { properties: { name: { value: "standardFSv2Family" }, limit: 200, unit: "Count" } },
  );
  console.log(result);
}

async function main() {
  await quotasRequestPatchForCompute();
}

main().catch(console.error);
