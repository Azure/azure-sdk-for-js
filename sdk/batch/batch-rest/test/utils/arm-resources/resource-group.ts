// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-unused-expressions */

import { createTestCredential } from "@azure-tools/test-credential";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";
import { ResourceManagementClient } from "@azure/arm-resources";

export async function createTestResourceGroup(): Promise<void> {
  const subscriptionId = getSubscriptionId();

  const resourceClient = new ResourceManagementClient(createTestCredential(), subscriptionId);

  await resourceClient.resourceGroups.createOrUpdate(getResourceGroupName(), {
    location: getLocation(),
  });
}

export async function deleteTestResourceGroup(): Promise<void> {
  const subscriptionId = getSubscriptionId();
  const resourceClient = new ResourceManagementClient(createTestCredential(), subscriptionId);
  await resourceClient.resourceGroups.beginDeleteAndWait(getResourceGroupName());
}
