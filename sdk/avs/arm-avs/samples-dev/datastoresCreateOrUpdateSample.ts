// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Datastore
 *
 * @summary create a Datastore
 * x-ms-original-file: 2025-09-01/Datastores_CreateOrUpdate.json
 */
async function datastoresCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.datastores.createOrUpdate(
    "group1",
    "cloud1",
    "cluster1",
    "datastore1",
    {
      properties: {
        netAppVolume: {
          id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/ResourceGroup1/providers/Microsoft.NetApp/netAppAccounts/NetAppAccount1/capacityPools/CapacityPool1/volumes/NFSVol1",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await datastoresCreateOrUpdate();
}

main().catch(console.error);
