// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary Checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityTest_NameAvailable-POST-example-21.json
 */

import type { CheckTrafficManagerRelativeDnsNameAvailabilityParameters } from "@azure/arm-trafficmanager";
import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameAvailabilityTestNameAvailablePost21(): Promise<void> {
  const subscriptionId =
    process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters = {
    name: "azsmnet5403",
    type: "microsoft.network/trafficmanagerprofiles",
  };
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerRelativeDnsNameAvailability(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Checks the availability of a Traffic Manager Relative DNS name.
 *
 * @summary Checks the availability of a Traffic Manager Relative DNS name.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/NameAvailabilityTest_NameNotAvailable-POST-example-23.json
 */
async function nameAvailabilityTestNameNotAvailablePost23(): Promise<void> {
  const subscriptionId =
    process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters = {
    name: "azsmnet4696",
    type: "microsoft.network/trafficmanagerprofiles",
  };
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.checkTrafficManagerRelativeDnsNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await nameAvailabilityTestNameAvailablePost21();
  await nameAvailabilityTestNameNotAvailablePost23();
}

main().catch(console.error);
