// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get farmBeats extension.
 *
 * @summary Get farmBeats extension.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsExtensions_Get.json
 */

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

async function farmBeatsExtensionsGet(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const farmBeatsExtensionId = "DTN.ContentServices";
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.farmBeatsExtensions.get(farmBeatsExtensionId);
  console.log(result);
}

farmBeatsExtensionsGet().catch(console.error);
