// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PassThrough, type Readable } from "node:stream";
import { describe, it, assert, beforeAll } from "vitest";
import { StorageCRC64Calculator } from "../../src/StorageCRC64Calculator.js";
import { structuredMessageEncoding } from "../../src/StructuredMessageEncodingStream.js";

describe("structuredMessageEncoding of a stream", () => {
  beforeAll(async () => {
    await StorageCRC64Calculator.init();
  });

  it("keeps listening for errors of a source it stops reading", async () => {
    const source = new PassThrough();
    const body = (await structuredMessageEncoding(source, 10)).body as Readable;

    // The source fails while the body is destroyed; its error is emitted on a later tick.
    source.destroy(new Error("The file could not be opened."));
    body.destroy();

    assert.isAbove(source.listenerCount("error"), 0);
    // Without a listener, the late error is unhandled and fails the run.
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
});
