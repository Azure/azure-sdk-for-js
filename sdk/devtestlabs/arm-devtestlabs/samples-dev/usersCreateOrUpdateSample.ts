// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or replace an existing user profile. This operation can take a while to complete.
 *
 * @summary Create or replace an existing user profile. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Users_CreateOrUpdate.json
 */

import type { User } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function usersCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{devtestlabName}";
  const name = "{userName}";
  const user: User = {
    identity: {
      appId: "{appId}",
      objectId: "{objectId}",
      principalId: "{principalId}",
      principalName: "{principalName}",
      tenantId: "{tenantId}",
    },
    location: "{location}",
    secretStore: { keyVaultId: "{keyVaultId}", keyVaultUri: "{keyVaultUri}" },
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.users.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    name,
    user,
  );
  console.log(result);
}

usersCreateOrUpdate().catch(console.error);
