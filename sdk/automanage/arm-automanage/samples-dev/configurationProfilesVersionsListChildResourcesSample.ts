// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of configuration profile version for a configuration profile
 *
 * @summary Retrieve a list of configuration profile version for a configuration profile
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listConfigurationProfileVersions.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listConfigurationProfileVersionsByConfigurationProfile(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const configurationProfileName = "customConfigurationProfile";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "myResourceGroupName";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationProfilesVersions.listChildResources(
    configurationProfileName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConfigurationProfileVersionsByConfigurationProfile();
}

main().catch(console.error);
