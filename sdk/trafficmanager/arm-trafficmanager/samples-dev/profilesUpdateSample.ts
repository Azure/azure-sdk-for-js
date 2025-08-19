// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Traffic Manager profile.
 *
 * @summary Update a Traffic Manager profile.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-PATCH-MonitorConfig.json
 */

import type { Profile } from "@azure/arm-trafficmanager";
import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function profilePatchMonitorConfig(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager2583";
  const profileName = "azuresdkfornetautoresttrafficmanager6192";
  const parameters: Profile = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.update(resourceGroupName, profileName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await profilePatchMonitorConfig();
}

main().catch(console.error);
