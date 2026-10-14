// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of environments.
 *
 * @summary returns a collection of environments.
 * x-ms-original-file: 2024-06-01-preview/Environments_List.json
 */
async function environmentsListByWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.environments.list("contoso-resources", "contoso", "default")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await environmentsListByWorkspace();
}

main().catch(console.error);
