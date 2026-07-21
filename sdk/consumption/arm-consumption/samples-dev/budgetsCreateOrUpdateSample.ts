// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2024-08-01/CreateOrUpdateBudget.json
 */
async function createOrUpdateBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestBudget",
    {
      eTag: '"1d34d016a593709"',
      amount: 100.65,
      category: "Cost",
      filter: {
        and: [
          {
            dimensions: {
              name: "ResourceId",
              operator: "In",
              values: [
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Compute/virtualMachines/MSVM2",
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Compute/virtualMachines/platformcloudplatformGeneric1",
              ],
            },
          },
          { tags: { name: "category", operator: "In", values: ["Dev", "Prod"] } },
          { tags: { name: "department", operator: "In", values: ["engineering", "sales"] } },
        ],
      },
      notifications: {
        Actual_GreaterThan_80_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          contactGroups: [
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/microsoft.insights/actionGroups/SampleActionGroup",
          ],
          contactRoles: ["Contributor", "Reader"],
          enabled: true,
          locale: "en-us",
          operator: "GreaterThan",
          threshold: 80,
          thresholdType: "Actual",
        },
      },
      timeGrain: "Monthly",
      timePeriod: {
        endDate: new Date("2018-10-31T00:00:00Z"),
        startDate: new Date("2017-10-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateBudget();
}

main().catch(console.error);
