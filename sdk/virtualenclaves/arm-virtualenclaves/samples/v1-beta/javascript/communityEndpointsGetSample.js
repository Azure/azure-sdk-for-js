// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CommunityEndpointResource
 *
 * @summary get a CommunityEndpointResource
 * x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Get.json
 */
async function communityEndpointsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.communityEndpoints.get(
    "rgopenapi",
    "TestMyCommunity",
    "TestMyCommunityEndpoint",
  );
  console.log(result);
}

async function main() {
  await communityEndpointsGet();
}

main().catch(console.error);
