// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a EnclaveEndpointResource
 *
 * @summary update a EnclaveEndpointResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Update.json
 */
async function enclaveEndpointsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveEndpoints.update(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyEnclaveEndpoint",
    {
      tags: { sampletag: "samplevalue" },
      properties: {
        ruleCollection: [
          {
            endpointRuleName: "54CEECEF-2C30-488E-946F-D20F414D99BA",
            destination: "10.0.0.0/24",
            ports: "443",
            protocols: ["TCP"],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveEndpointsUpdate();
}

main().catch(console.error);
