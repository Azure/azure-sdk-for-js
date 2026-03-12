// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Disconnect a data connector.
 *
 * @summary Disconnect a data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/DisconnectAPIPolling.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function disconnectAnApiPollingDataConnector(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "316ec55e-7138-4d63-ab18-90c8a60fd1c8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.disconnect(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disconnectAnApiPollingDataConnector();
}

main().catch(console.error);
