// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Segment } from "./Segment";
import { SegmentFactory } from "./SegmentFactory";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedCursor } from "./models/ChangeFeedCursor";
import { getSegmentsInYear, minDate, getHost } from "./utils/utils.common";
import { AbortSignalLike } from "@azure/abort-controller";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";

/**
 * Options to configure {@link ChangeFeed.getChange} operation.
 */
export interface ChangeFeedGetChangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

export class ChangeFeed {
  /**
   * BlobContainerClient for making List Blob requests and creating Segments.
   */
  private readonly containerClient?: ContainerClient;

  private readonly segmentFactory?: SegmentFactory;

  private readonly years: number[];

  private segments: string[];

  private currentSegment?: Segment;

  private lastConsumable?: Date;

  private startTime?: Date;

  private endTime?: Date;

  private end?: Date;

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
    this.containerClient = containerClient;
    this.segmentFactory = segmentFactory;
    this.years = years || [];
    this.segments = segments || [];
    this.currentSegment = currentSegment;
    this.lastConsumable = lastConsumable;
    this.startTime = startTime;
    this.endTime = endTime;
    if (this.lastConsumable) {
      this.end = minDate(this.lastConsumable, this.endTime);
    }
  }

  private async advanceSegmentIfNecessary(options: ChangeFeedGetChangeOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ChangeFeed-advanceSegmentIfNecessary", options);
    try {
      if (!this.currentSegment) {
        throw new Error("Empty Change Feed shouldn't call this function.");
      }

      // If the current segment has more Events, we don't need to do anything.
      if (this.currentSegment.hasNext()) {
        return;
      }

      // If the current segment is completed, remove it
      if (this.segments.length > 0) {
        this.currentSegment = await this.segmentFactory!.create(
          this.containerClient!,
          this.segments.shift()!,
          undefined,
          {
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          }
        );
      }
      // If segments is empty, refill it
      else if (this.segments.length === 0 && this.years.length > 0) {
        const year = this.years.shift();
        this.segments = await getSegmentsInYear(
          this.containerClient!,
          year!,
          this.startTime,
          this.end,
          {
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          }
        );

        if (this.segments.length > 0) {
          this.currentSegment = await this.segmentFactory!.create(
            this.containerClient!,
            this.segments.shift()!,
            undefined,
            {
              abortSignal: options.abortSignal,
              tracingOptions: updatedOptions.tracingOptions,
            }
          );
        } else {
          this.currentSegment = undefined;
        }
      }
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

  public hasNext(): boolean {
    // Empty ChangeFeed, using currentSegment as the indicator.
    if (!this.currentSegment) {
      return false;
    }

    if (this.segments.length === 0 && this.years.length === 0 && !this.currentSegment.hasNext()) {
      return false;
    }

    return this.currentSegment.dateTime < this.end!;
  }

  public async getChange(
    options: ChangeFeedGetChangeOptions = {}
  ): Promise<BlobChangeFeedEvent | undefined> {
    const { span, updatedOptions } = createSpan("ChangeFeed-getChange", options);
    try {
      let event: BlobChangeFeedEvent | undefined = undefined;
      while (event === undefined && this.hasNext()) {
        event = await this.currentSegment!.getChange({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
        await this.advanceSegmentIfNecessary({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
      }
      return event;
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

  public getCursor(): ChangeFeedCursor {
    if (!this.currentSegment) {
      throw new Error("Empty Change Feed shouldn't call this function.");
    }

    return {
      CursorVersion: 1,
      UrlHost: getHost(this.containerClient!.url)!,
      EndTime: this.endTime?.toJSON(),
      CurrentSegmentCursor: this.currentSegment!.getCursor(),
    };
  }
}
