// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all bookmarks for an incident.
 *
 * @summary gets all bookmarks for an incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/IncidentBookmarks/Incidents_ListBookmarks.json
 */
async function incidentsListBookmarks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidents.listBookmarks(
    "myRg",
    "myWorkspace",
    "69a30280-6a4c-4aa7-9af0-5d63f335d600",
  );
  console.log(result);
}

async function main() {
  await incidentsListBookmarks();
}

main().catch(console.error);
