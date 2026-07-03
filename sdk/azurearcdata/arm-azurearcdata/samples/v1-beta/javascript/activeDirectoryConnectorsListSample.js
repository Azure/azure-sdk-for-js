// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the active directory connectors associated with the given data controller.
 *
 * @summary list the active directory connectors associated with the given data controller.
 * x-ms-original-file: 2026-03-01-preview/ListByDataControllerActiveDirectoryConnector.json
 */
async function getsAllActiveDirectoryConnectorsAssociatedWithADataController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activeDirectoryConnectors.list("testrg", "testdataController")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllActiveDirectoryConnectorsAssociatedWithADataController();
}

main().catch(console.error);
