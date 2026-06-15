// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a datasource instance.
 *
 * @summary gets a datasource instance.
 * x-ms-original-file: 2025-07-01/DataSourcesGet.json
 */
async function dataSourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataSources.get("OIAutoRest5123", "AzTest9724", "AzTestDS774");
  console.log(result);
}

async function main() {
  await dataSourcesGet();
}

main().catch(console.error);
