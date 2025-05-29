"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = delay;
const utils_js_1 = require("./utils.js");
/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to be delayed.
 */
function delay(milliseconds) {
    if ((0, utils_js_1.isPlaybackMode)()) {
        return;
    }
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
//# sourceMappingURL=delay.js.map