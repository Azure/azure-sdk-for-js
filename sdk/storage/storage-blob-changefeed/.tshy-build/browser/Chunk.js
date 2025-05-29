// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { rawEventToBlobChangeFeedEvent } from "./utils/utils.common.js";
export class Chunk {
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
            return rawEventToBlobChangeFeedEvent(eventRaw);
        }
    }
}
//# sourceMappingURL=Chunk.js.map