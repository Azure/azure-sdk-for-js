// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all entities for an incident.
 *
 * @summary gets all entities for an incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/IncidentEntities/Incidents_ListEntities.json
 */
async function incidentsListEntities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidents.listEntities(
    "myRg",
    "myWorkspace",
    "69a30280-6a4c-4aa7-9af0-5d63f335d600",
  );
  console.log(result);
}

async function main() {
  await incidentsListEntities();
}

main().catch(console.error);
