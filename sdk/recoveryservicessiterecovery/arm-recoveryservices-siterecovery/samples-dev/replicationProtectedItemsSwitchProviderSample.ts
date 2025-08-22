// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to initiate a switch provider of the replication protected item.
 *
 * @summary Operation to initiate a switch provider of the replication protected item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectedItems_SwitchProvider.json
 */

import {
  SwitchProviderInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function executeSwitchProvider(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const protectionContainerName = "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179";
  const replicatedProtectedItemName = "f8491e4f-817a-40dd-a90c-af773978c75b";
  const switchProviderInput: SwitchProviderInput = {
    properties: {
      providerSpecificDetails: {
        instanceType: "InMageAzureV2",
        targetApplianceID: "5efaa202-e958-435e-8171-706bf735fcc4",
        targetFabricID:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud2",
        targetVaultID:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault2",
      },
      targetInstanceType: "InMageRcm",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectedItems.beginSwitchProviderAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicatedProtectedItemName,
      switchProviderInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executeSwitchProvider();
}

main().catch(console.error);
