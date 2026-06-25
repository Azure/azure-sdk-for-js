// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this API allows you to upload content to a file
 *
 * @summary this API allows you to upload content to a file
 * x-ms-original-file: 2026-06-01/UploadFile.json
 */
async function uploadFile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  await client.filesNoSubscription.upload("testworkspaceName", "test.txt", {
    chunkIndex: 0,
    content:
      "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd",
  });
}

async function main(): Promise<void> {
  await uploadFile();
}

main().catch(console.error);
