// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to update a capacity reservation.
 *
 * @summary The operation to update a capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservation_Update_MaximumSet_Gen.json
 */
async function capacityReservationUpdateMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaa";
  const capacityReservationName = "aaaaaaaaaaaaaaaaaaa";
  const parameters = {
    instanceView: {
      statuses: [
        {
          code: "aaaaaaaaaaaaaaaaaaaaaaa",
          displayStatus: "aaaaaa",
          level: "Info",
          message: "a",
          time: new Date("2021-11-30T12:58:26.522Z"),
        },
      ],
      utilizationInfo: {},
    },
    sku: { name: "Standard_DS1_v2", capacity: 7, tier: "aaa" },
    tags: { key4974: "aaaaaaaaaaaaaaaa" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.beginUpdateAndWait(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to update a capacity reservation.
 *
 * @summary The operation to update a capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservation_Update_MinimumSet_Gen.json
 */
async function capacityReservationUpdateMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const capacityReservationName = "aaa";
  const parameters = {};
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.beginUpdateAndWait(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await capacityReservationUpdateMaximumSetGen();
  await capacityReservationUpdateMinimumSetGen();
}

main().catch(console.error);
