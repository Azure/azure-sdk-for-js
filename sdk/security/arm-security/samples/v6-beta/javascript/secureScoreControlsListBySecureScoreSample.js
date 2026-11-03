// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all security controls for a specific initiative within a scope
 *
 * @summary get all security controls for a specific initiative within a scope
 * x-ms-original-file: 2020-01-01/secureScores/ListSecureScoreControlsForNameWithExpand_builtin_example.json
 */
async function getSecurityControlsAndTheirCurrentScoreForTheSpecifiedInitiativeWithTheExpandParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secureScoreControls.listBySecureScore("ascScore", {
    expand: "definition",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get all security controls for a specific initiative within a scope
 *
 * @summary get all security controls for a specific initiative within a scope
 * x-ms-original-file: 2020-01-01/secureScores/ListSecureScoreControlsForName_builtin_example.json
 */
async function getSecurityControlsAndTheirCurrentScoreForTheSpecifiedInitiative() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secureScoreControls.listBySecureScore("ascScore")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSecurityControlsAndTheirCurrentScoreForTheSpecifiedInitiativeWithTheExpandParameter();
  await getSecurityControlsAndTheirCurrentScoreForTheSpecifiedInitiative();
}

main().catch(console.error);
