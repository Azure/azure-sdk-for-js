// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ShardFactory } from "$internal/ShardFactory.js";
import type { ShardCursor } from "$internal/models/ChangeFeedCursor.js";
import type { BlobChangeFeedEvent } from "@azure/storage-blob-changefeed";
import { describe, it, assert, beforeEach, afterEach, vi } from "vitest";
import type { ContainerClient } from "@azure/storage-blob";
import type { Chunk } from "$internal/Chunk.js";
import type { ChunkFactory } from "$internal/ChunkFactory.js";

describe("Shard", async () => {
  let chunkFactoryStub: ChunkFactory;
  let containerClientStub: ContainerClient;
  let chunkStub: Chunk;

  async function* fakeListBlobsFlat(option: { prefix: string }): AsyncGenerator<
    {
      name: string;
    },
    void,
    unknown
  > {
    for (let i = 0; i < 5; i++) {
      yield { name: `${option.prefix}0000${i}.avro` };
    }
  }

  beforeEach(() => {
    containerClientStub = {
      exists: vi.fn().mockResolvedValue(true),
      getBlobClient: vi.fn(),
      listBlobsByHierarchy: vi.fn(),
      listBlobsFlat: vi.fn(),
    } as any as ContainerClient;

    chunkStub = {
      hasNext: vi.fn(),
      getChange: vi.fn(),
      chunkPath: "",
      blockOffset: 0,
      eventIndex: 0,
    } as any as Chunk;

    chunkFactoryStub = {
      create: vi.fn(),
    } as any as ChunkFactory;

    vi.mocked(containerClientStub.listBlobsFlat).mockImplementation((options) => {
      return fakeListBlobsFlat(options as any) as any;
    });

    vi.mocked(chunkFactoryStub.create).mockResolvedValue(chunkStub);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("build shard with none-zero chunkIndex", async () => {
    const shardPath = "$blobchangefeed/log/00/2019/02/22/1810/";
    const chunkIndex = 2;
    const shardCursor: ShardCursor = {
      CurrentChunkPath: `log/00/2019/02/22/1810/0000${chunkIndex}.avro`,
      BlockOffset: 0,
      EventIndex: 0,
    };

    // build shard correctly
    const shardPathWithoutContainer = shardPath.substring("$blobchangefeed/".length);
    const shardFactory = new ShardFactory(chunkFactoryStub);
    const shard = await shardFactory.create(
      containerClientStub,
      shardPathWithoutContainer,
      shardCursor,
    );
    // check shard path
    const firstArgs = vi.mocked(chunkFactoryStub.create).mock.calls[0];
    assert.equal(firstArgs[1], `${shardPathWithoutContainer}0000${chunkIndex}.avro`);

    // shift to next chunk when currentChunk is done
    vi.mocked(chunkStub.hasNext).mockReturnValue(false);

    const nextChunkStub = {
      hasNext: vi.fn(),
      getChange: vi.fn(),
      chunkPath: "",
      blockOffset: 0,
      eventIndex: 0,
    } as any as Chunk;
    vi.mocked(nextChunkStub.hasNext).mockReturnValue(true);
    const event = { id: "a" };
    vi.mocked(nextChunkStub.getChange).mockReturnValue(event as any);
    vi.spyOn(nextChunkStub, "chunkPath", "get").mockReturnValue(
      `log/00/2019/02/22/1810/0000${chunkIndex + 1}.avro`,
    );
    vi.mocked(chunkFactoryStub.create).mockResolvedValue(nextChunkStub);

    const change = await shard.getChange();
    const secondArgs = vi.mocked(chunkFactoryStub.create).mock.calls[1];
    assert.equal(secondArgs[1], `${shardPathWithoutContainer}0000${chunkIndex + 1}.avro`);
    assert.deepStrictEqual(change, event as BlobChangeFeedEvent);
    const cursor2 = shard.getCursor();
    assert.deepStrictEqual(cursor2?.CurrentChunkPath, nextChunkStub.chunkPath);

    // chunks used up
    vi.mocked(nextChunkStub.hasNext).mockReturnValue(false);
    vi.mocked(nextChunkStub.getChange).mockResolvedValue(undefined as any);
    const lastChunkStub = {
      hasNext: vi.fn(),
      getChange: vi.fn(),
      chunkPath: "",
      blockOffset: 0,
      eventIndex: 0,
    } as any as Chunk;
    vi.mocked(lastChunkStub.hasNext).mockReturnValue(false);
    vi.spyOn(lastChunkStub, "chunkPath", "get").mockReturnValue(
      `log/00/2019/02/22/1810/0000${chunkIndex + 2}.avro`,
    );
    vi.mocked(chunkFactoryStub.create).mockResolvedValue(lastChunkStub);

    const change2 = await shard.getChange();
    const thirdArgs = vi.mocked(chunkFactoryStub.create).mock.calls[2];
    assert.equal(thirdArgs[1], `${shardPathWithoutContainer}0000${chunkIndex + 2}.avro`);
    assert.equal(change2, undefined);
    const cursor3 = shard.getCursor();
    assert.deepStrictEqual(cursor3?.CurrentChunkPath, lastChunkStub.chunkPath);
  });
});
