"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvroReaderFactory = void 0;
const storage_internal_avro_1 = require("@azure/storage-internal-avro");
/**
 * Creates AvroReaders.  Allows us to inject mock AvroReaders in the Chunk unit tests.
 */
class AvroReaderFactory {
    create(dataStream, headerStream, blockOffset, eventIndex) {
        if (headerStream) {
            return new storage_internal_avro_1.AvroReader(dataStream, headerStream, blockOffset, eventIndex);
        }
        else {
            return new storage_internal_avro_1.AvroReader(dataStream);
        }
    }
}
exports.AvroReaderFactory = AvroReaderFactory;
//# sourceMappingURL=AvroReaderFactory.js.map