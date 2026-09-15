// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Agent Space Connector
 *
 * @summary creates or updates an Agent Space Connector
 * x-ms-original-file: 2026-01-01/AgentSpacesConnectors_CreateOrUpdate.json
 */
async function agentSpacesConnectorsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpacesConnectors.createOrUpdate(
    "examplerg",
    "testAgentSpace",
    "new-shared-cosmosdb-connector",
    {
      properties: {
        dataConnectorType: "Kusto",
        endpoint: "https://newsharedkusto.kusto.windows.net",
        identity:
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/sharedCosmosIdentity",
        extendedProperties: {
          environment: "production",
          owner: "alice",
          additionalEndpoints: [
            "https://foo.kusto.windows.net/databasename",
            "https://bar.kusto.windows.net/databasename",
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentSpacesConnectorsCreateOrUpdate();
}

main().catch(console.error);
