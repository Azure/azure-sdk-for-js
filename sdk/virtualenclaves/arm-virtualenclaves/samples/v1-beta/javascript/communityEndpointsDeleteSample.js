// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CommunityEndpointResource
 *
 * @summary delete a CommunityEndpointResource
 * x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Delete.json
 */
async function communityEndpointsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  await client.communityEndpoints.delete("rgopenapi", "TestMyCommunity", "TestMyCommunityEndpoint");
}

async function main() {
  await communityEndpointsDelete();
}

main().catch(console.error);
