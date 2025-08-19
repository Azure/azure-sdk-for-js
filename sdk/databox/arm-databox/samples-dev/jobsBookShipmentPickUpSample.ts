// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Book shipment pick up.
 *
 * @summary Book shipment pick up.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/BookShipmentPickupPost.json
 */

import {
  ShipmentPickUpRequest,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function bookShipmentPickupPost(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const shipmentPickUpRequest: ShipmentPickUpRequest = {
    endTime: new Date("2019-09-22T18:30:00Z"),
    shipmentLocation: "Front desk",
    startTime: new Date("2019-09-20T18:30:00Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.bookShipmentPickUp(
    resourceGroupName,
    jobName,
    shipmentPickUpRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bookShipmentPickupPost();
}

main().catch(console.error);
