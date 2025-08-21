// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a private endpoint connection.
 *
 * @summary Update a private endpoint connection.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/PrivateEndpointConnections_Update.json
 */

import type { PrivateEndpointConnection } from "@azure/arm-iotcentral";
import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function privateEndpointConnectionsUpdate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "resRg";
  const resourceName = "myIoTCentralApp";
  const privateEndpointConnectionName = "myIoTCentralAppEndpoint";
  const privateEndpointConnection: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Auto-approved",
      actionsRequired: "None",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
    privateEndpointConnection,
  );
  console.log(result);
}

privateEndpointConnectionsUpdate().catch(console.error);
