// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomImage } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing custom image. This operation can take a while to complete.
 *
 * @summary Create or replace an existing custom image. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/CustomImages_CreateOrUpdate.json
 */
async function customImagesCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{customImageName}";
  const customImage: CustomImage = {
    description: "My Custom Image",
    tags: { tagName1: "tagValue1" },
    vm: {
      linuxOsInfo: { linuxOsState: "NonDeprovisioned" },
      sourceVmId:
        "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{labName}/virtualmachines/{vmName}",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.customImages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    name,
    customImage,
  );
  console.log(result);
}

customImagesCreateOrUpdate().catch(console.error);
