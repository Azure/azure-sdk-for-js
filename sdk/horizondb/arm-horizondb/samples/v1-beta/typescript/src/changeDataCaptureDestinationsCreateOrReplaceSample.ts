// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a Microsoft Fabric change data capture destination.
 *
 * @summary creates or replaces a Microsoft Fabric change data capture destination.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_CreateOrReplace.json
 */
async function createAMicrosoftFabricChangeDataCaptureDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureDestinations.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
    {
      properties: {
        destination: {
          destinationType: "Fabric",
          protocol: "Native",
          workspaceId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
        },
        desiredState: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
