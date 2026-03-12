// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to switch protection from one container to another or one replication provider to another.
 *
 * @summary Operation to switch protection from one container to another or one replication provider to another.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionContainers_SwitchProtection.json
 */

import {
  SwitchProtectionInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "priyanprg";
  const resourceName = "priyanponeboxvault";
  const fabricName = "CentralUSCanSite";
  const protectionContainerName = "CentralUSCancloud";
  const switchInput: SwitchProtectionInput = {
    properties: {
      providerSpecificDetails: { instanceType: "A2A" },
      replicationProtectedItemName: "a2aSwapOsVm",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectionContainers.beginSwitchProtectionAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      switchInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother();
}

main().catch(console.error);
