// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Active Directory connector resource
 *
 * @summary deletes an Active Directory connector resource
 * x-ms-original-file: 2026-03-01-preview/DeleteActiveDirectoryConnector.json
 */
async function deletesAnActiveDirectoryConnectorInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.activeDirectoryConnectors.delete("testrg", "testdataController", "testADConnector");
}

async function main() {
  await deletesAnActiveDirectoryConnectorInstance();
}

main().catch(console.error);
