// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 *
 * @summary lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`.
 * x-ms-original-file: 2026-02-09-preview/ProfileProbingGateways_ListByParent_MaximumSet_Gen.json
 */
async function profileProbingGatewaysListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profileProbingGateways.listByParent(
    "rgprivateTrafficManager",
    "myProfile",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await profileProbingGatewaysListByParentMaximumSet();
}

main().catch(console.error);
