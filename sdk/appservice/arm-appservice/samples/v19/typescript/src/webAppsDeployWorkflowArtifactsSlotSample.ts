// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates the artifacts for web site, or a deployment slot.
 *
 * @summary description for Creates the artifacts for web site, or a deployment slot.
 * x-ms-original-file: 2025-05-01/PostDeployWorkflowArtifactsSlot.json
 */
async function deploysWorkflowArtifactsSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.deployWorkflowArtifactsSlot("testrg123", "testsite2", "testsSlot", {
    workflowArtifacts: {
      appSettings: {
        eventHub_connectionString:
          "Endpoint=sb://example.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EXAMPLE1a2b3c4d5e6fEXAMPLE=",
      },
      files: {
        "connections.json": {
          managedApiConnections: {},
          serviceProviderConnections: {
            eventHub: {
              displayName: "example1",
              parameterValues: { connectionString: "@appsetting('eventHub_connectionString')" },
              serviceProvider: { id: "/serviceProviders/eventHub" },
            },
          },
        },
        "test1/workflow.json": {
          definition: {
            $schema:
              "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
            actions: {},
            contentVersion: "1.0.0.0",
            outputs: {},
            triggers: {
              When_events_are_available_in_Event_hub: {
                type: "ServiceProvider",
                inputs: {
                  parameters: { eventHubName: "test123" },
                  serviceProviderConfiguration: {
                    operationId: "receiveEvents",
                    connectionName: "eventHub",
                    serviceProviderId: "/serviceProviders/eventHub",
                  },
                },
                splitOn: "@triggerOutputs()?['body']",
              },
            },
          },
          kind: "Stateful",
        },
      },
    },
  });
}

async function main(): Promise<void> {
  await deploysWorkflowArtifactsSlot();
}

main().catch(console.error);
