// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the registered recovery services providers for the specified fabric.
 *
 * @summary Lists the registered recovery services providers for the specified fabric.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationRecoveryServicesProviders_ListByReplicationFabrics.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheListOfRegisteredRecoveryServicesProvidersForTheFabric(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationRecoveryServicesProviders.listByReplicationFabrics(
    resourceGroupName,
    resourceName,
    fabricName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfRegisteredRecoveryServicesProvidersForTheFabric();
}

main().catch(console.error);
