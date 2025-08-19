// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Request to mark devices for a given job as shipped
 *
 * @summary Request to mark devices for a given job as shipped
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/MarkDevicesShipped.json
 */

import {
  MarkDevicesShippedRequest,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function markDevicesShipped(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const jobName = "TestJobName1";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const markDevicesShippedRequest: MarkDevicesShippedRequest = {
    deliverToDcPackageDetails: {
      carrierName: "testCarrier",
      trackingId: "000000",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.markDevicesShipped(
    jobName,
    resourceGroupName,
    markDevicesShippedRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await markDevicesShipped();
}

main().catch(console.error);
