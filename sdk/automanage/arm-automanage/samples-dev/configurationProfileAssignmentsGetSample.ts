// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get information about a configuration profile assignment
 *
 * @summary Get information about a configuration profile assignment
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/getConfigurationProfileAssignment.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAConfigurationProfileAssignment(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const configurationProfileAssignmentName = "default";
  const vmName = "myVMName";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.configurationProfileAssignments.get(
    resourceGroupName,
    configurationProfileAssignmentName,
    vmName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAConfigurationProfileAssignment();
}

main().catch(console.error);
