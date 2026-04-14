// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Traffic Manager profile.
 *
 * @summary update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PATCH-MonitorConfig.json
 */
async function profilePatchMonitorConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.updateV2(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    {
      properties: {
        monitorConfig: {
          path: "/testpath.aspx",
          customHeaders: [
            { name: "header-1", value: "value-1" },
            { name: "header-2", value: "value-2" },
          ],
          intervalInSeconds: 30,
          port: 80,
          timeoutInSeconds: 6,
          toleratedNumberOfFailures: 4,
          protocol: "HTTP",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Traffic Manager profile.
 *
 * @summary update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PATCH-RecordType.json
 */
async function profilePatchRecordType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.updateV2(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    { properties: { recordType: "CNAME" } },
  );
  console.log(result);
}

async function main() {
  await profilePatchMonitorConfig();
  await profilePatchRecordType();
}

main().catch(console.error);
