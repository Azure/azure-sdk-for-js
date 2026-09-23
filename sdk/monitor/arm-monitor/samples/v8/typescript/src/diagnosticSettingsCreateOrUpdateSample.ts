// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates diagnostic settings for the specified resource.
 *
 * @summary creates or updates diagnostic settings for the specified resource.
 * x-ms-original-file: 2021-05-01-preview/createOrUpdateDiagnosticSetting.json
 */
async function createsOrUpdatesTheDiagnosticSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettings.createOrUpdate(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    "mysetting",
    {
      eventHubAuthorizationRuleId:
        "/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/montest/providers/microsoft.eventhub/namespaces/mynamespace/authorizationrules/myrule",
      eventHubName: "myeventhub",
      logAnalyticsDestinationType: "Dedicated",
      logs: [
        { categoryGroup: "allLogs", enabled: true, retentionPolicy: { days: 0, enabled: false } },
      ],
      marketplacePartnerId:
        "/subscriptions/abcdeabc-1234-1234-ab12-123a1234567a/resourceGroups/test-rg/providers/Microsoft.Datadog/monitors/dd1",
      metrics: [
        {
          category: "WorkflowMetrics",
          enabled: true,
          retentionPolicy: { days: 0, enabled: false },
        },
      ],
      storageAccountId:
        "/subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/apptest/providers/Microsoft.Storage/storageAccounts/appteststorage1",
      workspaceId: "",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates diagnostic settings for the specified resource.
 *
 * @summary creates or updates diagnostic settings for the specified resource.
 * x-ms-original-file: 2021-05-01-preview/createOrUpdateDiagnosticSettingCategory.json
 */
async function createsOrUpdatesTheDiagnosticSettingForCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettings.createOrUpdate(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    "mysetting",
    {
      eventHubAuthorizationRuleId:
        "/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/montest/providers/microsoft.eventhub/namespaces/mynamespace/authorizationrules/myrule",
      eventHubName: "myeventhub",
      logAnalyticsDestinationType: "Dedicated",
      logs: [
        {
          category: "WorkflowRuntime",
          enabled: true,
          retentionPolicy: { days: 0, enabled: false },
        },
      ],
      marketplacePartnerId:
        "/subscriptions/abcdeabc-1234-1234-ab12-123a1234567a/resourceGroups/test-rg/providers/Microsoft.Datadog/monitors/dd1",
      metrics: [
        {
          category: "WorkflowMetrics",
          enabled: true,
          retentionPolicy: { days: 0, enabled: false },
        },
      ],
      storageAccountId:
        "/subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/apptest/providers/Microsoft.Storage/storageAccounts/appteststorage1",
      workspaceId: "",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheDiagnosticSetting();
  await createsOrUpdatesTheDiagnosticSettingForCategory();
}

main().catch(console.error);
