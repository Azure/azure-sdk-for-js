// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Experiment
 *
 * @summary deletes an Experiment
 * x-ms-original-file: 2025-10-01/NetworkExperimentDeleteExperiment.json
 */
async function deletesAnExperiment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.experiments.delete("MyResourceGroup", "MyProfile", "MyExperiment");
}

async function main(): Promise<void> {
  await deletesAnExperiment();
}

main().catch(console.error);
