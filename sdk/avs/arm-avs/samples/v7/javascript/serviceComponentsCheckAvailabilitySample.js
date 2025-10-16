// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return service component availability
 *
 * @summary return service component availability
 * x-ms-original-file: 2025-09-01/ServiceComponents_CheckAvailability.json
 */
async function serviceComponentsCheckAvailabilitySpecificComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.serviceComponents.checkAvailability("westus2", "all");
}

async function main() {
  await serviceComponentsCheckAvailabilitySpecificComponent();
}

main().catch(console.error);
