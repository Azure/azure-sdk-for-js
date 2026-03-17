// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the details of an Azure Site recovery event.
 *
 * @summary the operation to get the details of an Azure Site recovery event.
 * x-ms-original-file: 2025-08-01/ReplicationEvents_Get.json
 */
async function getTheDetailsOfAnAzureSiteRecoveryEvent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationEvents.get(
    "resourceGroupPS1",
    "vault1",
    "654b71d0-b2ce-4e6e-a861-98528d4bd375",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheDetailsOfAnAzureSiteRecoveryEvent();
}

main().catch(console.error);
