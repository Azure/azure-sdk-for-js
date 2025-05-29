"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeaders = generateHeaders;
const hmac_js_1 = require("./hmac.js");
const index_js_1 = require("../common/index.js");
async function generateHeaders(masterKey, method, resourceType = index_js_1.ResourceType.none, resourceId = "", date = new Date()) {
    if (masterKey.startsWith("type=sas&")) {
        return {
            [index_js_1.Constants.HttpHeaders.Authorization]: encodeURIComponent(masterKey),
            [index_js_1.Constants.HttpHeaders.XDate]: date.toUTCString(),
        };
    }
    const sig = await signature(masterKey, method, resourceType, resourceId, date);
    return {
        [index_js_1.Constants.HttpHeaders.Authorization]: sig,
        [index_js_1.Constants.HttpHeaders.XDate]: date.toUTCString(),
    };
}
async function signature(masterKey, method, resourceType, resourceId = "", date = new Date()) {
    const type = "master";
    const version = "1.0";
    const text = method.toLowerCase() +
        "\n" +
        resourceType.toLowerCase() +
        "\n" +
        resourceId +
        "\n" +
        date.toUTCString().toLowerCase() +
        "\n" +
        "" +
        "\n";
    const signed = await (0, hmac_js_1.hmac)(masterKey, text);
    return encodeURIComponent("type=" + type + "&ver=" + version + "&sig=" + signed);
}
//# sourceMappingURL=headers.js.map