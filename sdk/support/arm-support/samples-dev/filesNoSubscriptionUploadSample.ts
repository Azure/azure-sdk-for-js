// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This API allows you to upload content to a file
 *
 * @summary This API allows you to upload content to a file
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/UploadFile.json
 */

import type { UploadFile } from "@azure/arm-support";
import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function uploadFile(): Promise<void> {
  const fileWorkspaceName = "testworkspaceName";
  const fileName = "test.txt";
  const uploadFileContent: UploadFile = {
    chunkIndex: 0,
    content:
      "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.filesNoSubscription.upload(fileWorkspaceName, fileName, uploadFileContent);
  console.log(result);
}

async function main(): Promise<void> {
  await uploadFile();
}

main().catch(console.error);
