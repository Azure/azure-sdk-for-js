// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ShardFactory } from "../src/ShardFactory.js";
import { ContainerClient } from "@azure/storage-blob";
import { ChunkFactory } from "../src/ChunkFactory.js";
import type { ShardCursor } from "../src/models/ChangeFeedCursor.js";
import { Chunk } from "../src/Chunk.js";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Shard", async () => {
  let chunkFactoryStub: any;
  let containerClientSub: any;
  let chunkStub: any;

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
    vi.mock("@azure/storage-blob", async (importActual) => {
      const imported = await importActual();
      return {
        ...(imported as any),
        ContainerClient: vi.fn(),
      };
    });

    vi.mock("../src/ChunkFactory.js", async (importActual) => {
      const imported = await importActual();
      return {
        ...(imported as any),
        ChunkFactory: vi.fn(),
      };
    });

    chunkStub = vi.mocked(
      new Chunk(expect.anything(), expect.anything(), expect.anything(), expect.anything()),
      true,
    );
    containerClientSub = vi.mocked(new ContainerClient(expect.anything()), true);
    containerClientSub.listBlobsFlat = vi.fn().mockImplementation(fakeListBlobsFlat);
    chunkFactoryStub = vi.mocked(new ChunkFactory(expect.anything(), expect.anything()), true);
    chunkFactoryStub.create = vi.fn().mockReturnValue(chunkStub);
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
    const shardFactory = new ShardFactory(chunkFactoryStub as any);
    const shard = await shardFactory.create(
      containerClientSub as any,
      shardPathWithoutContainer,
      shardCursor,
    );
    assert.ok(
      chunkFactoryStub.create.calledWith(
        containerClientSub,
        `${shardPathWithoutContainer}0000${chunkIndex}.avro`,
      ),
    );

    // shift to next chunk when currentChunk is done
    chunkStub.hasNext = vi.fn().mockReturnValue(false);
    const nextChunkStub = vi.mocked(
      new Chunk(expect.anything(), expect.anything(), expect.anything(), expect.anything()),
      true,
    );
    nextChunkStub.hasNext = vi.fn().mockReturnValue(true);
    const event = { id: "a" };
    nextChunkStub.getChange.mockResolvedValue(event as any);
    (nextChunkStub as any).chunkPath = `log/00/2019/02/22/1810/0000${chunkIndex + 1}.avro`;
    chunkFactoryStub.create.returns(nextChunkStub);

    const change = await shard.getChange();
    expect(chunkFactoryStub.create).toBeCalledWith(
      containerClientSub,
      `${shardPathWithoutContainer}0000${chunkIndex + 1}.avro`,
    );

    assert.deepStrictEqual(change, event as BlobChangeFeedEvent);
    const cursor2 = shard.getCursor();
    assert.deepStrictEqual(cursor2?.CurrentChunkPath, nextChunkStub.chunkPath);

    // chunks used up
    nextChunkStub.hasNext = vi.fn().mockReturnValue(false);
    nextChunkStub.getChange = vi.fn().mockResolvedValue(undefined);
    const lastChunkStub = vi.mocked(
      new Chunk(expect.anything(), expect.anything(), expect.anything(), expect.anything()),
      true,
    );
    lastChunkStub.hasNext.mockReturnValue(false);
    (lastChunkStub as any).chunkPath = `log/00/2019/02/22/1810/0000${chunkIndex + 2}.avro`;
    chunkFactoryStub.create = vi.fn().mockReturnValue(lastChunkStub);

    const change2 = await shard.getChange();
    expect(chunkFactoryStub.create).toBeCalledWith(
      containerClientSub,
      `${shardPathWithoutContainer}0000${chunkIndex + 2}.avro`,
    );

    assert.equal(change2, undefined);
    const cursor3 = shard.getCursor();
    assert.deepStrictEqual(cursor3?.CurrentChunkPath, lastChunkStub.chunkPath);
  });
});
