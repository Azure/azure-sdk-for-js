// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users.
 *
 * @summary edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users.
 * x-ms-original-file: 2025-12-01/EdgeNodes_List.json
 */
async function edgeNodesList() {
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.edgeNodes.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await edgeNodesList();
}

main().catch(console.error);
