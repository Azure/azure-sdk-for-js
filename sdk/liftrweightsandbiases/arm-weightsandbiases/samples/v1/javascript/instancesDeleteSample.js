// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WeightsAndBiasesClient } = require("@azure/arm-weightsandbiases");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a InstanceResource
 *
 * @summary delete a InstanceResource
 * x-ms-original-file: 2024-09-18/Instances_Delete_MaximumSet_Gen.json
 */
async function instancesDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  await client.instances.delete("rgopenapi", "myinstance");
}

async function main() {
  await instancesDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
