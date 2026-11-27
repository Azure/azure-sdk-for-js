// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or fully replaces a named rule set that specifies which Azure logs
 * are sent through a Confluent monitor.
 *
 * @summary creates or fully replaces a named rule set that specifies which Azure logs
 * are sent through a Confluent monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorTagRules_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorTagRulesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorTagRules.createOrUpdate(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    "logRules",
    {
      properties: {
        logRules: {
          sendAadLogs: true,
          sendSubscriptionLogs: true,
          sendActivityLogs: true,
          filteringTags: [
            { name: "environment", value: "production", action: "Include" },
            { name: "dataClassification", value: "restricted", action: "Exclude" },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or fully replaces a named rule set that specifies which Azure logs
 * are sent through a Confluent monitor.
 *
 * @summary creates or fully replaces a named rule set that specifies which Azure logs
 * are sent through a Confluent monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorTagRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function monitorTagRulesCreateOrUpdateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorTagRules.createOrUpdate(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    "logRules",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await monitorTagRulesCreateOrUpdateMaximumSet();
  await monitorTagRulesCreateOrUpdateMinimumSet();
}

main().catch(console.error);
