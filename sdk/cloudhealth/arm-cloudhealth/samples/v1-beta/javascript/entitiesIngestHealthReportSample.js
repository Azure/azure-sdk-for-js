// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to ingest a health report for a specific signal on an entity (the entity must already exist)
 *
 * @summary ingest a health report for a specific signal on an entity (the entity must already exist)
 * x-ms-original-file: 2026-05-01-preview/Entities_IngestHealthReport.json
 */
async function entitiesIngestHealthReport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.entities.ingestHealthReport("online-store-rg", "online-store", "orders-api", {
    signalName: "error-rate",
    healthState: "Unhealthy",
    value: 6.5,
    evaluationRules: {
      degradedRule: { operator: "GreaterThan", threshold: 1 },
      unhealthyRule: { operator: "GreaterThan", threshold: 5 },
    },
    expiresInMinutes: 60,
    additionalContext: "Elevated 5xx error rate during the checkout traffic spike.",
  });
}

async function main() {
  await entitiesIngestHealthReport();
}

main().catch(console.error);
