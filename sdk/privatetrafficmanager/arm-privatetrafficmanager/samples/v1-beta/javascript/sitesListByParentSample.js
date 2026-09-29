// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Sites within a topology map.
 *
 * @summary lists all Sites within a topology map.
 * x-ms-original-file: 2026-02-09-preview/Sites_ListByParent_MaximumSet_Gen.json
 */
async function sitesListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sites.listByParent("rgprivateTrafficManager", "myTopologyMap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sitesListByParentMaximumSet();
}

main().catch(console.error);
