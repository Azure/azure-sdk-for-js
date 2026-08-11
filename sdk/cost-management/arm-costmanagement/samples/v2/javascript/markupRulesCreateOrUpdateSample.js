// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a markup rule for a billing account and billing profile.
 *
 * @summary create or update a markup rule for a billing account and billing profile.
 * x-ms-original-file: 2026-06-01/MarkupRulesCreateOrUpdate.json
 */
async function markupRulesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.markupRules.createOrUpdate(
    "2af90bea-080c-438c-8977-17cddd5f115a:ef5ce3cf-f5af-4fcb-a5ed-c376e1d6d2b6",
    "cbf78278-f4b8-43d9-8f13-47112da1c63e",
    "markup-2022",
    {
      properties: {
        description: "Markup rule for year 2022",
        percentage: 5,
        startDate: new Date("2022-01-01T00:00:00Z"),
        endDate: new Date("2022-12-31T00:00:00Z"),
        customerDetails: {
          billingAccountId:
            "cff9aa6d-941c-43f2-b6cb-1d2bb34a02b4:780237f3-1aa6-4159-943b-498e0d647dd9",
          billingProfileId: "08eeecee-efb2-40d5-817c-0a254d2e042c",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await markupRulesCreateOrUpdate();
}

main().catch(console.error);
