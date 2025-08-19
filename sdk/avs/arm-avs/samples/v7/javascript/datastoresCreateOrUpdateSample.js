// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Datastore
 *
 * @summary create a Datastore
 * x-ms-original-file: 2024-09-01/Datastores_CreateOrUpdate.json
 */
async function datastoresCreateOrUpdate() {
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

async function main() {
  await datastoresCreateOrUpdate();
}

main().catch(console.error);
