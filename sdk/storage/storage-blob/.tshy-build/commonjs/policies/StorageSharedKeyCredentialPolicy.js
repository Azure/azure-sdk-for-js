"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageSharedKeyCredentialPolicy = void 0;
const constants_js_1 = require("../utils/constants.js");
const utils_common_js_1 = require("../utils/utils.common.js");
const CredentialPolicy_js_1 = require("./CredentialPolicy.js");
const SharedKeyComparator_js_1 = require("../utils/SharedKeyComparator.js");
/**
 * StorageSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
class StorageSharedKeyCredentialPolicy extends CredentialPolicy_js_1.CredentialPolicy {
    /**
     * Creates an instance of StorageSharedKeyCredentialPolicy.
     * @param nextPolicy -
     * @param options -
     * @param factory -
     */
    constructor(nextPolicy, options, factory) {
        super(nextPolicy, options);
        this.factory = factory;
    }
    /**
     * Signs request.
     *
     * @param request -
     */
    signRequest(request) {
        request.headers.set(constants_js_1.HeaderConstants.X_MS_DATE, new Date().toUTCString());
        if (request.body &&
            (typeof request.body === "string" || request.body !== undefined) &&
            request.body.length > 0) {
            request.headers.set(constants_js_1.HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
        }
        const stringToSign = [
            request.method.toUpperCase(),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_LANGUAGE),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_ENCODING),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_LENGTH),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_MD5),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.CONTENT_TYPE),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.DATE),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_MODIFIED_SINCE),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_MATCH),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_NONE_MATCH),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.IF_UNMODIFIED_SINCE),
            this.getHeaderValueToSign(request, constants_js_1.HeaderConstants.RANGE),
        ].join("\n") +
            "\n" +
            this.getCanonicalizedHeadersString(request) +
            this.getCanonicalizedResourceString(request);
        const signature = this.factory.computeHMACSHA256(stringToSign);
        request.headers.set(constants_js_1.HeaderConstants.AUTHORIZATION, `SharedKey ${this.factory.accountName}:${signature}`);
        // console.log(`[URL]:${request.url}`);
        // console.log(`[HEADERS]:${request.headers.toString()}`);
        // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
        // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
        return request;
    }
    /**
     * Retrieve header value according to shared key sign rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
     *
     * @param request -
     * @param headerName -
     */
    getHeaderValueToSign(request, headerName) {
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
     * @param request -
     */
    getCanonicalizedHeadersString(request) {
        let headersArray = request.headers.headersArray().filter((value) => {
            return value.name.toLowerCase().startsWith(constants_js_1.HeaderConstants.PREFIX_FOR_STORAGE);
        });
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
    /**
     * Retrieves the webResource canonicalized resource string.
     *
     * @param request -
     */
    getCanonicalizedResourceString(request) {
        const path = (0, utils_common_js_1.getURLPath)(request.url) || "/";
        let canonicalizedResourceString = "";
        canonicalizedResourceString += `/${this.factory.accountName}${path}`;
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
}
exports.StorageSharedKeyCredentialPolicy = StorageSharedKeyCredentialPolicy;
//# sourceMappingURL=StorageSharedKeyCredentialPolicy.js.map