// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of a registered vCenter server(Add vCenter server).
 *
 * @summary Gets the details of a registered vCenter server(Add vCenter server).
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationvCenters_Get.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheDetailsOfAVCenter(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "MadhaviVRG";
  const resourceName = "MadhaviVault";
  const fabricName = "MadhaviFabric";
  const vcenterName = "esx-78";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.get(
    resourceGroupName,
    resourceName,
    fabricName,
    vcenterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfAVCenter();
}

main().catch(console.error);
