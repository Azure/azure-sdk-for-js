// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists metric configurations in a role.
 *
 * @summary lists metric configurations in a role.
 * x-ms-original-file: 2023-12-01/ListMonitoringConfig.json
 */
async function listMonitoringConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitoringConfig.list(
    "testedgedevice",
    "testrole",
    "GroupForEdgeAutomation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMonitoringConfig();
}

main().catch(console.error);
