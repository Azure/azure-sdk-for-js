// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all source controls, without source control items.
 *
 * @summary gets all source controls, without source control items.
 * x-ms-original-file: 2025-07-01-preview/sourcecontrols/GetSourceControls.json
 */
async function getAllSourceControls() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b28fbe4a-0bb1-4593-960b-061c8655a550";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControls.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSourceControls();
}

main().catch(console.error);
