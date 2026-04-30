// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DdosCustomPolicy} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a DDoS custom policy.
 *
 * @summary Creates or updates a DDoS custom policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DdosCustomPolicyCreate.json
 */
async function createDDoSCustomPolicy(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const ddosCustomPolicyName = "test-ddos-custom-policy";
  const parameters: DdosCustomPolicy = {
    detectionRules: [
      {
        name: "detectionRuleTcp",
        detectionMode: "TrafficThreshold",
        trafficDetectionRule: { packetsPerSecond: 1000000, trafficType: "Tcp" },
      },
    ],
    location: "centraluseuap",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosCustomPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    ddosCustomPolicyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDDoSCustomPolicy();
}

main().catch(console.error);
