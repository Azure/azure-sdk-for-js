// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroReadable, AvroReader } from "../../storage-internal-avro/src";

/**
 * Creates AvroReaders.  Allows us to inject mock AvroReaders in the Chunk unit tests.
 *
 * @export
 * @class AvroReaderFactory
 */
export class AvroReaderFactory {
  public create(headerAndDataStream: AvroReadable): AvroReader;

  public create(
    dataStream: AvroReadable,
    headerStream: AvroReadable,
    blockOffset: number,
    eventIndex: number
  ): AvroReader;

  public create(
    dataStream: AvroReadable,
    headerStream?: AvroReadable,
    blockOffset?: number,
    eventIndex?: number
  ): AvroReader {
    if (headerStream) {
      return new AvroReader(dataStream, headerStream, blockOffset!, eventIndex!);
    } else {
      return new AvroReader(dataStream);
    }
  }
}
