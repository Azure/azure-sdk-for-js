// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the artifacts for the logic app
 *
 * @summary creates or updates the artifacts for the logic app
 * x-ms-original-file: 2025-10-02-preview/LogicApps_DeleteDeployWorkflowArtifacts.json
 */
async function deleteWorkflowArtifacts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.logicApps.deployWorkflowArtifacts("testrg123", "testapp2", "testapp2", {
    workflowArtifacts: { filesToDelete: ["test/workflow.json", "test/"] },
  });
}

/**
 * This sample demonstrates how to creates or updates the artifacts for the logic app
 *
 * @summary creates or updates the artifacts for the logic app
 * x-ms-original-file: 2025-10-02-preview/LogicApps_PostDeployWorkflowArtifacts.json
 */
async function deploysWorkflowArtifacts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.logicApps.deployWorkflowArtifacts("testrg123", "testapp2", "testapp2", {
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

async function main() {
  await deleteWorkflowArtifacts();
  await deploysWorkflowArtifacts();
}

main().catch(console.error);
