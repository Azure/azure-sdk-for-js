// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a SQL Server ESU license resource
 *
 * @summary creates or replaces a SQL Server ESU license resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateSqlServerEsuLicense.json
 */
async function updatesASQLServerESULicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerEsuLicenses.create("testrg", "testsqlServerEsuLicense", {
    location: "northeurope",
    properties: {
      activationState: "Inactive",
      billingPlan: "PAYG",
      physicalCores: 24,
      scopeType: "Subscription",
      version: "SQL Server 2016",
    },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await updatesASQLServerESULicense();
}

main().catch(console.error);
