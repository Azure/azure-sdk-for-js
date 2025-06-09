// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SignalDefinition
 *
 * @summary create a SignalDefinition
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_CreateOrUpdate.json
 */
async function signalDefinitionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.createOrUpdate(
    "rgopenapi",
    "myHealthModel",
    "sig1",
    {
      properties: {
        metricNamespace: "microsoft.compute/virtualMachines",
        metricName: "cpuusage",
        aggregationType: "None",
        dimension: "nodename",
        dimensionFilter: "node1",
        displayName: "cpu usage",
        signalKind: "AzureResourceMetric",
        refreshInterval: "PT1M",
        labels: { key4788: "ixfvzsfnpvkkbrce" },
        timeGrain: "PT1M",
        dataUnit: "byte",
        evaluationRules: {
          degradedRule: { operator: "LowerThan", threshold: "65" },
          unhealthyRule: { operator: "LowerThan", threshold: "60" },
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
