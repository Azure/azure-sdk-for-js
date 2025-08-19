// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the managed application definitions in a resource group.
 *
 * @summary Lists the managed application definitions in a resource group.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/listApplicationDefinitionsByResourceGroup.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsTheManagedApplicationDefinitionsInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationDefinitions.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheManagedApplicationDefinitionsInAResourceGroup();
}

main().catch(console.error);
