// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Install extension.
 *
 * @summary Install extension.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/Extensions_Create.json
 */
async function extensionsCreate(): Promise<void> {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmbeatsResourceName";
  const extensionId = "provider.extension";
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.extensions.create(
    resourceGroupName,
    farmBeatsResourceName,
    extensionId,
  );
  console.log(result);
}

extensionsCreate().catch(console.error);
