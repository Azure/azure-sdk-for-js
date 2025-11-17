// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DataflowProfileResource
 *
 * @summary create a DataflowProfileResource
 * x-ms-original-file: 2025-10-01/DataflowProfile_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dataflowProfileCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowProfile.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        diagnostics: {
          logs: { level: "rnmwokumdmebpmfxxxzvvjfdywotav" },
          metrics: { prometheusPort: 7581 },
        },
        instanceCount: 14,
      },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowProfileResource
 *
 * @summary create a DataflowProfileResource
 * x-ms-original-file: 2025-10-01/DataflowProfile_CreateOrUpdate_Minimal.json
 */
async function dataflowProfileCreateOrUpdateMinimal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowProfile.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "aio-dataflowprofile",
    {
      properties: { instanceCount: 1 },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowProfileResource
 *
 * @summary create a DataflowProfileResource
 * x-ms-original-file: 2025-10-01/DataflowProfile_CreateOrUpdate_Multi.json
 */
async function dataflowProfileCreateOrUpdateMulti(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowProfile.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "aio-dataflowprofile",
    {
      properties: { instanceCount: 3 },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataflowProfileCreateOrUpdate();
  await dataflowProfileCreateOrUpdateMinimal();
  await dataflowProfileCreateOrUpdateMulti();
}

main().catch(console.error);
