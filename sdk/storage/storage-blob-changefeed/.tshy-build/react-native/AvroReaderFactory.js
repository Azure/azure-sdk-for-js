// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AvroReader } from "@azure/storage-internal-avro";
/**
 * Creates AvroReaders.  Allows us to inject mock AvroReaders in the Chunk unit tests.
 */
export class AvroReaderFactory {
    create(dataStream, headerStream, blockOffset, eventIndex) {
        if (headerStream) {
            return new AvroReader(dataStream, headerStream, blockOffset, eventIndex);
        }
        else {
            return new AvroReader(dataStream);
        }
    }
}
//# sourceMappingURL=AvroReaderFactory.js.map