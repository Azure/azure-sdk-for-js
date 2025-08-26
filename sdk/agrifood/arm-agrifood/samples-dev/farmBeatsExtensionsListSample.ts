// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get list of farmBeats extension.
 *
 * @summary Get list of farmBeats extension.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsExtensions_List.json
 */

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

async function farmBeatsExtensionsList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.farmBeatsExtensions.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

farmBeatsExtensionsList().catch(console.error);
