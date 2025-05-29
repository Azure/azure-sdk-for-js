import type { AvroReadable } from "@azure/storage-internal-avro";
import { AvroReader } from "@azure/storage-internal-avro";
/**
 * Creates AvroReaders.  Allows us to inject mock AvroReaders in the Chunk unit tests.
 */
export declare class AvroReaderFactory {
    create(headerAndDataStream: AvroReadable): AvroReader;
    create(dataStream: AvroReadable, headerStream: AvroReadable, blockOffset: number, eventIndex: number): AvroReader;
}
//# sourceMappingURL=AvroReaderFactory.d.ts.map