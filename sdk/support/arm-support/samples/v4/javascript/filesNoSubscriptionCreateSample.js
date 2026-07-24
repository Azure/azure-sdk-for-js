// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new file under a workspace.
 *
 * @summary creates a new file under a workspace.
 * x-ms-original-file: 2026-07-01/CreateFile.json
 */
async function createAFileWorkspace() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.filesNoSubscription.create("testworkspace", "test.txt", {
    chunkSize: 41423,
    fileSize: 41423,
    numberOfChunks: 1,
  });
  console.log(result);
}

async function main() {
  await createAFileWorkspace();
}

main().catch(console.error);
