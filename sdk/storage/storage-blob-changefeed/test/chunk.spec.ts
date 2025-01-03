// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Chunk } from "../src/Chunk.js";
import { AvroReader } from "@azure/storage-internal-avro";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, vi, beforeEach, afterEach, expect } from "vitest";

class FakeAvroReader {
  constructor(
    public blockOffset: number,
    public objectIndex: number,
    public hasNext: boolean,
    private _record: any,
    public blockSize?: number,
  ) {}

  public async *parseObjects(): AsyncIterableIterator<Record<string, any> | null> {
    while (this.hasNext) {
      this.blockOffset += this.blockSize || 1000;
      this.objectIndex++;
      yield this._record;
    }
  }
}

describe("Chunk", async () => {
  beforeEach(() => {
    vi.mock("@azure/storage-internal-avro", async (importActual) => {
      const imported = await importActual();
      const reader = vi.fn();
      reader.prototype.parseObjects = vi.fn();
      return {
        ...(imported as any),
        AvroReader: reader,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("hasNext()", async () => {
    const avroReaderStub = vi.mocked(new AvroReader(expect.anything()), true);
    avroReaderStub.hasNext = vi.fn().mockReturnValueOnce(true);

    const chunk = new Chunk(avroReaderStub as any, 0, 0, "log/00/2020/07/30/2300/");
    assert.equal(chunk.hasNext(), true);

    avroReaderStub.hasNext = vi.fn().mockReturnValueOnce(false);
    assert.equal(chunk.hasNext(), false);
  });

  it("getChange", async () => {
    // set up
    const record = { a: 1 };
    const fakeAvroReader = new FakeAvroReader(0, 0, true, record);
    const avroReaderStub = vi.mocked(new AvroReader(expect.anything()), true);
    avroReaderStub.hasNext = vi.fn().mockImplementation(() => fakeAvroReader.hasNext);
    avroReaderStub.parseObjects = vi.fn().mockReturnValue(fakeAvroReader.parseObjects());
    avroReaderStub.blockOffset = vi.fn().mockImplementation(() => {
      return fakeAvroReader.blockOffset;
    });
    avroReaderStub.objectIndex = vi.fn().mockImplementation(() => {
      return fakeAvroReader.objectIndex;
    });

    const chunk = new Chunk(
      avroReaderStub as any,
      avroReaderStub.blockOffset,
      avroReaderStub.objectIndex,
      "log/00/2020/07/30/2300/",
    );

    // act and verify
    const change = await chunk.getChange();
    assert.deepStrictEqual(change, record as unknown as BlobChangeFeedEvent);
    assert.equal(chunk.blockOffset, avroReaderStub.blockOffset);
    assert.equal(chunk.eventIndex, avroReaderStub.objectIndex);

    fakeAvroReader.hasNext = false;
    const change2 = await chunk.getChange();
    assert.deepStrictEqual(change2, undefined);
    assert.equal(chunk.blockOffset, avroReaderStub.blockOffset);
    assert.equal(chunk.eventIndex, avroReaderStub.objectIndex);
  });
});
