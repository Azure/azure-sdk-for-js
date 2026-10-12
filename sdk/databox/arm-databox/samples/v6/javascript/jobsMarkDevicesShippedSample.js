// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request to mark devices for a given job as shipped
 *
 * @summary request to mark devices for a given job as shipped
 * x-ms-original-file: 2025-07-01/MarkDevicesShipped.json
 */
async function markDevicesShipped() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.jobs.markDevicesShipped("TestJobName1", "YourResourceGroupName", {
    deliverToDcPackageDetails: { carrierName: "testCarrier", trackingId: "000000" },
  });
}

async function main() {
  await markDevicesShipped();
}

main().catch(console.error);
