// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to book shipment pick up.
 *
 * @summary book shipment pick up.
 * x-ms-original-file: 2025-07-01/BookShipmentPickupPost.json
 */
async function bookShipmentPickupPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.bookShipmentPickUp("YourResourceGroupName", "TestJobName1", {
    endTime: new Date("2019-09-22T18:30:00Z"),
    shipmentLocation: "Front desk",
    startTime: new Date("2019-09-20T18:30:00Z"),
  });
  console.log(result);
}

async function main() {
  await bookShipmentPickupPost();
}

main().catch(console.error);
