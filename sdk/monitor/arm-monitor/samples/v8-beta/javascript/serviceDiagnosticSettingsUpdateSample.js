// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases.
 *
 * @summary updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases.
 * x-ms-original-file: 2016-09-01/updateServiceDiagnosticSetting.json
 */
async function updateAServiceDiagnosticSetting() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.serviceDiagnosticSettings.update(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    {
      eventHubAuthorizationRuleId:
        "/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/montest/providers/microsoft.eventhub/namespaces/mynamespace/eventhubs/myeventhub/authorizationrules/myrule",
      logs: [
        {
          category: "WorkflowRuntime",
          enabled: true,
          retentionPolicy: { days: 5, enabled: false },
        },
      ],
      metrics: [{ enabled: true, retentionPolicy: { days: 3, enabled: false }, timeGrain: "PT1M" }],
      serviceBusRuleId:
        "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/andy1101/providers/Microsoft.EventHub/namespaces/andy1101/authorizationrules/RootManageSharedAccessKey",
      storageAccountId:
        "/subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/apptest/providers/Microsoft.Storage/storageAccounts/appteststorage1",
      workspaceId: "",
    },
  );
  console.log(result);
}

async function main() {
  await updateAServiceDiagnosticSetting();
}

main().catch(console.error);
