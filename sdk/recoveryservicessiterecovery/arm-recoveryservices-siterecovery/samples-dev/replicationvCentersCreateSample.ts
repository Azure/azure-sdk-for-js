// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AddVCenterRequest,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to create a vCenter object..
 *
 * @summary The operation to create a vCenter object..
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationvCenters_Create.json
 */
async function addVCenter(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "MadhaviVRG";
  const resourceName = "MadhaviVault";
  const fabricName = "MadhaviFabric";
  const vcenterName = "esx-78";
  const addVCenterRequest: AddVCenterRequest = {
    properties: {
      friendlyName: "esx-78",
      ipAddress: "inmtest78",
      port: "443",
      processServerId: "5A720CAB-39CB-F445-BD1662B0B33164B5",
      runAsAccountId: "2",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    fabricName,
    vcenterName,
    addVCenterRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addVCenter();
}

main().catch(console.error);
