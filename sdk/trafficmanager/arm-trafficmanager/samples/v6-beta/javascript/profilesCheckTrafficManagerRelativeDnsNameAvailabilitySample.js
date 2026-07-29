// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: 2024-04-01-preview/NameAvailabilityTest_NameAvailable-POST-example-21.json
 */
async function nameAvailabilityTestNameAvailablePost21() {
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential);
  const result = await client.profiles.checkTrafficManagerRelativeDnsNameAvailability({
    name: "azsmnet5403",
    type: "microsoft.network/trafficmanagerprofiles",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: 2024-04-01-preview/NameAvailabilityTest_NameNotAvailable-POST-example-23.json
 */
async function nameAvailabilityTestNameNotAvailablePost23() {
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential);
  const result = await client.profiles.checkTrafficManagerRelativeDnsNameAvailability({
    name: "azsmnet4696",
    type: "microsoft.network/trafficmanagerprofiles",
  });
  console.log(result);
}

async function main() {
  await nameAvailabilityTestNameAvailablePost21();
  await nameAvailabilityTestNameNotAvailablePost23();
}

main().catch(console.error);
