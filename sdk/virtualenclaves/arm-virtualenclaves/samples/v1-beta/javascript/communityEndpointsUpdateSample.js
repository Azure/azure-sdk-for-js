// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CommunityEndpointResource
 *
 * @summary update a CommunityEndpointResource
 * x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Update.json
 */
async function communityEndpointsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.communityEndpoints.update(
    "rgopenapi",
    "TestMyCommunity",
    "TestMyCommunityEndpoint",
    {
      tags: { sampletag: "samplevalue" },
      properties: {
        ruleCollection: [
          {
            destinationType: "FQDN",
            destination: "foo.example.com",
            ports: "443",
            protocols: ["TCP"],
            transitHubResourceId:
              "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/testrg/providers/Microsoft.Mission/communities/TestMyCommunity/transitHubs/TestThName",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await communityEndpointsUpdate();
}

main().catch(console.error);
