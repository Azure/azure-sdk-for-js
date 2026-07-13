// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SignalDefinition
 *
 * @summary create a SignalDefinition
 * x-ms-original-file: 2026-05-01-preview/SignalDefinitions_CreateOrUpdate.json
 */
async function signalDefinitionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.createOrUpdate(
    "online-store-rg",
    "online-store",
    "sql-cpu-percent",
    {
      properties: {
        displayName: "SQL CPU utilization",
        signalKind: "AzureResourceMetric",
        refreshInterval: "PT1M",
        tags: { environment: "production", team: "online-store" },
        dataUnit: "Percent",
        metricNamespace: "Microsoft.Sql/servers/databases",
        metricName: "cpu_percent",
        timeGrain: "PT5M",
        aggregationType: "Average",
        evaluationRules: {
          degradedRule: { operator: "GreaterThan", threshold: 70 },
          unhealthyRule: { operator: "Dynamic", sensitivity: "Medium", lookBackWindow: "PT1H" },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalDefinitionsCreateOrUpdate();
}

main().catch(console.error);
