// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all private endpoint connections on a private link scope.
 *
 * @summary Gets all private endpoint connections on a private link scope.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2021-07-01-preview/examples/PrivateEndpointConnectionList.json
 */

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const scopeName = "MyPrivateLinkScope";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.listByPrivateLinkScope(
    resourceGroupName,
    scopeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope();
}

main().catch(console.error);
