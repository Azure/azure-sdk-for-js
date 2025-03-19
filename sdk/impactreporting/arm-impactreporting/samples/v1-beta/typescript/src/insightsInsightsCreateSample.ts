// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create Insight resource, This is Admin only operation
 *
 * @summary create Insight resource, This is Admin only operation
 * x-ms-original-file: 2024-05-01-preview/Insights_Create.json
 */
async function creatingAnInsight(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.insights.create("impactid22", "insightId12", {
    properties: {
      content: {
        title: "Impact Has been correlated to an outage",
        description:
          'At 2018-11-08T00:00:00Z UTC, your services dependent on these resources <link href=”…”>VM1</link> may have experienced an issue. <br/><div>We have identified an outage that affected these resources(s). You can look at outage information on <link href="https:// portal.azure.com/#view/Microsoft_Azure_Health/AzureHealthBrowseBlade/~/serviceIssues/trackingId/NL2W-VCZ">NL2W-VCZ</link> link.<div>',
      },
      category: "repair",
      status: "resolved",
      eventTime: new Date("2023-06-15T04:00:00.009223Z"),
      insightUniqueId: "00000000-0000-0000-0000-000000000000",
      impact: {
        impactedResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservername",
        startTime: new Date("2023-06-15T01:00:00.009223Z"),
        impactId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/providers/microsoft.Impact/workloadImpacts/impactid22",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await creatingAnInsight();
}

main().catch(console.error);
