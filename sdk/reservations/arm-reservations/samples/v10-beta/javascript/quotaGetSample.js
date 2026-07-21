// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the current quota (service limit) and usage of a resource. You can use the response from the GET operation to submit quota update request.
 *
 * @summary get the current quota (service limit) and usage of a resource. You can use the response from the GET operation to submit quota update request.
 * x-ms-original-file: 2020-10-25/getComputeOneSkuUsages.json
 */
async function quotasRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.quota.get(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.Compute",
    "eastus",
    "standardNDSFamily",
  );
  console.log(result);
}

async function main() {
  await quotasRequestForCompute();
}

main().catch(console.error);
