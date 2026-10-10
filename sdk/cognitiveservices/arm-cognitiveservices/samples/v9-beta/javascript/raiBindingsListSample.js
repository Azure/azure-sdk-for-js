// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists RAI bindings on an account.
 *
 * @summary lists RAI bindings on an account.
 * x-ms-original-file: 2026-09-15-preview/ListRaiBindings.json
 */
async function listRAIBindings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiBindings.list("resource-group", "safety-account", {
    top: 50,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRAIBindings();
}

main().catch(console.error);
