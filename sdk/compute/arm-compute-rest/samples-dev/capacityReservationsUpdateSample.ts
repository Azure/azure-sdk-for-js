// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CapacityReservationsUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to update a capacity reservation.
 *
 * @summary The operation to update a capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservation_Update_MaximumSet_Gen.json
 */
async function capacityReservationsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaa";
  const capacityReservationName = "aaaaaaaaaaaaaaaaaaa";
  const options: CapacityReservationsUpdateParameters = {
    body: {
      properties: {
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
      },
      sku: { name: "Standard_DS1_v2", capacity: 7, tier: "aaa" },
      tags: { key4974: "aaaaaaaaaaaaaaaa" },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}",
      subscriptionId,
      resourceGroupName,
      capacityReservationGroupName,
      capacityReservationName,
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

capacityReservationsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to update a capacity reservation.
 *
 * @summary The operation to update a capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservation_Update_MinimumSet_Gen.json
 */
async function capacityReservationsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const capacityReservationName = "aaa";
  const options: CapacityReservationsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}",
      subscriptionId,
      resourceGroupName,
      capacityReservationGroupName,
      capacityReservationName,
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

capacityReservationsUpdateMinimumSetGen().catch(console.error);
