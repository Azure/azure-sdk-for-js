"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedStartFromBeginning = void 0;
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from beginning of time.
 */
class ChangeFeedStartFromBeginning {
    constructor(cfResource) {
        this.cfResource = cfResource;
    }
    getCfResource() {
        return this.cfResource;
    }
}
exports.ChangeFeedStartFromBeginning = ChangeFeedStartFromBeginning;
//# sourceMappingURL=ChangeFeedStartFromBeginning.js.map