import { ContainerClient } from "@azure/storage-blob";
import { Segment } from "./Segment";
import { SegmentFactory } from "./SegmentFactory";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedCursor } from "./models/ChangeFeedCursor";
import { getURI, hashString, getSegmentsInYear, minDate } from "./utils/utils.common";

export class ChangeFeed {
  /**
   * BlobContainerClient for making List Blob requests and creating Segments.
   *
   * @private
   * @type {ContainerClient}
   * @memberof ChangeFeed
   */
  private readonly _containerClient?: ContainerClient;

  private readonly _segmentFactory?: SegmentFactory;

  private readonly _years: number[];

  private _segments: string[];

  private _currentSegment?: Segment;

  private _lastConsumable?: Date;

  private _startTime?: Date;

  private _endTime?: Date;

  private _end?: Date;

  constructor();
  constructor(
    containerClient: ContainerClient,
    segmentFactory: SegmentFactory,
    years: number[],
    segments: string[],
    currentSegment: Segment,
    lastConsumable: Date,
    startTime?: Date,
    endTime?: Date
  );

  constructor(
    containerClient?: ContainerClient,
    segmentFactory?: SegmentFactory,
    years?: number[],
    segments?: string[],
    currentSegment?: Segment,
    lastConsumable?: Date,
    startTime?: Date,
    endTime?: Date
  ) {
    this._containerClient = containerClient;
    this._segmentFactory = segmentFactory;
    this._years = years || [];
    this._segments = segments || [];
    this._currentSegment = currentSegment;
    this._lastConsumable = lastConsumable;
    this._startTime = startTime;
    this._endTime = endTime;
    if (this._lastConsumable) {
      this._end = minDate(this._lastConsumable, this._endTime);
    }
  }

  private async advanceSegmentIfNecessary(): Promise<void> {
    if (!this._currentSegment) {
      throw new Error("Empty Change Feed shouldn't call this function.");
    }

    // If the current segment has more Events, we don't need to do anything.
    if (this._currentSegment.hasNext()) {
      return;
    }

    // If the current segment is completed, remove it
    if (this._segments.length > 0) {
      this._currentSegment = await this._segmentFactory!.create(
        this._containerClient!,
        this._segments.shift()!
      );
    }
    // If _segments is empty, refill it
    else if (this._segments.length === 0 && this._years.length > 0) {
      const year = this._years.shift();
      this._segments = await getSegmentsInYear(
        this._containerClient!,
        year!,
        this._startTime,
        this._end
      );

      if (this._segments.length > 0) {
        this._currentSegment = await this._segmentFactory!.create(
          this._containerClient!,
          this._segments.shift()!
        );
      } else {
        this._currentSegment = undefined;
      }
    }
  }

  public hasNext(): boolean {
    // Empty ChangeFeed, using _currentSegment as the indicator.
    if (!this._currentSegment) {
      return false;
    }

    if (
      this._segments.length === 0 &&
      this._years.length === 0 &&
      !this._currentSegment.hasNext()
    ) {
      return false;
    }

    return this._currentSegment.finalized && this._currentSegment.dateTime < this._end!;
  }

  public async getChange(): Promise<BlobChangeFeedEvent | undefined> {
    let event: BlobChangeFeedEvent | undefined = undefined;
    while (event === undefined && this.hasNext()) {
      event = await this._currentSegment!.getChange();
      await this.advanceSegmentIfNecessary();
    }
    return event;
  }

  public getCursor(): ChangeFeedCursor {
    if (!this._currentSegment) {
      throw new Error("Empty Change Feed shouldn't call this function.");
    }

    return {
      cursorVersion: 1,
      urlHash: hashString(getURI(this._containerClient!.url)),
      endTime: this._endTime?.toJSON(),
      currentSegmentCursor: this._currentSegment!.getCursor()
    };
  }
}
