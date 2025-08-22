// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of registered recovery services provider.
 *
 * @summary Gets the details of registered recovery services provider.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationRecoveryServicesProviders_Get.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheDetailsOfARecoveryServicesProvider(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const providerName = "241641e6-ee7b-4ee4-8141-821fadda43fa";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryServicesProviders.get(
    resourceGroupName,
    resourceName,
    fabricName,
    providerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfARecoveryServicesProvider();
}

main().catch(console.error);
