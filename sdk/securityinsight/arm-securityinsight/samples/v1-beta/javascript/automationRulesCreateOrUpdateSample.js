// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the automation rule.
 *
 * @summary creates or updates the automation rule.
 * x-ms-original-file: 2025-07-01-preview/automationRules/AutomationRules_CreateOrUpdate.json
 */
async function automationRulesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.automationRules.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

async function main() {
  await automationRulesCreateOrUpdate();
}

main().catch(console.error);
