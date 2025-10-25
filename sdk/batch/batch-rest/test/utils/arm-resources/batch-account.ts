// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchAccount, BatchAccountCreateParameters } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createTestCredential } from "@azure-tools/test-credential";

/**
 * Helper function to check if a batch account exists and return it if found.
 * Returns undefined if the account does not exist.
 */
async function getExistingBatchAccount(
  client: BatchManagementClient,
  resourceGroupName: string,
  accountName: string,
): Promise<BatchAccount | undefined> {
  try {
    const existingAccount = await client.batchAccountOperations.get(resourceGroupName, accountName);
    console.log(`Batch account ${accountName} already exists.`);
    return existingAccount;
  } catch (error) {
    if (error instanceof RestError && error.statusCode === 404) {
      // Account does not exist, proceed to create
      console.log(`Batch account ${accountName} does not exist. Creating a new one.`);
      return undefined;
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
): Promise<BatchAccount> {
  const subscriptionId = getSubscriptionId();
  const resourceGroupName = getResourceGroupName();
  const client = new BatchManagementClient(createTestCredential(), subscriptionId);

  // Check if the account already exists
  const existingAccount = await getExistingBatchAccount(client, resourceGroupName, accountName);
  if (existingAccount) {
    return existingAccount;
  }

  // Create the account
  const res = await client.batchAccountOperations.beginCreateAndWait(
    resourceGroupName,
    accountName,
    parameters,
  );
  return res;
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
