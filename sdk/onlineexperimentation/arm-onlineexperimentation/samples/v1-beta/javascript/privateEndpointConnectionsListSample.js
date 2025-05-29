// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the private endpoint connections configured on an online experimentation workspace resource.
 *
 * @summary gets all the private endpoint connections configured on an online experimentation workspace resource.
 * x-ms-original-file: 2025-08-01-preview/PrivateEndpointConnection_List.json
 */
async function listsThePrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("res9871", "expworkspace3")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsThePrivateEndpointConnections();
}

main().catch(console.error);
