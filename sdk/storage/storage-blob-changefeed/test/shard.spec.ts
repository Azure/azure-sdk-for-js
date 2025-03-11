// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ShardFactory } from "../src/ShardFactory.js";
import type { ShardCursor } from "../src/models/ChangeFeedCursor.js";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("@azure/storage-blob", async (importActual) => {
  const ContainerClient = vi.fn();
  ContainerClient.prototype.listBlobsFlat = vi.fn();
  ContainerClient.prototype.getBlobClient = vi.fn();
  ContainerClient.prototype.getContainerNameFromUrl = vi.fn();

  const actual = await importActual<typeof import("@azure/storage-blob")>();
  return {
    ...actual,
    ContainerClient,
  };
});

vi.mock("../src/Chunk.js", async (importActual) => {
  const Chunk = vi.fn();
  Chunk.prototype.hasNext = vi.fn();
  Chunk.prototype.getChange = vi.fn();
  Chunk.prototype.getCursor = vi.fn();
  Chunk.prototype.chunkPath = vi.fn();

  const actual = await importActual<typeof import("../src/Chunk.js")>();
  return {
    ...actual,
    Chunk,
  };
});

vi.mock("../src/ChunkFactory.js", async (importActual) => {
  const ChunkFactory = vi.fn();
  ChunkFactory.prototype.create = vi.fn();

  const actual = await importActual<typeof import("../src/ChunkFactory.js")>();
  return {
    ...actual,
    ChunkFactory,
  };
});

import { ContainerClient } from "@azure/storage-blob";
import { Chunk } from "../src/Chunk.js";
import { ChunkFactory } from "../src/ChunkFactory.js";

describe("Shard", async () => {
  let chunkFactoryStub: ChunkFactory;
  let containerClientSub: ContainerClient;
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
    chunkStub = new Chunk(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );

    containerClientSub = new ContainerClient(expect.anything());
    vi.mocked(containerClientSub.listBlobsFlat).mockImplementation((options) => {
      return fakeListBlobsFlat(options as any) as any;
    });

    chunkFactoryStub = new ChunkFactory(expect.anything(), expect.anything());
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
      containerClientSub,
      shardPathWithoutContainer,
      shardCursor,
    );
    expect(chunkFactoryStub.create).toHaveBeenCalledWith(
      containerClientSub,
      `${shardPathWithoutContainer}0000${chunkIndex}.avro`,
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );

    // shift to next chunk when currentChunk is done
    vi.mocked(chunkStub.hasNext).mockReturnValueOnce(false);

    const nextChunkStub = new Chunk(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    vi.mocked(nextChunkStub.hasNext).mockReturnValueOnce(true);
    const event = { id: "a" };
    vi.mocked(nextChunkStub.getChange).mockReturnValueOnce(event as any);
    vi.spyOn(nextChunkStub, "chunkPath", "get").mockReturnValueOnce(
      `log/00/2019/02/22/1810/0000${chunkIndex + 1}.avro`,
    );
    vi.mocked(chunkFactoryStub.create).mockResolvedValueOnce(nextChunkStub);

    const change = await shard.getChange();
    expect(chunkFactoryStub.create).toHaveBeenCalledExactlyOnceWith(
      containerClientSub,
      `${shardPathWithoutContainer}0000${chunkIndex + 1}.avro`,
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    assert.deepStrictEqual(change, event as BlobChangeFeedEvent);
    const cursor2 = shard.getCursor();
    assert.deepStrictEqual(cursor2?.CurrentChunkPath, nextChunkStub.chunkPath);

    // chunks used up
    vi.mocked(nextChunkStub.hasNext).mockReturnValueOnce(false);
    vi.mocked(nextChunkStub.getChange).mockResolvedValueOnce(undefined as any);
    const lastChunkStub = new Chunk(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    vi.mocked(lastChunkStub.hasNext).mockReturnValueOnce(false);
    vi.spyOn(lastChunkStub, "chunkPath", "get").mockReturnValueOnce(
      `log/00/2019/02/22/1810/0000${chunkIndex + 2}.avro`,
    );
    vi.mocked(chunkFactoryStub.create).mockResolvedValueOnce(lastChunkStub);

    const change2 = await shard.getChange();
    expect(chunkFactoryStub.create).toHaveBeenCalledWith(
      containerClientSub,
      `${shardPathWithoutContainer}0000${chunkIndex + 2}.avro`,
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    assert.equal(change2, undefined);
    const cursor3 = shard.getCursor();
    assert.deepStrictEqual(cursor3?.CurrentChunkPath, lastChunkStub.chunkPath);
  });
});
