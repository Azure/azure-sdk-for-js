// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets monthly usage information for a workspace.
 *
 * @summary gets monthly usage information for a workspace.
 * x-ms-original-file: 2025-08-02/UsageMetrics_Get_MaximumSet_Gen.json
 */
async function usageMetricsGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.usageMetrics.get(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    "default",
  );
  console.log(result);
}

async function main() {
  await usageMetricsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
