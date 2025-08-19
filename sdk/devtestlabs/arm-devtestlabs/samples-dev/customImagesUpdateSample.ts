// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomImageFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Allows modifying tags of custom images. All other properties will be ignored.
 *
 * @summary Allows modifying tags of custom images. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/CustomImages_Update.json
 */
async function customImagesUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{customImageName}";
  const customImage: CustomImageFragment = { tags: { tagName1: "tagValue2" } };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.customImages.update(resourceGroupName, labName, name, customImage);
  console.log(result);
}

customImagesUpdate().catch(console.error);
