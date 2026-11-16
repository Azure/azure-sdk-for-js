// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Application Insights component.
 *
 * @summary deletes an Application Insights component.
 * x-ms-original-file: 2025-01-23-preview/ComponentsDelete.json
 */
async function componentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.components.delete("my-resource-group", "my-component");
}

async function main() {
  await componentsDelete();
}

main().catch(console.error);
