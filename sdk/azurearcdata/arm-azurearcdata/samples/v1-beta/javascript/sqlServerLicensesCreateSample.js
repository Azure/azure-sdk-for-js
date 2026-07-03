// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a SQL Server license resource
 *
 * @summary creates or replaces a SQL Server license resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateSqlServerLicense.json
 */
async function updatesASQLServerLicenseTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerLicenses.create("testrg", "testsqlServerLicense", {
    location: "northeurope",
    properties: {
      activationState: "Deactivated",
      billingPlan: "PAYG",
      licenseCategory: "Core",
      physicalCores: 24,
      scopeType: "Subscription",
    },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await updatesASQLServerLicenseTags();
}

main().catch(console.error);
