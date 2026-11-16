// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the optional singleton change data capture capability for a cluster. The result contains zero or one item.
 *
 * @summary lists the optional singleton change data capture capability for a cluster. The result contains zero or one item.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_List.json
 */
async function listTheOptionalClusterChangeDataCaptureCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.changeDataCaptureCapabilities.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheOptionalClusterChangeDataCaptureCapability();
}

main().catch(console.error);
