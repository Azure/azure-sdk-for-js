// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a named rule set from a Confluent monitor.
 *
 * @summary deletes a named rule set from a Confluent monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorTagRules_Delete_MaximumSet_Gen.json
 */
async function monitorTagRulesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.monitorTagRules.delete(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    "logRules",
  );
}

async function main() {
  await monitorTagRulesDeleteMaximumSet();
}

main().catch(console.error);
