// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of a logical network.
 *
 * @summary Gets the details of a logical network.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationLogicalNetworks_Get.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsALogicalNetworkWithSpecifiedServerIdAndLogicalNetworkName(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const logicalNetworkName = "87ab394f-165f-4aa9-bd84-b018500b4509";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationLogicalNetworks.get(
    resourceGroupName,
    resourceName,
    fabricName,
    logicalNetworkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsALogicalNetworkWithSpecifiedServerIdAndLogicalNetworkName();
}

main().catch(console.error);
