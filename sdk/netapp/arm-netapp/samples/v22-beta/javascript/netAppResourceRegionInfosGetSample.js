// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides storage to network proximity and logical zone mapping information.
 *
 * @summary provides storage to network proximity and logical zone mapping information.
 * x-ms-original-file: 2025-07-01-preview/RegionInfos_Get.json
 */
async function regionInfosGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceRegionInfos.get("eastus");
  console.log(result);
}

async function main() {
  await regionInfosGet();
}

main().catch(console.error);
