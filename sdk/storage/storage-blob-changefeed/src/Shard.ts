// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { ChunkFactory } from "./ChunkFactory";
import { Chunk } from "./Chunk";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ShardCursor } from "./models/ChangeFeedCursor";
import { AbortSignalLike } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * Options to configure {@link Shard.getChange} operation.
 *
 * @export
 * @interface ShardGetChangeOptions
 */
export interface ShardGetChangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShardGetChangeOptions
   */
  abortSignal?: AbortSignalLike;
}

export class Shard {
  private readonly _containerClient: ContainerClient;

  private readonly _chunkFactory: ChunkFactory;

  private readonly _chunks: string[];

  private _currentChunk: Chunk | undefined;

  constructor(
    containerClient: ContainerClient,
    chunkFactory: ChunkFactory,
    chunks: string[],
    currentChunk: Chunk | undefined,
    public readonly shardPath: string
  ) {
    this._containerClient = containerClient;
    this._chunkFactory = chunkFactory;
    this._chunks = chunks;
    this._currentChunk = currentChunk;
  }

  public hasNext(): boolean {
    return (
      this._chunks.length > 0 || (this._currentChunk !== undefined && this._currentChunk.hasNext())
    );
  }

  public async getChange(
    options: ShardGetChangeOptions = {}
  ): Promise<BlobChangeFeedEvent | undefined> {
    const { span, spanOptions } = createSpan("Shard-getChange", options.tracingOptions);
    try {
      let event: BlobChangeFeedEvent | undefined = undefined;
      while (event === undefined && this.hasNext()) {
        event = await this._currentChunk!.getChange();

        // Remove currentChunk if it doesn't have more events.
        if (!this._currentChunk!.hasNext() && this._chunks.length > 0) {
          this._currentChunk = await this._chunkFactory.create(
            this._containerClient,
            this._chunks.shift()!,
            undefined,
            undefined,
            {
              abortSignal: options.abortSignal,
              tracingOptions: { ...options.tracingOptions, spanOptions }
            }
          );
        }
      }
      return event;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public getCursor(): ShardCursor | undefined {
    return this._currentChunk === undefined
      ? undefined
      : {
          CurrentChunkPath: this._currentChunk.chunkPath,
          BlockOffset: this._currentChunk.blockOffset,
          EventIndex: this._currentChunk.eventIndex
        };
  }
}
