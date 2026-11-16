// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-01-23-preview/ComponentsCreate.json
 */
async function componentCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.createOrUpdate("my-resource-group", "my-component", {
    kind: "web",
    location: "South Central US",
    applicationType: "web",
    azureMonitorWorkspaceIngestionMode: "Enabled",
    azureMonitorWorkspaceResourceId:
      "/subscriptions/subid/resourcegroups/my-resource-group/providers/microsoft.monitor/accounts/my-azure-monitor-workspace",
    flowType: "Bluefield",
    requestSource: "rest",
    workspaceResourceId:
      "/subscriptions/subid/resourcegroups/my-resource-group/providers/microsoft.operationalinsights/workspaces/my-workspace",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-01-23-preview/ComponentsCreateWithManagedWorkspaces.json
 */
async function componentCreateWithManagedWorkspaces(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.createOrUpdate("my-resource-group", "my-component", {
    kind: "web",
    location: "South Central US",
    applicationType: "web",
    azureMonitorWorkspaceIngestionMode: "Enabled",
    flowType: "Bluefield",
    requestSource: "rest",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-01-23-preview/ComponentsCreateWithoutOtlp.json
 */
async function componentCreateWithoutOtlp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.createOrUpdate("my-resource-group", "my-component", {
    kind: "web",
    location: "South Central US",
    applicationType: "web",
    azureMonitorWorkspaceIngestionMode: "NotOptedIn",
    flowType: "Bluefield",
    requestSource: "rest",
    workspaceResourceId:
      "/subscriptions/subid/resourcegroups/my-resource-group/providers/microsoft.operationalinsights/workspaces/my-workspace",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-01-23-preview/ComponentsUpdate.json
 */
async function componentUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.createOrUpdate("my-resource-group", "my-component", {
    kind: "web",
    location: "South Central US",
    tags: { ApplicationGatewayType: "Internal-Only", BillingEntity: "Self" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await componentCreate();
  await componentCreateWithManagedWorkspaces();
  await componentCreateWithoutOtlp();
  await componentUpdate();
}

main().catch(console.error);
