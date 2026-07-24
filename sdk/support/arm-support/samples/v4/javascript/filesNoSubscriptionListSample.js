// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the Files information under a workspace for an Azure subscription.
 *
 * @summary lists all the Files information under a workspace for an Azure subscription.
 * x-ms-original-file: 2026-07-01/ListFilesUnderFileWorkspace.json
 */
async function listFilesUnderAWorkspace() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.filesNoSubscription.list("testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFilesUnderAWorkspace();
}

main().catch(console.error);
