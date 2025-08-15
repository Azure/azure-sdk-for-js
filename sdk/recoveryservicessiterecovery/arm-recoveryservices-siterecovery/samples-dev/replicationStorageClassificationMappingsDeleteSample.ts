// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to delete a storage classification mapping.
 *
 * @summary The operation to delete a storage classification mapping.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationStorageClassificationMappings_Delete.json
 */
async function deleteAStorageClassificationMapping(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName =
    "2a48e3770ac08aa2be8bfbd94fcfb1cbf2dcc487b78fb9d3bd778304441b06a0";
  const storageClassificationName = "8891569e-aaef-4a46-a4a0-78c14f2d7b09";
  const storageClassificationMappingName = "testStorageMapping";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationStorageClassificationMappings.beginDeleteAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      storageClassificationName,
      storageClassificationMappingName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAStorageClassificationMapping();
}

main().catch(console.error);
