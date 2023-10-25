// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve) => {
    const buffer: Buffer[] = [];

    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
  });
}
