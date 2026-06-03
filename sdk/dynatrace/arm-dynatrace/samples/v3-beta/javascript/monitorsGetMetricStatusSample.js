// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get metric status
 *
 * @summary get metric status
 * x-ms-original-file: 2024-04-24/Monitors_GetMetricStatus_MaximumSet_Gen.json
 */
async function monitorsGetMetricStatusMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1d701e7e-3150-4d33-9279-d4ea03e9110e";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus(
    "rgDynatrace",
    "fhcjxnxumkdlgpwanewtkdnyuz",
    {
      request: {
        monitoredResourceIds: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/publicIPAddresses/00000000-0000-0000-0000-000000000000",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get metric status
 *
 * @summary get metric status
 * x-ms-original-file: 2024-04-24/Monitors_GetMetricStatus_MinimumSet_Gen.json
 */
async function monitorsGetMetricStatusMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1d701e7e-3150-4d33-9279-d4ea03e9110e";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus("rgDynatrace", "fhcjxnxumkdlgpwanewtkdnyuz");
  console.log(result);
}

async function main() {
  await monitorsGetMetricStatusMaximumSetGen();
  await monitorsGetMetricStatusMinimumSetGen();
}

main().catch(console.error);
