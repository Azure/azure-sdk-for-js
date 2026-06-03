// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SSO configuration details from the partner.
 *
 * @summary gets the SSO configuration details from the partner.
 * x-ms-original-file: 2024-04-24/Monitors_GetSSODetails_MaximumSet_Gen.json
 */
async function monitorsGetSSODetailsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getSSODetails("myResourceGroup", "myMonitor", {
    request: { userPrincipal: "alice@microsoft.com" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets the SSO configuration details from the partner.
 *
 * @summary gets the SSO configuration details from the partner.
 * x-ms-original-file: 2024-04-24/Monitors_GetSSODetails_MinimumSet_Gen.json
 */
async function monitorsGetSSODetailsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getSSODetails("myResourceGroup", "myMonitor", {
    request: { userPrincipal: "alice@microsoft.com" },
  });
  console.log(result);
}

async function main() {
  await monitorsGetSSODetailsMaximumSetGen();
  await monitorsGetSSODetailsMinimumSetGen();
}

main().catch(console.error);
