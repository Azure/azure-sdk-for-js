// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to clean up after upgrading.
 *
 * @summary clean up after upgrading.
 * x-ms-original-file: 2026-03-01-preview/PostUpgradeSqlServerInstance.json
 */
async function postAUMUpgradeToCompleteSQLInstanceUpgradeProcess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.postUpgrade("testrg", "testsqlServerInstance");
  console.log(result);
}

async function main() {
  await postAUMUpgradeToCompleteSQLInstanceUpgradeProcess();
}

main().catch(console.error);
