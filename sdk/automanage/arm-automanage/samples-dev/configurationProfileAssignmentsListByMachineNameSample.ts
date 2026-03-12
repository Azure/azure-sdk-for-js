// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get list of configuration profile assignments
 *
 * @summary Get list of configuration profile assignments
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listConfigurationProfileAssignmentsByMachineName.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listConfigurationProfileAssignmentsByResourceGroupAndMachine(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const machineName = "myMachineName";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationProfileAssignments.listByMachineName(
    resourceGroupName,
    machineName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfigurationProfileAssignmentsByResourceGroupAndMachine();
}

main().catch(console.error);
