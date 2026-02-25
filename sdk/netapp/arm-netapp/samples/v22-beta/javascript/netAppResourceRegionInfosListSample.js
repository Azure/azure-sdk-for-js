// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides region specific information.
 *
 * @summary provides region specific information.
 * x-ms-original-file: 2025-09-01-preview/RegionInfos_List.json
 */
async function regionInfosList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.netAppResourceRegionInfos.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await regionInfosList();
}

main().catch(console.error);
