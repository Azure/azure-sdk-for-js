// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShardFactory } from "./ShardFactory";
import { ContainerClient } from "@azure/storage-blob";
import { CHANGE_FEED_CONTAINER_NAME } from "./utils/constants";
import { Shard } from "./Shard";
import { Segment } from "./Segment";
import { SegmentCursor } from "./models/ChangeFeedCursor";
import { bodyToString } from "./utils/utils.node";
import { parseDateFromSegmentPath } from "./utils/utils.common";

export interface SegmentManifest {
  version?: number;
  begin?: Date;
  intervalSecs?: number;
  status: string;
  config?: any;
  chunkFilePaths: string[];
}

export class SegmentFactory {
  private readonly _shardFactory: ShardFactory;

  constructor(shardFactory: ShardFactory) {
    this._shardFactory = shardFactory;
  }

  public async create(
    containerClient: ContainerClient,
    manifestPath: string,
    cursor?: SegmentCursor
  ): Promise<Segment> {
    const shards: Shard[] = [];
    const dateTime: Date = parseDateFromSegmentPath(manifestPath);
    const shardIndex = cursor?.shardIndex || 0;

    const blobClient = containerClient.getBlobClient(manifestPath);
    const blobDownloadRes = await blobClient.download();
    const blobContent: string = await bodyToString(blobDownloadRes);

    const segmentManifest = JSON.parse(blobContent) as SegmentManifest;

    let i = 0;
    const containerPrefixLength = CHANGE_FEED_CONTAINER_NAME.length + 1; // "$blobchangefeed/"
    for (const shardPath of segmentManifest.chunkFilePaths) {
      const shard: Shard = await this._shardFactory.create(
        containerClient,
        shardPath.substring(containerPrefixLength),
        cursor?.shardCursors[i++]
      );
      shards.push(shard);
    }
    
    return new Segment(shards, shardIndex, dateTime);
  }
}
