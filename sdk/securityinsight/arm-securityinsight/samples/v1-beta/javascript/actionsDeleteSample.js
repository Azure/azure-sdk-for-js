// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the action of alert rule.
 *
 * @summary delete the action of alert rule.
 * x-ms-original-file: 2025-07-01-preview/actions/DeleteActionOfAlertRule.json
 */
async function deleteAnActionOfAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.actions.delete(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    "912bec42-cb66-4c03-ac63-1761b6898c3e",
  );
}

async function main() {
  await deleteAnActionOfAlertRule();
}

main().catch(console.error);
