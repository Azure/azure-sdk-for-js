// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CommunityEndpointResource resources by CommunityResource
 *
 * @summary list CommunityEndpointResource resources by CommunityResource
 * x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_ListByCommunityResource.json
 */
async function communityEndpointsListByCommunityResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communityEndpoints.listByCommunityResource(
    "rgopenapi",
    "TestMyCommunity",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await communityEndpointsListByCommunityResource();
}

main().catch(console.error);
