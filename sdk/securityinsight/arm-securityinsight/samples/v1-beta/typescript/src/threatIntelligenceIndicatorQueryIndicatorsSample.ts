// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query threat intelligence indicators as per filtering criteria.
 *
 * @summary query threat intelligence indicators as per filtering criteria.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/QueryThreatIntelligence.json
 */
async function queryThreatIntelligenceIndicatorsAsPerFilteringCriteria(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.threatIntelligenceIndicator.queryIndicators(
    "myRg",
    "myWorkspace",
    {
      maxConfidence: 80,
      maxValidUntil: "2021-04-25T17:44:00.114052Z",
      minConfidence: 25,
      minValidUntil: "2021-04-05T17:44:00.114052Z",
      pageSize: 100,
      sortBy: [{ itemKey: "lastUpdatedTimeUtc", sortOrder: "descending" }],
      sources: ["Azure Sentinel"],
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryThreatIntelligenceIndicatorsAsPerFilteringCriteria();
}

main().catch(console.error);
