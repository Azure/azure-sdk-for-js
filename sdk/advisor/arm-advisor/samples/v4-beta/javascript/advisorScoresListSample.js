// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of advisor scores.
 *
 * @summary gets the list of advisor scores.
 * x-ms-original-file: 2026-02-01-preview/ListAdvisorScore.json
 */
async function listAdvisorScore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5481ee1-95df-47d0-85d4-dd3f0dfa19bc";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.advisorScores.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAdvisorScore();
}

main().catch(console.error);
