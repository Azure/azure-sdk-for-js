// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a cost control.
 *
 * @summary gets a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/get.json
 */
async function getACostControlWithAllSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.costControls.get(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a cost control.
 *
 * @summary gets a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/getLegacy.json
 */
async function readALegacyCostControlWithoutAuthoringItsLegacyValues() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.costControls.get(
    "foundry-resource-group",
    "foundry-account",
    "legacy-budget",
  );
  console.log(result);
}

async function main() {
  await getACostControlWithAllSettings();
  await readALegacyCostControlWithoutAuthoringItsLegacyValues();
}

main().catch(console.error);
