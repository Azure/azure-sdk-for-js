// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides storage to network proximity and logical zone mapping information.
 *
 * @summary provides storage to network proximity and logical zone mapping information.
 * x-ms-original-file: 2025-09-01-preview/RegionInfos_Get.json
 */
async function regionInfosGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceRegionInfos.get("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await regionInfosGet();
}

main().catch(console.error);
