// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 *
 * @summary Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkWatcherNetworkConfigurationDiagnostic.json
 */
async function networkConfigurationDiagnostic() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkWatcherName = "nw1";
  const options = {
    body: {
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
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/networkConfigurationDiagnostic",
      subscriptionId,
      resourceGroupName,
      networkWatcherName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

networkConfigurationDiagnostic().catch(console.error);
