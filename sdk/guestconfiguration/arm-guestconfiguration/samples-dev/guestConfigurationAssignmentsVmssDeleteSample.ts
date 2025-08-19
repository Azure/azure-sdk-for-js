// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a guest configuration assignment for VMSS
 *
 * @summary Delete a guest configuration assignment for VMSS
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/deleteGuestConfigurationVMSSAssignment.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnGuestConfigurationAssignmentForVmss(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmssName = "myVMSSName";
  const name = "SecureProtocol";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentsVmss.delete(
    resourceGroupName,
    vmssName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnGuestConfigurationAssignmentForVmss();
}

main().catch(console.error);
