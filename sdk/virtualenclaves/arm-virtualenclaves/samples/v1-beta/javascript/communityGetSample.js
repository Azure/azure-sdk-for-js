// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CommunityResource
 *
 * @summary get a CommunityResource
 * x-ms-original-file: 2025-05-01-preview/Community_Get.json
 */
async function communityGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.community.get("rgopenapi", "TestMyCommunity");
  console.log(result);
}

async function main() {
  await communityGet();
}

main().catch(console.error);
