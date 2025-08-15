// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  UpdateVCenterRequest,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to update a registered vCenter.
 *
 * @summary The operation to update a registered vCenter.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationvCenters_Update.json
 */
async function updateVCenterOperation(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "MadhaviVRG";
  const resourceName = "MadhaviVault";
  const fabricName = "MadhaviFabric";
  const vcenterName = "esx-78";
  const updateVCenterRequest: UpdateVCenterRequest = {
    properties: { ipAddress: "10.150.109.25" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    fabricName,
    vcenterName,
    updateVCenterRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVCenterOperation();
}

main().catch(console.error);
