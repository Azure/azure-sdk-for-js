// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get threat intelligence indicators metrics (Indicators counts by Type, Threat Type, Source).
 *
 * @summary get threat intelligence indicators metrics (Indicators counts by Type, Threat Type, Source).
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/CollectThreatIntelligenceMetrics.json
 */
async function getThreatIntelligenceIndicatorsMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicatorMetrics.list("myRg", "myWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await getThreatIntelligenceIndicatorsMetrics();
}

main().catch(console.error);
