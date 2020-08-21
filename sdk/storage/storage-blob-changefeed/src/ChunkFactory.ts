// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroReaderFactory } from "./AvroReaderFactory";
import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Chunk } from "./Chunk";
import { AvroReader } from "../../storage-internal-avro/src";
import { bodyToAvroReadable } from "./utils/utils.node";
import { AbortSignalLike } from '@azure/core-http';

/**
 * Options to configure {@link ChunkFactory.create} operation.
 *
 * @export
 * @interface CreateChunkOptions
 */
export interface CreateChunkOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof CreateChunkOptions
   */
  abortSignal?: AbortSignalLike;
}

export class ChunkFactory {
  private readonly _avroReaderFactory: AvroReaderFactory;

  constructor(avroReaderFactory: AvroReaderFactory) {
    this._avroReaderFactory = avroReaderFactory;
  }

  public async create(
    containerClient: ContainerClient,
    chunkPath: string,
    blockOffset?: number,
    eventIndex?: number,
    options: CreateChunkOptions = {}
  ): Promise<Chunk> {
    const blobClient = containerClient.getBlobClient(chunkPath);
    blockOffset = blockOffset || 0;
    eventIndex = eventIndex || 0;

    const downloadRes = await blobClient.download(blockOffset, undefined, {
      abortSignal: options.abortSignal
    });

    const dataStream = bodyToAvroReadable(downloadRes);
    let avroReader: AvroReader;
    if (blockOffset !== 0) {
      const headerDownloadRes = await blobClient.download(0, undefined, {
        abortSignal: options.abortSignal
      });
      const headerStream = bodyToAvroReadable(headerDownloadRes);
      avroReader = this._avroReaderFactory.create(
        dataStream,
        headerStream,
        blockOffset,
        eventIndex
      );
    } else {
      avroReader = this._avroReaderFactory.create(dataStream);
    }

    return new Chunk(avroReader, blockOffset, eventIndex, chunkPath, {abortSignal: options.abortSignal});
  }
}
