// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API allows you to upload content to a file
 *
 * @summary this API allows you to upload content to a file
 * x-ms-original-file: 2025-06-01-preview/UploadFileForSubscription.json
 */
async function uploadFileForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  await client.files.upload("testworkspaceName", "test.txt", {
    chunkIndex: 0,
    content:
      "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd",
  });
}

async function main() {
  await uploadFileForSubscription();
}

main().catch(console.error);
