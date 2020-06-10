import { AvroReadable, AvroReader } from "../../storage-internal-avro/src";

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
