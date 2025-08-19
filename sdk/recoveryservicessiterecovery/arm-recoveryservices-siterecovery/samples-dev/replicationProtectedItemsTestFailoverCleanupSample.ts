// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TestFailoverCleanupInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to clean up the test failover of a replication protected item.
 *
 * @summary Operation to clean up the test failover of a replication protected item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectedItems_TestFailoverCleanup.json
 */
async function executeTestFailoverCleanup(): Promise<void> {
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
  const cleanupInput: TestFailoverCleanupInput = {
    properties: { comments: "Test Failover Cleanup" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectedItems.beginTestFailoverCleanupAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicatedProtectedItemName,
      cleanupInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executeTestFailoverCleanup();
}

main().catch(console.error);
