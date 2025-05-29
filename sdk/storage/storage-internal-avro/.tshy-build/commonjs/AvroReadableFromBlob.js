"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvroReadableFromBlob = void 0;
const AvroReadable_js_1 = require("./AvroReadable.js");
const abort_controller_1 = require("@azure/abort-controller");
const ABORT_ERROR = new abort_controller_1.AbortError("Reading from the avro blob was aborted.");
class AvroReadableFromBlob extends AvroReadable_js_1.AvroReadable {
    constructor(blob) {
        super();
        this._blob = blob;
        this._position = 0;
    }
    get position() {
        return this._position;
    }
    async read(size, options = {}) {
        size = Math.min(size, this._blob.size - this._position);
        if (size <= 0) {
            return new Uint8Array();
        }
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            function cleanUp() {
                if (options.abortSignal) {
                    options.abortSignal.removeEventListener("abort", abortHandler);
                }
            }
            function abortHandler() {
                fileReader.abort();
                cleanUp();
                reject(ABORT_ERROR);
            }
            if (options.abortSignal) {
                options.abortSignal.addEventListener("abort", abortHandler);
            }
            fileReader.onloadend = (ev) => {
                cleanUp();
                resolve(new Uint8Array(ev.target.result));
            };
            fileReader.onerror = () => {
                cleanUp();
                reject();
            };
            fileReader.readAsArrayBuffer(this._blob.slice(this._position, (this._position += size)));
        });
    }
}
exports.AvroReadableFromBlob = AvroReadableFromBlob;
//# sourceMappingURL=AvroReadableFromBlob.js.map