// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 *
 * @summary Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherNetworkConfigurationDiagnostic.json
 */
async function networkConfigurationDiagnostic() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const parameters = {
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
      "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.beginGetNetworkConfigurationDiagnosticAndWait(
    resourceGroupName,
    networkWatcherName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await networkConfigurationDiagnostic();
}

main().catch(console.error);
