// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import internal, { Transform } from "stream";
import crypto from "crypto";

/**
 * Stream transform that calculates a digest on the stream.
 */
export class DigestCalculatingTransform extends Transform {
  private hash = crypto.createHash("sha256");

  constructor(
    private onDigest: (digest: string) => void,
    transformOptions?: internal.TransformOptions
  ) {
    super(transformOptions);
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: internal.TransformCallback): void {
    this.hash.write(chunk, encoding);
    callback(null, chunk);
  }

  _final(callback: (error?: Error | null | undefined) => void): void {
    this.hash.end();
    this.onDigest(`sha256:${this.hash.digest("hex")}`);
    callback(null);
  }
}
