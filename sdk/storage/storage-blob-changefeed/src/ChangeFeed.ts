// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Segment } from "./Segment";
import { SegmentFactory } from "./SegmentFactory";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedCursor } from "./models/ChangeFeedCursor";
import { getSegmentsInYear, minDate, getHost } from "./utils/utils.common";
import { AbortSignalLike } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * Options to configure {@link ChangeFeed.getChange} operation.
 *
 * @export
 * @interface ChangeFeedGetChangeOptions
 */
export interface ChangeFeedGetChangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ChangeFeedGetChangeOptions
   */
  abortSignal?: AbortSignalLike;
}

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

  private async advanceSegmentIfNecessary(options: ChangeFeedGetChangeOptions = {}): Promise<void> {
    const { span, spanOptions } = createSpan(
      "ChangeFeed-advanceSegmentIfNecessary",
      options.tracingOptions
    );
    try {
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
          this._segments.shift()!,
          undefined,
          {
            abortSignal: options.abortSignal,
            tracingOptions: { ...options.tracingOptions, spanOptions }
          }
        );
      }
      // If _segments is empty, refill it
      else if (this._segments.length === 0 && this._years.length > 0) {
        const year = this._years.shift();
        this._segments = await getSegmentsInYear(
          this._containerClient!,
          year!,
          this._startTime,
          this._end,
          {
            abortSignal: options.abortSignal,
            tracingOptions: { ...options.tracingOptions, spanOptions }
          }
        );

        if (this._segments.length > 0) {
          this._currentSegment = await this._segmentFactory!.create(
            this._containerClient!,
            this._segments.shift()!,
            undefined,
            {
              abortSignal: options.abortSignal,
              tracingOptions: { ...options.tracingOptions, spanOptions }
            }
          );
        } else {
          this._currentSegment = undefined;
        }
      }
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

    return this._currentSegment.dateTime < this._end!;
  }

  public async getChange(
    options: ChangeFeedGetChangeOptions = {}
  ): Promise<BlobChangeFeedEvent | undefined> {
    const { span, spanOptions } = createSpan("ChangeFeed-getChange", options.tracingOptions);
    try {
      let event: BlobChangeFeedEvent | undefined = undefined;
      while (event === undefined && this.hasNext()) {
        event = await this._currentSegment!.getChange({
          abortSignal: options.abortSignal,
          tracingOptions: { ...options.tracingOptions, spanOptions }
        });
        await this.advanceSegmentIfNecessary({
          abortSignal: options.abortSignal,
          tracingOptions: { ...options.tracingOptions, spanOptions }
        });
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

  public getCursor(): ChangeFeedCursor {
    if (!this._currentSegment) {
      throw new Error("Empty Change Feed shouldn't call this function.");
    }

    return {
      CursorVersion: 1,
      UrlHost: getHost(this._containerClient!.url),
      EndTime: this._endTime?.toJSON(),
      CurrentSegmentCursor: this._currentSegment!.getCursor()
    };
  }
}
