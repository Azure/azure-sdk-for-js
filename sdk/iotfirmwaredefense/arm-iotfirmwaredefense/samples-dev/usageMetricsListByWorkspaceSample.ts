// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists monthly usage information for a workspace.
 *
 * @summary lists monthly usage information for a workspace.
 * x-ms-original-file: 2025-08-02/UsageMetrics_ListByWorkspace_MaximumSet_Gen.json
 */
async function usageMetricsListByWorkspaceGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageMetrics.listByWorkspace(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await usageMetricsListByWorkspaceGeneratedByMaximumSetRule();
}

main().catch(console.error);
