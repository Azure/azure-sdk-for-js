// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChunkFactory } from "./ChunkFactory";
import { ShardCursor } from "./models/ChangeFeedCursor";
import { Shard } from "./Shard";
import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Chunk } from "./Chunk";
import { AbortSignalLike } from "@azure/abort-controller";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure {@link ShardFactory.create} operation.
 */
export interface CreateShardOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

export class ShardFactory {
  private readonly chunkFactory: ChunkFactory;

  constructor(chunkFactory: ChunkFactory) {
    this.chunkFactory = chunkFactory;
  }

  public async create(
    containerClient: ContainerClient,
    shardPath: string,
    shardCursor?: ShardCursor,
    options: CreateShardOptions = {}
  ): Promise<Shard> {
    const { span, updatedOptions } = createSpan("ShardFactory-create", options);
    try {
      const chunks: string[] = [];
      const blockOffset: number = shardCursor?.BlockOffset || 0;
      const eventIndex: number = shardCursor?.EventIndex || 0;

      for await (const blobItem of containerClient.listBlobsFlat({
        prefix: shardPath,
        abortSignal: options.abortSignal,
        tracingOptions: updatedOptions.tracingOptions,
      })) {
        chunks.push(blobItem.name);
      }

      const currentChunkPath = shardCursor?.CurrentChunkPath;
      let chunkIndex = -1;
      let currentChunk: Chunk | undefined = undefined;
      // Chunks can be empty right after hour flips.
      if (chunks.length !== 0) {
        // Fast forward to current Chunk
        if (currentChunkPath) {
          for (let i = 0; i < chunks.length; i++) {
            if (chunks[i] === currentChunkPath) {
              chunkIndex = i;
              break;
            }
          }
          if (chunkIndex === -1) {
            throw new Error(`Chunk ${currentChunkPath} not found.`);
          }
        } else {
          chunkIndex = 0;
        }

        // Fast forward to current Chunk.
        if (chunkIndex > 0) {
          chunks.splice(0, chunkIndex);
        }

        currentChunk = await this.chunkFactory.create(
          containerClient,
          chunks.shift()!,
          blockOffset,
          eventIndex,
          {
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          }
        );
      }

      return new Shard(containerClient, this.chunkFactory, chunks, currentChunk, shardPath);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
