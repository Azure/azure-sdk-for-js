// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createWriteStream } from "fs";

export function readStreamToLocalFile(
  stream: NodeJS.ReadableStream,
  filePath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = createWriteStream(filePath);

    stream.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("close", resolve);

    stream.pipe(ws);
  });
}
