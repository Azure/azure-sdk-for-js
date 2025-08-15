// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to get the details of an Azure Site recovery event.
 *
 * @summary The operation to get the details of an Azure Site recovery event.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationEvents_Get.json
 */
async function getTheDetailsOfAnAzureSiteRecoveryEvent(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const eventName = "654b71d0-b2ce-4e6e-a861-98528d4bd375";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationEvents.get(
    resourceGroupName,
    resourceName,
    eventName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheDetailsOfAnAzureSiteRecoveryEvent();
}

main().catch(console.error);
