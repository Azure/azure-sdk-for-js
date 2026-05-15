// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 *
 * @summary gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 * x-ms-original-file: 2025-05-01/NetworkWatcherNetworkConfigurationDiagnostic.json
 */
async function networkConfigurationDiagnostic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getNetworkConfigurationDiagnostic("rg1", "nw1", {
    profiles: [
      {
        destination: "12.11.12.14",
        destinationPort: "12100",
        direction: "Inbound",
        source: "10.1.0.4",
        protocol: "TCP",
      },
    ],
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkConfigurationDiagnostic();
}

main().catch(console.error);
