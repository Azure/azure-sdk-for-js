// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a relation for a given incident.
 *
 * @summary gets a relation for a given incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/relations/GetIncidentRelationByName.json
 */
async function getAnIncidentRelation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidentRelations.get(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
  console.log(result);
}

async function main() {
  await getAnIncidentRelation();
}

main().catch(console.error);
