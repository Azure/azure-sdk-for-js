"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyToString = bodyToString;
exports.blobToString = blobToString;
exports.bodyToAvroReadable = bodyToAvroReadable;
/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
async function bodyToString(response, 
// tslint:disable-next-line:variable-name
_length) {
    const blob = await response.blobBody;
    return blobToString(blob);
}
async function blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
            resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
    });
}
function bodyToAvroReadable() {
    /* empty */
}
//# sourceMappingURL=utils.browser.js.map