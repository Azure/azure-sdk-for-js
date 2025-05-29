"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageSharedKeyCredentialPolicyName = void 0;
exports.storageSharedKeyCredentialPolicy = storageSharedKeyCredentialPolicy;
const node_crypto_1 = require("node:crypto");
const constants_js_1 = require("../utils/constants.js");
const utils_common_js_1 = require("../utils/utils.common.js");
const SharedKeyComparator_js_1 = require("../utils/SharedKeyComparator.js");
/**
 * The programmatic identifier of the storageSharedKeyCredentialPolicy.
 */
exports.storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
function storageSharedKeyCredentialPolicy(options) {
    function signRequest(request) {
        request.headers.set(constants_js_1.HeaderConstants.X_MS_DATE, new Date().toUTCString());
        if (request.body &&
            (typeof request.body === "string" || Buffer.isBuffer(request.body)) &&
            request.body.length > 0) {
            request.headers.set(constants_js_1.HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
        }
        const stringToSign = [
            request.method.toUpperCase(),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_LANGUAGE),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_ENCODING),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_LENGTH),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_MD5),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_TYPE),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.DATE),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_MODIFIED_SINCE),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_MATCH),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_NONE_MATCH),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_UNMODIFIED_SINCE),
            getHeaderValueToSign(request, constants_js_1.HeaderConstants.RANGE),
        ].join("\n") +
            "\n" +
            getCanonicalizedHeadersString(request) +
            getCanonicalizedResourceString(request);
        const signature = (0, node_crypto_1.createHmac)("sha256", options.accountKey)
            .update(stringToSign, "utf8")
            .digest("base64");
        request.headers.set(constants_js_1.HeaderConstants.AUTHORIZATION, `SharedKey ${options.accountName}:${signature}`);
        // console.log(`[URL]:${request.url}`);
        // console.log(`[HEADERS]:${request.headers.toString()}`);
        // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
        // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
    }
    /**
     * Retrieve header value according to shared key sign rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
     */
    function getHeaderValueToSign(request, headerName) {
        const value = request.headers.get(headerName);
        if (!value) {
            return "";
        }
        // When using version 2015-02-21 or later, if Content-Length is zero, then
        // set the Content-Length part of the StringToSign to an empty string.
        // https://learn.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
        if (headerName === constants_js_1.HeaderConstants.CONTENT_LENGTH && value === "0") {
            return "";
        }
        return value;
    }
    /**
     * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
     * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
     * 2. Convert each HTTP header name to lowercase.
     * 3. Sort the headers lexicographically by header name, in ascending order.
     *    Each header may appear only once in the string.
     * 4. Replace any linear whitespace in the header value with a single space.
     * 5. Trim any whitespace around the colon in the header.
     * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
     *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
     *
     */
    function getCanonicalizedHeadersString(request) {
        let headersArray = [];
        for (const [name, value] of request.headers) {
            if (name.toLowerCase().startsWith(constants_js_1.HeaderConstants.PREFIX_FOR_STORAGE)) {
                headersArray.push({ name, value });
            }
        }
        headersArray.sort((a, b) => {
            return (0, SharedKeyComparator_js_1.compareHeader)(a.name.toLowerCase(), b.name.toLowerCase());
        });
        // Remove duplicate headers
        headersArray = headersArray.filter((value, index, array) => {
            if (index > 0 && value.name.toLowerCase() === array[index - 1].name.toLowerCase()) {
                return false;
            }
            return true;
        });
        let canonicalizedHeadersStringToSign = "";
        headersArray.forEach((header) => {
            canonicalizedHeadersStringToSign += `${header.name
                .toLowerCase()
                .trimRight()}:${header.value.trimLeft()}\n`;
        });
        return canonicalizedHeadersStringToSign;
    }
    function getCanonicalizedResourceString(request) {
        const path = (0, utils_common_js_1.getURLPath)(request.url) || "/";
        let canonicalizedResourceString = "";
        canonicalizedResourceString += `/${options.accountName}${path}`;
        const queries = (0, utils_common_js_1.getURLQueries)(request.url);
        const lowercaseQueries = {};
        if (queries) {
            const queryKeys = [];
            for (const key in queries) {
                if (Object.prototype.hasOwnProperty.call(queries, key)) {
                    const lowercaseKey = key.toLowerCase();
                    lowercaseQueries[lowercaseKey] = queries[key];
                    queryKeys.push(lowercaseKey);
                }
            }
            queryKeys.sort();
            for (const key of queryKeys) {
                canonicalizedResourceString += `\n${key}:${decodeURIComponent(lowercaseQueries[key])}`;
            }
        }
        return canonicalizedResourceString;
    }
    return {
        name: exports.storageSharedKeyCredentialPolicyName,
        async sendRequest(request, next) {
            signRequest(request);
            return next(request);
        },
    };
}
//# sourceMappingURL=StorageSharedKeyCredentialPolicyV2.js.map