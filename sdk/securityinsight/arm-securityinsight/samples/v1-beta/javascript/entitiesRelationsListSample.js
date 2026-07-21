// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all relations of an entity.
 *
 * @summary gets all relations of an entity.
 * x-ms-original-file: 2025-07-01-preview/entities/relations/GetAllEntityRelations.json
 */
async function getAllRelationsOfAnEntity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.entitiesRelations.list(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllRelationsOfAnEntity();
}

main().catch(console.error);
