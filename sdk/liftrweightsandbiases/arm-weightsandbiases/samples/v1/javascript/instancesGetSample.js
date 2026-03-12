// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WeightsAndBiasesClient } = require("@azure/arm-weightsandbiases");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a InstanceResource
 *
 * @summary get a InstanceResource
 * x-ms-original-file: 2024-09-18/Instances_Get_MaximumSet_Gen.json
 */
async function instancesGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const result = await client.instances.get("rgopenapi", "myinstance");
  console.log(result);
}

async function main() {
  await instancesGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
