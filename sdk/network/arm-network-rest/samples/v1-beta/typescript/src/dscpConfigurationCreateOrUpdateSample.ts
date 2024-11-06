// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  DscpConfigurationCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a DSCP Configuration.
 *
 * @summary Creates or updates a DSCP Configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/DscpConfigurationCreate.json
 */
async function createDscpConfiguration() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const dscpConfigurationName = "mydscpconfig";
  const options: DscpConfigurationCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        qosDefinitionCollection: [
          {
            destinationIpRanges: [
              { endIP: "127.0.10.2", startIP: "127.0.10.1" }
            ],
            destinationPortRanges: [{ end: 15, start: 15 }],
            markings: [1],
            sourceIpRanges: [{ endIP: "127.0.0.2", startIP: "127.0.0.1" }],
            sourcePortRanges: [
              { end: 11, start: 10 },
              { end: 21, start: 20 }
            ],
            protocol: "Tcp"
          },
          {
            destinationIpRanges: [{ endIP: "12.0.10.2", startIP: "12.0.10.1" }],
            destinationPortRanges: [{ end: 52, start: 51 }],
            markings: [2],
            sourceIpRanges: [{ endIP: "12.0.0.2", startIP: "12.0.0.1" }],
            sourcePortRanges: [{ end: 12, start: 11 }],
            protocol: "Udp"
          }
        ]
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dscpConfigurations/{dscpConfigurationName}",
      subscriptionId,
      resourceGroupName,
      dscpConfigurationName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createDscpConfiguration().catch(console.error);
