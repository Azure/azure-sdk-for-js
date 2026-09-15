// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Agent Connector
 *
 * @summary creates or updates an Agent Connector
 * x-ms-original-file: 2026-01-01/AgentsConnectors_CreateOrUpdate.json
 */
async function agentsConnectorsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentsConnectors.createOrUpdate(
    "examplerg",
    "testAgent",
    "new-kusto-connector",
    {
      properties: {
        dataConnectorType: "Kusto",
        endpoint: "https://newcluster.eastus.kusto.windows.net",
        identity:
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoIdentity",
        extendedProperties: {
          AuthType: "Custom",
          CustomHeader: { DD_API_KEY: "value 1", DD_APPLICATION_KEY: "value 2" },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentsConnectorsCreateOrUpdate();
}

main().catch(console.error);
