// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Lab } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing lab. This operation can take a while to complete.
 *
 * @summary Create or replace an existing lab. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Labs_CreateOrUpdate.json
 */
async function labsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const name = "{labName}";
  const lab: Lab = {
    labStorageType: "{Standard|Premium}",
    location: "{location}",
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.labs.beginCreateOrUpdateAndWait(resourceGroupName, name, lab);
  console.log(result);
}

labsCreateOrUpdate().catch(console.error);
