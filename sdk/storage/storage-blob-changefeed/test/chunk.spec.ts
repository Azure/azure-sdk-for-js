// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Chunk } from "../src/Chunk.js";
import { AvroReader } from "@azure/storage-internal-avro";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, beforeEach, afterEach, vi } from "vitest";

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

describe("Chunk", () => {
  beforeEach(() => {
    vi.mock("@azure/storage-internal-avro", (importActual) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const AvroReader = vi.fn();
      AvroReader.prototype.hasNext = vi.fn();
      AvroReader.prototype.parseObjects = vi.fn();
      AvroReader.prototype.blockOffset = 0;
      AvroReader.prototype.objectIndex = 0;
      AvroReader.prototype.blockSize = 0;

      const actual = importActual<typeof import("@azure/storage-internal-avro")>();
      return {
        ...actual,
        AvroReader,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("hasNext()", async () => {
    const readable = {
      position: 0,
      read: () => Promise.resolve(new Uint8Array()),
    };
    const avroReaderStub = new AvroReader(readable);
    vi.mocked(avroReaderStub.hasNext).mockReturnValue(true);

    const chunk = new Chunk(avroReaderStub as any, 0, 0, "log/00/2020/07/30/2300/");
    assert.equal(chunk.hasNext(), true);

    vi.mocked(avroReaderStub.hasNext).mockReturnValue(false);
    assert.equal(chunk.hasNext(), false);
  });

  it("getChange", async () => {
    // set up
    const record = { a: 1 };
    const fakeAvroReader = new FakeAvroReader(0, 0, true, record);
    const readable = {
      position: 0,
      read: () => Promise.resolve(new Uint8Array()),
    };
    const avroReaderStub = new AvroReader(readable);
    vi.mocked(avroReaderStub.hasNext).mockImplementation(() => fakeAvroReader.hasNext);
    vi.mocked(avroReaderStub.parseObjects).mockReturnValue(fakeAvroReader.parseObjects());
    vi.spyOn(avroReaderStub, "blockOffset", "get").mockReturnValue(fakeAvroReader.blockOffset);
    vi.spyOn(avroReaderStub, "objectIndex", "get").mockReturnValue(fakeAvroReader.objectIndex);

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
