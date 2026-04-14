// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: 2024-04-01-preview/NameAvailabilityV2Test_NameAvailable-POST-example-21.json
 */
async function nameAvailabilityV2TestNameAvailablePost21() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerNameAvailabilityV2({
    name: "azsmnet5403",
    type: "microsoft.network/trafficmanagerprofiles",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: 2024-04-01-preview/NameAvailabilityV2Test_NameNotAvailable-POST-example-23.json
 */
async function nameAvailabilityV2TestNameNotAvailablePost23() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerNameAvailabilityV2({
    name: "azsmnet4696",
    type: "microsoft.network/trafficmanagerprofiles",
  });
  console.log(result);
}

async function main() {
  await nameAvailabilityV2TestNameAvailablePost21();
  await nameAvailabilityV2TestNameNotAvailablePost23();
}

main().catch(console.error);
