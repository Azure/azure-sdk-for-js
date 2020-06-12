import * as assert from "assert";
import * as sinon from "sinon";
import { ShardFactory } from "../src/ShardFactory";
import { ContainerClient } from "@azure/storage-blob";
import { ChunkFactory } from "../src/ChunkFactory";
import { ShardCursor } from "../src/models/ChangeFeedCursor";
import { Chunk } from "../src/Chunk";

describe("Shard", async () => {
  let chunkFactoryStub: any;
  let containerClientSub: any;
  let chunkStub: any;

  async function* fakeListBlobsFlat(option: { prefix: string }) {
    for (let i = 0; i < 5; i++) {
      yield { name: `${option.prefix}000${i}.avro` };
    }
  }

  beforeEach(() => {
    chunkStub = sinon.createStubInstance(Chunk);
    containerClientSub = sinon.createStubInstance(ContainerClient);
    containerClientSub.listBlobsFlat.callsFake(fakeListBlobsFlat);
    chunkFactoryStub = sinon.createStubInstance(ChunkFactory);
    chunkFactoryStub.create.returns(chunkStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("build shard with none-zero chunkIndex", async () => {
    const shardPath = "$blobchangefeed/log/00/2019/02/22/1810/";
    const chunkIndex = 2;
    const shardCursor: ShardCursor = {
      chunkIndex,
      blockOffset: 0,
      eventIndex: 0
    };

    // build shard correctly
    const shardFactory = new ShardFactory(chunkFactoryStub as any);
    const shard = await shardFactory.create(containerClientSub as any, shardPath, shardCursor);
    assert.ok(
      chunkFactoryStub.create.calledWith(
        containerClientSub,
        `${shardPath}000${chunkIndex}.avro`
      )
    );
    const cursor = shard.getCursor();
    assert.deepStrictEqual(cursor.chunkIndex, shardCursor.chunkIndex);

    // shift to next chunk when currentChunk is done
    chunkStub.hasNext.returns(false);
    const nextChunkStub = sinon.createStubInstance(Chunk);
    nextChunkStub.hasNext.returns(true);
    const event = { id: "a" };
    nextChunkStub.getChange.resolves(event as any);
    chunkFactoryStub.create.returns(nextChunkStub);

    const change = await shard.getChange();
    assert.ok(
      chunkFactoryStub.create.calledWith(
        containerClientSub,
        `${shardPath}000${chunkIndex + 1}.avro`
      )
    );
    assert.deepStrictEqual(change, event);
    const cursor2 = shard.getCursor();
    assert.deepStrictEqual(cursor2.chunkIndex, shardCursor.chunkIndex + 1);

    // chunks used up
    nextChunkStub.hasNext.returns(false);
    nextChunkStub.getChange.resolves(undefined);
    const lastChunkStub = sinon.createStubInstance(Chunk);
    lastChunkStub.hasNext.returns(false);
    chunkFactoryStub.create.returns(lastChunkStub);

    const change2 = await shard.getChange();
    assert.ok(
      chunkFactoryStub.create.calledWith(
        containerClientSub,
        `${shardPath}000${chunkIndex + 2}.avro`
      )
    );
    assert.equal(change2, undefined);
    const cursor3 = shard.getCursor();
    assert.deepStrictEqual(cursor3.chunkIndex, shardCursor.chunkIndex + 2);
  });
});
