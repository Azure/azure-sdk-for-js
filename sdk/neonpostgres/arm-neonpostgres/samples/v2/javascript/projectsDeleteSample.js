// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Project
 *
 * @summary delete a Project
 * x-ms-original-file: 2025-03-01/Projects_Delete_MaximumSet_Gen.json
 */
async function projectsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.projects.delete("rgneon", "contoso-org", "sample-resource");
}

async function main() {
  await projectsDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
