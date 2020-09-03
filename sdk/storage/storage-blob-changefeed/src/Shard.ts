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
  private readonly containerClient: ContainerClient;

  private readonly chunkFactory: ChunkFactory;

  private readonly chunks: string[];

  private currentChunk: Chunk | undefined;

  constructor(
    containerClient: ContainerClient,
    chunkFactory: ChunkFactory,
    chunks: string[],
    currentChunk: Chunk | undefined,
    public readonly shardPath: string
  ) {
    this.containerClient = containerClient;
    this.chunkFactory = chunkFactory;
    this.chunks = chunks;
    this.currentChunk = currentChunk;
  }

  public hasNext(): boolean {
    return (
      this.chunks.length > 0 || (this.currentChunk !== undefined && this.currentChunk.hasNext())
    );
  }

  public async getChange(
    options: ShardGetChangeOptions = {}
  ): Promise<BlobChangeFeedEvent | undefined> {
    const { span, spanOptions } = createSpan("Shard-getChange", options.tracingOptions);
    try {
      let event: BlobChangeFeedEvent | undefined = undefined;
      while (event === undefined && this.hasNext()) {
        event = await this.currentChunk!.getChange();

        // Remove currentChunk if it doesn't have more events.
        if (!this.currentChunk!.hasNext() && this.chunks.length > 0) {
          this.currentChunk = await this.chunkFactory.create(
            this.containerClient,
            this.chunks.shift()!,
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
    return this.currentChunk === undefined
      ? undefined
      : {
          CurrentChunkPath: this.currentChunk.chunkPath,
          BlockOffset: this.currentChunk.blockOffset,
          EventIndex: this.currentChunk.eventIndex
        };
  }
}
