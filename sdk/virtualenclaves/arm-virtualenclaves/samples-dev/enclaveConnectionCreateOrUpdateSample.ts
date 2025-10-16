// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a EnclaveConnectionResource
 *
 * @summary create a EnclaveConnectionResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_CreateOrUpdate.json
 */
async function enclaveConnectionCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveConnection.createOrUpdate(
    "rgopenapi",
    "TestMyEnclaveConnection",
    {
      properties: {
        communityResourceId:
          "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/testrg/providers/Microsoft.Mission/communities/TestMyCommunity",
        sourceResourceId:
          "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/microsoft.mission/virtualenclaves/TestMyEnclave",
        sourceCidr: "10.0.0.0/24",
        destinationEndpointId:
          "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/virtualenclaves/TestMyEnclave/enclaveendpoints/TestMyEnclaveEndpoint",
      },
      tags: { sampletag: "samplevalue" },
      location: "West US",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveConnectionCreateOrUpdate();
}

main().catch(console.error);
