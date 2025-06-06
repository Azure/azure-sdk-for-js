// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets monthly usage information for a workspace.
 *
 * @summary gets monthly usage information for a workspace.
 * x-ms-original-file: 2025-04-01-preview/UsageMetrics_Get_MaximumSet_Gen.json
 */
async function usageMetricsGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.usageMetrics.get(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await usageMetricsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
