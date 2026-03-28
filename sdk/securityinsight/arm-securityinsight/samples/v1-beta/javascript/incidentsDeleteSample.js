// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a given incident.
 *
 * @summary deletes a given incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/Incidents_Delete.json
 */
async function incidentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.incidents.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

async function main() {
  await incidentsDelete();
}

main().catch(console.error);
