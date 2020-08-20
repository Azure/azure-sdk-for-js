import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { ChangeFeed } from "./ChangeFeed";
import { ChangeFeedCursor } from "./models/ChangeFeedCursor";
import { CHANGE_FEED_CONTAINER_NAME, CHANGE_FEED_META_SEGMENT_PATH } from "./utils/constants";
import {
  ceilToNearestHour,
  floorToNearestHour,
  getURI,
  hashString,
  getYearsPaths,
  getSegmentsInYear,
  minDate
} from "./utils/utils.common";
import { bodyToString } from "./utils/utils.node";
import { SegmentFactory } from "./SegmentFactory";
import { ShardFactory } from "./ShardFactory";
import { ChunkFactory } from "./ChunkFactory";
import { AvroReaderFactory } from "./AvroReaderFactory";
import { Segment } from "./Segment";

interface MetaSegments {
  version?: number;
  lastConsumable: string;
}

export class ChangeFeedFactory {
  private readonly _segmentFactory: SegmentFactory;

  constructor();
  constructor(segmentFactory: SegmentFactory);
  constructor(segmentFactory?: SegmentFactory) {
    if (segmentFactory) {
      this._segmentFactory = segmentFactory;
    } else {
      this._segmentFactory = new SegmentFactory(
        new ShardFactory(new ChunkFactory(new AvroReaderFactory()))
      );
    }
  }

  private static validateCursor(containerClient: ContainerClient, cursor: ChangeFeedCursor): void {
    if (hashString(getURI(containerClient.url)) !== cursor.urlHash) {
      throw new Error("Cursor URL does not match container URL.");
    }
  }

  public async create(
    blobServiceClient: BlobServiceClient,
    continuationToken?: string,
    startTime?: Date,
    endTime?: Date
  ): Promise<ChangeFeed> {
    const containerClient = blobServiceClient.getContainerClient(CHANGE_FEED_CONTAINER_NAME);
    let cursor: ChangeFeedCursor | undefined = undefined;
    // Create cursor.
    if (continuationToken) {
      cursor = JSON.parse(continuationToken);
      ChangeFeedFactory.validateCursor(containerClient, cursor!);
      // startTime passed in is ignored
      startTime = new Date(cursor!.currentSegmentCursor.segmentTime);
      if (cursor!.endTime) {
        endTime = new Date(cursor!.endTime!);
      }
    }
    // Round start and end time if we are not using the cursor.
    else {
      startTime = floorToNearestHour(startTime);
      endTime = ceilToNearestHour(endTime);
    }

    // Check if Change Feed has been enabled for this account.
    const changeFeedContainerExists = await containerClient.exists();
    if (!changeFeedContainerExists) {
      throw new Error(
        "Change Feed hasn't been enabled on this account, or is currently being enabled."
      );
    }

    if (startTime && endTime && startTime >= endTime) {
      return new ChangeFeed();
    }

    // Get last consumable.
    const blobClient = containerClient.getBlobClient(CHANGE_FEED_META_SEGMENT_PATH);
    const blobDownloadRes = await blobClient.download();
    const lastConsumable = new Date(
      (JSON.parse(await bodyToString(blobDownloadRes)) as MetaSegments).lastConsumable
    );

    // Get year paths
    const years: number[] = await getYearsPaths(containerClient);

    // Dequeue any years that occur before start time.
    if (startTime) {
      const startYear = startTime.getUTCFullYear();
      while (years.length > 0 && years[0] < startYear) {
        years.shift();
      }
    }
    if (years.length === 0) {
      return new ChangeFeed();
    }

    let segments: string[] = [];
    while (segments.length === 0 && years.length !== 0) {
      segments = await getSegmentsInYear(
        containerClient,
        years.shift()!,
        startTime,
        minDate(lastConsumable, endTime)
      );
    }
    if (segments.length === 0) {
      return new ChangeFeed();
    }
    const currentSegment: Segment = await this._segmentFactory.create(
      containerClient,
      segments.shift()!,
      cursor?.currentSegmentCursor
    );

    return new ChangeFeed(
      containerClient,
      this._segmentFactory,
      years,
      segments,
      currentSegment,
      lastConsumable,
      startTime,
      endTime
    );
  }
}
