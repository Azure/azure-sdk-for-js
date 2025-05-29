"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64JsonString = toBase64JsonString;
exports.fromBase64JsonString = fromBase64JsonString;
exports.getHttpHeader = getHttpHeader;
exports.readRequestBody = readRequestBody;
function isJsonObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
}
function toBase64JsonString(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64");
}
function fromBase64JsonString(base64String) {
    if (base64String === undefined) {
        return {};
    }
    try {
        const buf = Buffer.from(base64String, "base64").toString();
        const parsed = JSON.parse(buf);
        return isJsonObject(parsed) ? parsed : {};
    }
    catch (e) {
        console.warn("Unexpected state format:" + e);
        return {};
    }
}
function getHttpHeader(req, key) {
    if (!key)
        return undefined;
    // According to https://nodejs.org/api/http.html#http_class_http_incomingmessage, header names are always lower-cased
    const value = req.headers[key.toLowerCase()];
    if (value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    return value[0];
}
function readRequestBody(req) {
    return new Promise(function (resolve, reject) {
        const chunks = [];
        req.on("data", function (chunk) {
            chunks.push(chunk);
        });
        req.on("end", function () {
            const buffer = Buffer.concat(chunks);
            resolve(buffer);
        });
        // reject on request error
        req.on("error", function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
    });
}
//# sourceMappingURL=utils.js.map