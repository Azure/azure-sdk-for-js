// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesClient } from "@azure/arm-weightsandbiases";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a InstanceResource
 *
 * @summary update a InstanceResource
 * x-ms-original-file: 2024-09-18/Instances_Update_MaximumSet_Gen.json
 */
async function instancesUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const result = await client.instances.update("rgopenapi", "myinstance", {
    tags: {},
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await instancesUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
