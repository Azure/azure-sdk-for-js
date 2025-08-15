// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Experiment } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Experiment
 *
 * @summary Creates or updates an Experiment
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentCreateExperiment.json
 */
async function createsAnExperiment(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const profileName = "MyProfile";
  const experimentName = "MyExperiment";
  const parameters: Experiment = {
    description: "this is my first experiment!",
    enabledState: "Enabled",
    endpointA: { name: "endpoint A", endpoint: "endpointA.net" },
    endpointB: { name: "endpoint B", endpoint: "endpointB.net" },
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    profileName,
    experimentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAnExperiment();
}

main().catch(console.error);
