"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const utils_common_js_1 = require("./utils/utils.common.js");
class Chunk {
    get blockOffset() {
        return this._blockOffset;
    }
    get eventIndex() {
        return this._eventIndex;
    }
    constructor(avroReader, blockOffset, eventIndex, chunkPath, avroOptions = {}) {
        this.chunkPath = chunkPath;
        this.avroReader = avroReader;
        this._blockOffset = blockOffset;
        this._eventIndex = eventIndex;
        this.iter = this.avroReader.parseObjects(avroOptions);
    }
    hasNext() {
        return this.avroReader.hasNext();
    }
    async getChange() {
        if (!this.hasNext()) {
            return undefined;
        }
        const next = await this.iter.next();
        this._eventIndex = this.avroReader.objectIndex;
        this._blockOffset = this.avroReader.blockOffset;
        if (next.done) {
            return undefined;
        }
        else {
            const eventRaw = next.value;
            if (eventRaw === null) {
                return undefined;
            }
            return (0, utils_common_js_1.rawEventToBlobChangeFeedEvent)(eventRaw);
        }
    }
}
exports.Chunk = Chunk;
//# sourceMappingURL=Chunk.js.map