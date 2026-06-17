// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the data connector definition.
 *
 * @summary creates or updates the data connector definition.
 * x-ms-original-file: 2025-07-01-preview/dataConnectorDefinitions/CreateCustomizableDataConnectorDefinition.json
 */
async function createDataConnectorDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorDefinitions.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      kind: "Customizable",
      connectorUiConfig: {
        availability: { isPreview: false, status: 1 },
        connectivityCriteria: [
          {
            type: "IsConnectedQuery",
            value: [
              "GitHubAuditLogPolling_CL \n | summarize LastLogReceived = max(TimeGenerated)\n | project IsConnected = LastLogReceived > ago(30d)",
            ],
          },
        ],
        dataTypes: [
          {
            name: "GitHubAuditLogPolling_CL",
            lastDataReceivedQuery:
              "GitHubAuditLogPolling_CL \n            | summarize Time = max(TimeGenerated)\n            | where isnotempty(Time)",
          },
        ],
        descriptionMarkdown:
          "The GitHub audit log connector provides the capability to ingest GitHub logs into Azure Sentinel. By connecting GitHub audit logs into Azure Sentinel, you can view this data in workbooks, use it to create custom alerts, and improve your investigation process.",
        graphQueries: [
          {
            baseQuery: "GitHubAuditLogPolling_CL",
            legend: "GitHub audit log events",
            metricName: "Total events received",
          },
        ],
        instructionSteps: [
          {
            description:
              "Enable GitHub audit Logs. \n Follow [this](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create or find your personal key",
            instructions: [
              {
                type: "OAuthForm",
                parameters: {
                  clientIdLabel: "Client ID",
                  clientSecretLabel: "Client Secret",
                  connectButtonLabel: "Connect",
                  disconnectButtonLabel: "Disconnect",
                },
              },
            ],
            title: "Connect GitHub Enterprise Audit Log to Azure Sentinel",
          },
        ],
        permissions: {
          customs: [
            {
              name: "GitHub API personal token Key",
              description:
                "You need access to GitHub personal token, the key should have 'admin:org' scope",
            },
          ],
          resourceProvider: [
            {
              permissionsDisplayText: "read and write permissions are required.",
              provider: "Microsoft.OperationalInsights/workspaces",
              providerDisplayName: "Workspace",
              requiredPermissions: { action: false, delete: false, read: false, write: true },
              scope: "Workspace",
            },
          ],
        },
        publisher: "GitHub",
        title: "GitHub Enterprise Audit Log",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDataConnectorDefinition();
}

main().catch(console.error);
