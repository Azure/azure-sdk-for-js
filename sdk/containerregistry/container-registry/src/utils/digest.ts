// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import crypto from "crypto";

export function calculateDigest(buffer: Buffer): Promise<string>;

export function calculateDigest(stream: NodeJS.ReadableStream): Promise<string>;

export function calculateDigest(bufferOrStream: NodeJS.ReadableStream | Buffer): Promise<string> {
  const hash = crypto.createHash("sha256");
  if (Buffer.isBuffer(bufferOrStream)) {
    return Promise.resolve(`sha256:${hash.update(bufferOrStream).digest("hex")}`);
  } else {
    bufferOrStream.pipe(hash);
    return new Promise((resolve, reject) => {
      bufferOrStream.on("end", () => {
        hash.end();
        resolve(`sha256:${hash.digest("hex")}`);
      });
      bufferOrStream.on("error", (err) => reject(err));
    });
  }
}
