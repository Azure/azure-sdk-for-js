// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all entity query templates.
 *
 * @summary gets all entity query templates.
 * x-ms-original-file: 2025-07-01-preview/entityQueryTemplates/GetEntityQueryTemplates.json
 */
async function getAllEntityQueryTemplates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.entityQueryTemplates.list("myRg", "myWorkspace", {
    kind: "Activity",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllEntityQueryTemplates();
}

main().catch(console.error);
