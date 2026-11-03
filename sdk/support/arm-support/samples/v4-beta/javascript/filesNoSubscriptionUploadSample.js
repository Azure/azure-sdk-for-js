// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API allows you to upload content to a file
 *
 * @summary this API allows you to upload content to a file
 * x-ms-original-file: 2025-06-01-preview/UploadFile.json
 */
async function uploadFile() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  await client.filesNoSubscription.upload("testworkspaceName", "test.txt", {
    chunkIndex: 0,
    content:
      "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd",
  });
}

async function main() {
  await uploadFile();
}

main().catch(console.error);
