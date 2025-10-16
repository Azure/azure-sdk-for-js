// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a EnclaveEndpointResource
 *
 * @summary create a EnclaveEndpointResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_CreateOrUpdate.json
 */
async function enclaveEndpointsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveEndpoints.createOrUpdate(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyEnclaveEndpoint",
    {
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
      tags: { sampletag: "samplevalue" },
      location: "West US",
    },
  );
  console.log(result);
}

async function main() {
  await enclaveEndpointsCreateOrUpdate();
}

main().catch(console.error);
