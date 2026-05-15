// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a network manager security admin configuration.
 *
 * @summary creates or updates a network manager security admin configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityAdminConfigurationPut.json
 */
async function createNetworkManagerSecurityAdminConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    { description: "A sample policy", applyOnNetworkIntentPolicyBasedServices: ["None"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a network manager security admin configuration.
 *
 * @summary creates or updates a network manager security admin configuration.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityAdminConfigurationPut_ManualAggregation.json
 */
async function createManualModeSecurityAdminConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityAdminConfigurations.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    {
      description:
        "A configuration which will update any network groups ip addresses at commit times.",
      networkGroupAddressSpaceAggregationOption: "Manual",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkManagerSecurityAdminConfiguration();
  await createManualModeSecurityAdminConfiguration();
}

main().catch(console.error);
