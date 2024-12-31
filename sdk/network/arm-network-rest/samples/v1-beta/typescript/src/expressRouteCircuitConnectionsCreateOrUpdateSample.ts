// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteCircuitConnectionsCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a Express Route Circuit Connection in the specified express route circuits.
 *
 * @summary Creates or updates a Express Route Circuit Connection in the specified express route circuits.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCircuitConnectionCreate.json
 */
async function expressRouteCircuitConnectionCreate() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const connectionName = "circuitConnectionUSAUS";
  const options: ExpressRouteCircuitConnectionsCreateOrUpdateParameters = {
    body: {
      properties: {
        addressPrefix: "10.0.0.0/29",
        authorizationKey: "946a1918-b7a2-4917-b43c-8c4cdaee006a",
        expressRouteCircuitPeering: {
          id:
            "/subscriptions/subid1/resourceGroups/dedharcktinit/providers/Microsoft.Network/expressRouteCircuits/dedharcktlocal/peerings/AzurePrivatePeering"
        },
        ipv6CircuitConnectionConfig: { addressPrefix: "aa:bb::/125" },
        peerExpressRouteCircuitPeering: {
          id:
            "/subscriptions/subid2/resourceGroups/dedharcktpeer/providers/Microsoft.Network/expressRouteCircuits/dedharcktremote/peerings/AzurePrivatePeering"
        }
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      circuitName,
      peeringName,
      connectionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

expressRouteCircuitConnectionCreate().catch(console.error);
