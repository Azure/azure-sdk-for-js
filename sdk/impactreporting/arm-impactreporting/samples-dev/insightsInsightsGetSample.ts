// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Insight resources by workloadImpactName and insightName
 *
 * @summary get Insight resources by workloadImpactName and insightName
 * x-ms-original-file: 2024-05-01-preview/Insights_Get_diagnostics.json
 */
async function getInsightSampleForDiagnosticsCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.insights.Insights_get("impactid", "insight1");
  console.log(result);
}

/**
 * This sample demonstrates how to get Insight resources by workloadImpactName and insightName
 *
 * @summary get Insight resources by workloadImpactName and insightName
 * x-ms-original-file: 2024-05-01-preview/Insights_Get_mitigationAction.json
 */
async function getInsightSampleForMitigationActionCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.insights.Insights_get("impactId", "HPCUASucceeded");
  console.log(result);
}

/**
 * This sample demonstrates how to get Insight resources by workloadImpactName and insightName
 *
 * @summary get Insight resources by workloadImpactName and insightName
 * x-ms-original-file: 2024-05-01-preview/Insights_Get_servicehealth.json
 */
async function getInsightSampleForServiceHealthCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.insights.Insights_get("impactid", "insightname");
  console.log(result);
}

async function main(): Promise<void> {
  getInsightSampleForDiagnosticsCategory();
  getInsightSampleForMitigationActionCategory();
  getInsightSampleForServiceHealthCategory();
}

main().catch(console.error);
