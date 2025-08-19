// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of Network Experiment Profiles within a resource group under a subscription
 *
 * @summary Gets a list of Network Experiment Profiles within a resource group under a subscription
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentListProfiles.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listNetworkExperimentProfilesInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkExperimentProfiles.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkExperimentProfilesInAResourceGroup();
}

main().catch(console.error);
