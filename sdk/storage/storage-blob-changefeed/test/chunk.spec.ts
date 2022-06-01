// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Chunk } from "../src/Chunk";
import * as sinon from "sinon";
import { AvroReader } from "../../storage-internal-avro/src";
import { BlobChangeFeedEvent } from "../src";

class FakeAvroReader {
  constructor(
    public blockOffset: number,
    public objectIndex: number,
    public hasNext: boolean,
    private _record: any,
    public blockSize?: number
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
  afterEach(() => {
    sinon.restore();
  });

  it("hasNext()", async () => {
    const avroReaderStub = sinon.createStubInstance(AvroReader);
    avroReaderStub.hasNext.returns(true);

    const chunk = new Chunk(avroReaderStub as any, 0, 0, "log/00/2020/07/30/2300/");
    assert.equal(chunk.hasNext(), true);

    avroReaderStub.hasNext.returns(false);
    assert.equal(chunk.hasNext(), false);
  });

  it("getChange", async () => {
    // set up
    const record = { a: 1 };
    const fakeAvroReader = new FakeAvroReader(0, 0, true, record);
    const avroReaderStub = sinon.createStubInstance(AvroReader);
    avroReaderStub.hasNext.callsFake(() => fakeAvroReader.hasNext);
    avroReaderStub.parseObjects.returns(fakeAvroReader.parseObjects());
    sinon.stub(avroReaderStub, "blockOffset").get(() => {
      return fakeAvroReader.blockOffset;
    });
    sinon.stub(avroReaderStub, "objectIndex").get(() => {
      return fakeAvroReader.objectIndex;
    });

    const chunk = new Chunk(
      avroReaderStub as any,
      avroReaderStub.blockOffset,
      avroReaderStub.objectIndex,
      "log/00/2020/07/30/2300/"
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
