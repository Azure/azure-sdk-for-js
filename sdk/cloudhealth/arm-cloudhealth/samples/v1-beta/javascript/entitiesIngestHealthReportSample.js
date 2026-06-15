// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to ingest a health report for a specific signal on an entity (the entity must already exist)
 *
 * @summary ingest a health report for a specific signal on an entity (the entity must already exist)
 * x-ms-original-file: 2026-01-01-preview/Entities_IngestHealthReport.json
 */
async function entitiesIngestHealthReport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.entities.ingestHealthReport("rgopenapi", "myHealthModel", "entity1", {
    signalName: "uniqueSignalName1",
    value: 85.5,
    healthState: "Degraded",
    evaluationRules: {
      degradedRule: { operator: "GreaterThan", threshold: 70 },
      unhealthyRule: { operator: "GreaterThan", threshold: 90 },
    },
    expiresInMinutes: 60,
    additionalContext: "CPU usage elevated due to batch processing job",
  });
}

async function main() {
  await entitiesIngestHealthReport();
}

main().catch(console.error);
