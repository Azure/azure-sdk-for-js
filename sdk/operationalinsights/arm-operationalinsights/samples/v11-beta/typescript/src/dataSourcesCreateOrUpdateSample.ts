// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a data source.
 *
 * @summary create or update a data source.
 * x-ms-original-file: 2025-07-01/DataSourcesCreate.json
 */
async function dataSourcesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataSources.createOrUpdate(
    "OIAutoRest5123",
    "AzTest9724",
    "AzTestDS774",
    {
      kind: "AzureActivityLog",
      properties: {
        LinkedResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/providers/microsoft.insights/eventtypes/management",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataSourcesCreate();
}

main().catch(console.error);
