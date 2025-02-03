// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a InstanceResource
 *
 * @summary create a InstanceResource
 * x-ms-original-file: 2024-11-01/Instance_CreateOrUpdate_MaximumSet_Gen.json
 */
async function instanceCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.instance.createOrUpdate(
    "rgiotoperations",
    "aio-instance",
    {
      properties: {
        schemaRegistryRef: {
          resourceId:
            "/subscriptions/0000000-0000-0000-0000-000000000000/resourceGroups/resourceGroup123/providers/Microsoft.DeviceRegistry/schemaRegistries/resource-name123",
        },
        description: "kpqtgocs",
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
      identity: { type: "None", userAssignedIdentities: {} },
      tags: {},
      location: "xvewadyhycrjpu",
    },
  );
  console.log(result);
}

async function main() {
  instanceCreateOrUpdate();
}

main().catch(console.error);
