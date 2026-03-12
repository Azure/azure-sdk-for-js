// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of configuration profile within a given resource group
 *
 * @summary Retrieve a list of configuration profile within a given resource group
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listConfigurationProfilesByResourceGroup.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listConfigurationProfilesByResourceGroup(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationProfiles.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfigurationProfilesByResourceGroup();
}

main().catch(console.error);
