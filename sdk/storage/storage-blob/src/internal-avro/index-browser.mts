// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AvroReader, type AvroParseOptions } from "./AvroReader.js";
export { AvroReadable } from "./AvroReadable.js";
export { AvroReadableFromBlob } from "./AvroReadableFromBlob.js";

// Stub for browser compatibility - AvroReadableFromStream requires Node.js streams
import type { AvroReadableReadOptions } from "./AvroReadable.js";
import { AvroReadable } from "./AvroReadable.js";

export class AvroReadableFromStream extends AvroReadable {
  public get position(): number {
    return 0;
  }

  constructor(_readable: NodeJS.ReadableStream) {
    super();
    throw new Error("AvroReadableFromStream is not supported in the browser.");
  }

  public async read(_size: number, _options?: AvroReadableReadOptions): Promise<Uint8Array> {
    throw new Error("AvroReadableFromStream is not supported in the browser.");
  }
}
