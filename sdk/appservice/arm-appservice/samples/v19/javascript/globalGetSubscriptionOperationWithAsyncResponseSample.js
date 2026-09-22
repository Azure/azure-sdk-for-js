// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets an operation in a subscription and given region
 *
 * @summary description for Gets an operation in a subscription and given region
 * x-ms-original-file: 2025-05-01/GetSubscriptionOperationWithAsyncResponse.json
 */
async function getsAnOperationInASubscriptionAndGivenRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.global.getSubscriptionOperationWithAsyncResponse(
    "West US",
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab5d5",
  );
}

async function main() {
  await getsAnOperationInASubscriptionAndGivenRegion();
}

main().catch(console.error);
