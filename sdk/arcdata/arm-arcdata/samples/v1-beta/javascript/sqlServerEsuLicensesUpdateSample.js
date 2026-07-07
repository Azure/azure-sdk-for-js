// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a SQL Server ESU license resource
 *
 * @summary updates a SQL Server ESU license resource
 * x-ms-original-file: 2026-03-01-preview/UpdateSqlServerEsuLicense.json
 */
async function patchASQLServerESULicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerEsuLicenses.update("testrg", "testsqlServerEsuLicense", {
    properties: { activationState: "Active", billingPlan: "Paid", physicalCores: 28 },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await patchASQLServerESULicense();
}

main().catch(console.error);
