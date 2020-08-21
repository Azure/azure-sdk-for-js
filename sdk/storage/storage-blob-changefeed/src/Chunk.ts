// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroReader } from "../../storage-internal-avro/src";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { CommonOptions } from '@azure/storage-blob';
import { AbortSignalLike } from '@azure/core-http';
import { AvroParseOptions } from '../../storage-internal-avro/src/AvroReader';

/**
 * Options to configure {@link Chunk.getChange} operation.
 *
 * @export
 * @interface ChunkGetChangeOptions
 */
export interface ChunkGetChangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ChunkGetChangeOptions
   */
  abortSignal?: AbortSignalLike;
}

export class Chunk {
  private readonly _avroReader: AvroReader;
  private readonly _iter: AsyncIterableIterator<Record<string, any> | null>;

  private _blockOffset: number;
  public get blockOffset(): number {
    return this._blockOffset;
  }

  private _eventIndex: number;
  public get eventIndex(): number {
    return this._eventIndex;
  }

  constructor(avroReader: AvroReader, blockOffset: number, eventIndex: number, public readonly chunkPath: string, avroOptions: AvroParseOptions = {}) {
    this._avroReader = avroReader;
    this._blockOffset = blockOffset;
    this._eventIndex = eventIndex;

    this._iter = this._avroReader.parseObjects(avroOptions);
  }

  public hasNext(): boolean {
    return this._avroReader.hasNext();
  }

  public async getChange(): Promise<BlobChangeFeedEvent | undefined> {
    if (!this.hasNext()) {
      return undefined;
    }

    const next = await this._iter.next();
    this._eventIndex = this._avroReader.objectIndex;
    this._blockOffset = this._avroReader.blockOffset;
    if (next.done) {
      return undefined;
    } else {
      const eventRaw = next.value;
      if (eventRaw === null) {
        return undefined;
      }

      if (eventRaw.eventTime) {
        eventRaw.eventTime = new Date(eventRaw.eventTime);
      }
      if (eventRaw.eTag) {
        eventRaw.etag = eventRaw.eTag;
        delete eventRaw.eTag;
      }
      return eventRaw as BlobChangeFeedEvent;
    }
  }
}
