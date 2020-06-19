import { ChunkFactory } from "./ChunkFactory";
import { ShardCursor } from "./models/ChangeFeedCursor";
import { Shard } from "./Shard";
import { ContainerClient } from "@azure/storage-blob";

export class ShardFactory {
  private readonly _chunkFactory: ChunkFactory;

  constructor(chunkFactory: ChunkFactory) {
    this._chunkFactory = chunkFactory;
  }

  public async create(
    containerClient: ContainerClient,
    shardPath: string,
    shardCursor?: ShardCursor
  ): Promise<Shard> {
    const chunks: string[] = [];
    const chunkIndex: number = shardCursor?.chunkIndex || 0;
    const blockOffset: number = shardCursor?.blockOffset || 0;
    const eventIndex: number = shardCursor?.eventIndex || 0;

    for await (const blobItem of containerClient.listBlobsFlat({ prefix: shardPath })) {
      chunks.push(blobItem.name);
    }

    if (chunks.length === 0) {
      throw new Error(`No chunk under directory ${shardPath}.`);
    }

    if (chunkIndex < 0 || chunkIndex >= chunks.length) {
      throw new Error(`Invalid chunkIndex for ${shardPath}.`);
    }

    // Fast forward to current Chunk.
    if (chunkIndex > 0) {
      chunks.splice(0, chunkIndex);
    }

    const currentChunk = await this._chunkFactory.create(
      containerClient,
      chunks.shift()!,
      blockOffset,
      eventIndex
    );
    return new Shard(containerClient, this._chunkFactory, chunks, currentChunk, chunkIndex);
  }
}
