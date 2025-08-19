// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all guest configuration assignments for VMSS.
 *
 * @summary List all guest configuration assignments for VMSS.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/listVMSSGuestConfigurationAssignments.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllGuestConfigurationAssignmentsForVmss(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmssName = "myVMSSName";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignmentsVmss.list(
    resourceGroupName,
    vmssName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllGuestConfigurationAssignmentsForVmss();
}

main().catch(console.error);
