// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an Experiment by ExperimentName
 *
 * @summary Gets an Experiment by ExperimentName
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetExperiment.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsAnExperimentByExperimentName(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const profileName = "MyProfile";
  const experimentName = "MyExperiment";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.get(resourceGroupName, profileName, experimentName);
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnExperimentByExperimentName();
}

main().catch(console.error);
