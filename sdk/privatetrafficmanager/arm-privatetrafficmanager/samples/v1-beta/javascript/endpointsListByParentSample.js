// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Private Traffic Manager Endpoints by profile
 *
 * @summary get Private Traffic Manager Endpoints by profile
 * x-ms-original-file: 2026-02-09-preview/Endpoints_ListByParent_MaximumSet_Gen.json
 */
async function endpointsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.listByParent("rgprivateTrafficManager", "myProfile")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointsListByParentMaximumSet();
}

main().catch(console.error);
