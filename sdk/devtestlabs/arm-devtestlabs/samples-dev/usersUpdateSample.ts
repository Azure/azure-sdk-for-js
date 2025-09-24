// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Allows modifying tags of user profiles. All other properties will be ignored.
 *
 * @summary Allows modifying tags of user profiles. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Users_Update.json
 */

import type { UserFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function usersUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{devtestlabName}";
  const name = "{userName}";
  const user: UserFragment = { tags: { tagName1: "tagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.users.update(resourceGroupName, labName, name, user);
  console.log(result);
}

usersUpdate().catch(console.error);
