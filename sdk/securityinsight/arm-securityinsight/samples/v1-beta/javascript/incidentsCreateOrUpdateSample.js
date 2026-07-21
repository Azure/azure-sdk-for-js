// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an incident.
 *
 * @summary creates or updates an incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/Incidents_CreateOrUpdate.json
 */
async function incidentsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidents.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      description: "This is a demo incident",
      classification: "FalsePositive",
      classificationComment: "Not a malicious activity",
      classificationReason: "InaccurateData",
      firstActivityTimeUtc: new Date("2019-01-01T13:00:30Z"),
      lastActivityTimeUtc: new Date("2019-01-01T13:05:30Z"),
      owner: { objectId: "2046feea-040d-4a46-9e2b-91c2941bfa70" },
      severity: "High",
      status: "Closed",
      title: "My incident",
    },
  );
  console.log(result);
}

async function main() {
  await incidentsCreateOrUpdate();
}

main().catch(console.error);
