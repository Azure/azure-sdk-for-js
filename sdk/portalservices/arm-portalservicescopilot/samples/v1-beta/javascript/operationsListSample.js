// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PortalServicesClient } = require("@azure/arm-portalservicescopilot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-04-01-preview/Operations_List.json
 */
async function listTheOperationsForTheMicrosoftPortalServicesProvider() {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheOperationsForTheMicrosoftPortalServicesProvider();
}

main().catch(console.error);
