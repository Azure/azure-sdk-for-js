// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details
 *
 * @summary Triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/NetworkConnections_RunHealthChecks.json
 */

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkConnectionsRunHealthChecks(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const networkConnectionName = "uswest3network";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.beginRunHealthChecksAndWait(
    resourceGroupName,
    networkConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkConnectionsRunHealthChecks();
}

main().catch(console.error);
