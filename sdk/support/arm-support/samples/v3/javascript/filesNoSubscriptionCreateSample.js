// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new file under a workspace.
 *
 * @summary Creates a new file under a workspace.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateFile.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createAFileWorkspace() {
  const fileWorkspaceName = "testworkspace";
  const fileName = "test.txt";
  const createFileParameters = {
    chunkSize: 41423,
    fileSize: 41423,
    numberOfChunks: 1,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.filesNoSubscription.create(
    fileWorkspaceName,
    fileName,
    createFileParameters,
  );
  console.log(result);
}

async function main() {
  await createAFileWorkspace();
}

main().catch(console.error);
