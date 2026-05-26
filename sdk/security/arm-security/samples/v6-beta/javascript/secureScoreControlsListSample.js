// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all security controls within a scope
 *
 * @summary get all security controls within a scope
 * x-ms-original-file: 2020-01-01/secureScores/ListSecureScoreControls_example.json
 */
async function listAllSecureScoresControls() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secureScoreControls.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSecureScoresControls();
}

main().catch(console.error);
