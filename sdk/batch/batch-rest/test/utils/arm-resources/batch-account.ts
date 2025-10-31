// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchAccount, BatchAccountCreateParameters } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createTestCredential } from "@azure-tools/test-credential";

/**
 * Helper function to check if a batch account exists and return it if found exists.
 * @param accountName - The name of the batch account to check.
 * @param returnUndefinedIfNotFound - If true, returns undefined when the account is not found instead of throwing.
 */
export async function getExistingBatchAccount<T extends boolean = false>(
  accountName: string,
  returnUndefinedIfNotFound?: T,
): Promise<T extends true ? BatchAccount | undefined : BatchAccount> {
  try {
    const subscriptionId = getSubscriptionId();
    const resourceGroupName = getResourceGroupName();
    const client = new BatchManagementClient(createTestCredential(), subscriptionId);
    const existingAccount = await client.batchAccountOperations.get(resourceGroupName, accountName);
    return existingAccount;
  } catch (error) {
    if (error instanceof RestError && error.statusCode === 404) {
      if (returnUndefinedIfNotFound === true) {
        return undefined as T extends true ? BatchAccount | undefined : BatchAccount;
      }
    }
    throw error;
  }
}

/**
 * Helper function to create a batch account with the given parameters.
 */
async function createBatchAccountInternal(
  accountName: string,
  parameters: BatchAccountCreateParameters,
  retryCnt: number = 3,
): Promise<BatchAccount> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(createTestCredential(), subscriptionId);

  // Check if the account already exists
  const existingAccount = await getExistingBatchAccount(accountName, true);
  if (existingAccount) {
    return existingAccount;
  }

  try {
    // Create the account
    const res = await client.batchAccountOperations.beginCreateAndWait(
      resourceGroupName,
      accountName,
      parameters,
    );
    return res;
  } catch (error) {
    console.dir(error, { depth: null });
    if (error instanceof RestError && error.code === "The specified account is being created.") {
      // Handle conflict error if the account was created in the meantime
      console.log(`Batch account ${accountName} was created by another process. Retrieving it.`);
      return createBatchAccountInternal(accountName, parameters, retryCnt - 1);
    }
    throw error;
  }
}

export async function createHoboBatchAccount(accountName: string): Promise<BatchAccount> {
  return createBatchAccountInternal(accountName, {
    allowedAuthenticationModes: ["SharedKey", "AAD"],
    identity: {
      type: "SystemAssigned",
    },
    location: getLocation(),
    poolAllocationMode: "BatchService",
  });
}

export async function createByosBatchAccount(
  accountName: string,
  keyVaultResourceId: string,
  keyVaultUrl: string,
  retryCnt: number = 3,
): Promise<BatchAccount> {
  try {
    return await createBatchAccountInternal(accountName, {
      identity: {
        type: "SystemAssigned",
      },
      location: getLocation(),
      poolAllocationMode: "UserSubscription",
      keyVaultReference: {
        id: keyVaultResourceId,
        url: keyVaultUrl,
      },
    });
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

export async function getBatchAccountKeys(
  accountName: string,
): Promise<{ primary: string; secondary: string }> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(createTestCredential(), subscriptionId);
  const keys = await client.batchAccountOperations.getKeys(resourceGroupName, accountName);
  return {
    primary: keys.primary!,
    secondary: keys.secondary!,
  };
}

export async function deleteBatchAccount(accountName: string): Promise<void> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(createTestCredential(), subscriptionId);
  await client.batchAccountOperations.beginDeleteAndWait(resourceGroupName, accountName);
}
