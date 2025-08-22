// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservation_CreateOrUpdate.json
 */

import type { CapacityReservationsCreateOrUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateACapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const capacityReservationName = "myCapacityReservation";
  const options: CapacityReservationsCreateOrUpdateParameters = {
    body: {
      location: "westus",
      sku: { name: "Standard_DS1_v2", capacity: 4 },
      tags: { department: "HR" },
      zones: ["1"],
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
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateACapacityReservation().catch(console.error);
