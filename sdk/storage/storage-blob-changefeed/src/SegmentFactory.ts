// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShardFactory } from "./ShardFactory";
import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { CHANGE_FEED_CONTAINER_NAME } from "./utils/constants";
import { Shard } from "./Shard";
import { Segment } from "./Segment";
import { SegmentCursor } from "./models/ChangeFeedCursor";
import { bodyToString } from "./utils/utils.node";
import { parseDateFromSegmentPath } from "./utils/utils.common";
import { AbortSignalLike } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";

export interface SegmentManifest {
  version?: number;
  begin?: Date;
  intervalSecs?: number;
  status: string;
  config?: any;
  chunkFilePaths: string[];
}

/**
 * Options to configure {@link SegmentFactory.create} operation.
 *
 * @export
 * @interface CreateSegmentOptions
 */
export interface CreateSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof CreateSegmentOptions
   */
  abortSignal?: AbortSignalLike;
}

export class SegmentFactory {
  private readonly shardFactory: ShardFactory;

  constructor(shardFactory: ShardFactory) {
    this.shardFactory = shardFactory;
  }

  public async create(
    containerClient: ContainerClient,
    manifestPath: string,
    cursor?: SegmentCursor,
    options: CreateSegmentOptions = {}
  ): Promise<Segment> {
    const { span, spanOptions } = createSpan("SegmentFactory-create", options.tracingOptions);

    try {
      const shards: Shard[] = [];
      const dateTime: Date = parseDateFromSegmentPath(manifestPath);

      const blobClient = containerClient.getBlobClient(manifestPath);
      const blobDownloadRes = await blobClient.download(undefined, undefined, {
        abortSignal: options.abortSignal,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });
      const blobContent: string = await bodyToString(blobDownloadRes);

      const segmentManifest = JSON.parse(blobContent) as SegmentManifest;

      const containerPrefixLength = CHANGE_FEED_CONTAINER_NAME.length + 1; // "$blobchangefeed/"
      for (const shardPath of segmentManifest.chunkFilePaths) {
        const shardPathSubStr = shardPath.substring(containerPrefixLength);
        const shardCursor = cursor?.ShardCursors.find((x) =>
          x.CurrentChunkPath.startsWith(shardPathSubStr)
        );
        const shard: Shard = await this.shardFactory.create(
          containerClient,
          shardPathSubStr,
          shardCursor,
          {
            abortSignal: options.abortSignal,
            tracingOptions: { ...options.tracingOptions, spanOptions }
          }
        );
        if (shard.hasNext()) {
          shards.push(shard);
        }
      }

      let shardIndex = 0;
      if (cursor?.CurrentShardPath) {
        shardIndex = shards.findIndex((s) => s.shardPath === cursor?.CurrentShardPath);
        if (shardIndex === -1) {
          shardIndex = 0;
        }
      }
      return new Segment(shards, shardIndex, dateTime, manifestPath);
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
}
