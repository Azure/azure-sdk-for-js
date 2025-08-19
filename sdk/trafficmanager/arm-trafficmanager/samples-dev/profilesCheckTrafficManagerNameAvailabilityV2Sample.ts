// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary Checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityV2Test_NameAvailable-POST-example-21.json
 */

import type { CheckTrafficManagerRelativeDnsNameAvailabilityParameters } from "@azure/arm-trafficmanager";
import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameAvailabilityV2TestNameAvailablePost21(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters = {
    name: "azsmnet5403",
    type: "microsoft.network/trafficmanagerprofiles",
  };
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerNameAvailabilityV2(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary Checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityV2Test_NameNotAvailable-POST-example-23.json
 */
async function nameAvailabilityV2TestNameNotAvailablePost23(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters = {
    name: "azsmnet4696",
    type: "microsoft.network/trafficmanagerprofiles",
  };
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerNameAvailabilityV2(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await nameAvailabilityV2TestNameAvailablePost21();
  await nameAvailabilityV2TestNameNotAvailablePost23();
}

main().catch(console.error);
