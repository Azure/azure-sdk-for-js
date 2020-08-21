// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient } from "@azure/storage-blob";
import { ChunkFactory } from "./ChunkFactory";
import { Chunk } from "./Chunk";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ShardCursor } from "./models/ChangeFeedCursor";

export class Shard {
  private readonly _containerClient: ContainerClient;

  private readonly _chunkFactory: ChunkFactory;

  private readonly _chunks: string[];

  private _currentChunk: Chunk | undefined;

  constructor(
    containerClient: ContainerClient,
    chunkFactory: ChunkFactory,
    chunks: string[],
    currentChunk: Chunk| undefined,
    public readonly shardPath: string,
  ) {
    this._containerClient = containerClient;
    this._chunkFactory = chunkFactory;
    this._chunks = chunks;
    this._currentChunk = currentChunk;
  }

  public hasNext(): boolean {
    return this._chunks.length > 0 || (this._currentChunk!== undefined && this._currentChunk.hasNext());
  }

  public async getChange(): Promise<BlobChangeFeedEvent | undefined> {
    let event: BlobChangeFeedEvent | undefined = undefined;
    while (event === undefined && this.hasNext()) {
      event = await this._currentChunk!.getChange();

      // Remove currentChunk if it doesn't have more events.
      if (!this._currentChunk!.hasNext() && this._chunks.length > 0) {
        this._currentChunk = await this._chunkFactory.create(
          this._containerClient,
          this._chunks.shift()!
        );
      }
    }
    return event;
  }

  public getCursor(): ShardCursor|undefined {
    return this._currentChunk === undefined? undefined: 
    {
      CurrentChunkPath: this._currentChunk.chunkPath,
      BlockOffset: this._currentChunk.blockOffset,
      EventIndex: this._currentChunk.eventIndex
    };
  }
}
