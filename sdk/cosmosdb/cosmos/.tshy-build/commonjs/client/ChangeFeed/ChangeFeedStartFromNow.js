"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedStartFromNow = void 0;
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from this moment in time.
 */
class ChangeFeedStartFromNow {
    constructor(cfResource) {
        this.cfResource = cfResource;
    }
    getCfResource() {
        return this.cfResource;
    }
}
exports.ChangeFeedStartFromNow = ChangeFeedStartFromNow;
//# sourceMappingURL=ChangeFeedStartFromNow.js.map