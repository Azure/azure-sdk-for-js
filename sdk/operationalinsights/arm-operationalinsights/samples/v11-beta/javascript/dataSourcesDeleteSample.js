// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a data source instance.
 *
 * @summary deletes a data source instance.
 * x-ms-original-file: 2025-07-01/DataSourcesDelete.json
 */
async function dataSourcesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.dataSources.delete("OIAutoRest5123", "AzTest9724", "AzTestDS774");
}

async function main() {
  await dataSourcesDelete();
}

main().catch(console.error);
