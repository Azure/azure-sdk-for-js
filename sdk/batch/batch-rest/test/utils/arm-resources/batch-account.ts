// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchAccount } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { getArmCredential } from "../credential.js";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";
import { RestError } from "@azure/core-rest-pipeline";

export async function createByosBatchAccount(
  accountName: string,
  keyVaultResourceId: string,
  keyVaultUrl: string,
  retryCnt: number = 3,
): Promise<BatchAccount> {
  // Note: the provided subscription must be registered for the "Microsoft.Batch" resource provider
  // see https://learn.microsoft.com/en-us/azure/batch/batch-account-create-portal#allow-batch-to-access-the-subscription
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();

  const client = new BatchManagementClient(getArmCredential(), subscriptionId);
  try {
    const res = await client.batchAccountOperations.beginCreateAndWait(
      resourceGroupName,
      accountName,
      {
        identity: {
          type: "SystemAssigned",
        },
        location: getLocation(),
        poolAllocationMode: "UserSubscription",
        keyVaultReference: {
          id: keyVaultResourceId,
          url: keyVaultUrl,
        },
      },
    );
    return res;
  } catch (error) {
    console.error("Error creating BYOS Batch Account:", error);

    // Sometime the key vault role assignment may not have propagated yet, resulting in an
    // InvalidKeyVaultReference error. Retry a few times before failing.
    if (error instanceof RestError && retryCnt > 0) {
      if (error.code === "InvalidKeyVaultReference") {
        console.log("Retrying due to invalid Key Vault reference...");
        return createByosBatchAccount(accountName, keyVaultResourceId, keyVaultUrl, retryCnt - 1);
      }
    }
    throw error;
  }
}

export async function deleteBatchAccount(accountName: string): Promise<void> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(getArmCredential(), subscriptionId);
  await client.batchAccountOperations.beginDeleteAndWait(resourceGroupName, accountName);
}
