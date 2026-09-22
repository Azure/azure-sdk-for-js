// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new metric configuration or updates an existing one for a role.
 *
 * @summary creates a new metric configuration or updates an existing one for a role.
 * x-ms-original-file: 2023-12-01/PutMonitoringConfig.json
 */
async function putMonitoringConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.monitoringConfig.createOrUpdate(
    "testedgedevice",
    "testrole",
    "GroupForEdgeAutomation",
    {
      metricConfigurations: [
        {
          counterSets: [{ counters: [{ name: "test" }] }],
          mdmAccount: "test",
          metricNameSpace: "test",
          resourceId: "test",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putMonitoringConfig();
}

main().catch(console.error);
