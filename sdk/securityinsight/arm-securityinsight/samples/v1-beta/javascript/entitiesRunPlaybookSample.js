// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers playbook on a specific entity.
 *
 * @summary triggers playbook on a specific entity.
 * x-ms-original-file: 2025-07-01-preview/manualTrigger/Entities_RunPlaybook.json
 */
async function entitiesRunPlaybook() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.entities.runPlaybook("myRg", "myWorkspace", "72e01a22-5cd2-4139-a149-9f2736ff2ar2");
}

async function main() {
  await entitiesRunPlaybook();
}

main().catch(console.error);
