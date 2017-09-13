"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./util/utils");
const serializer_1 = require("./serializer");
/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 *
 * @constructor
 */
class WebResource {
    constructor(url, method, body, query, headers = {}, rawResponse = false) {
        this.headers = {};
        this.rawResponse = rawResponse;
        this.url = url || "";
        this.method = method || "GET";
        this.headers = headers || {};
        this.body = body;
        this.query = query;
        this.formData = undefined;
    }
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    validateRequestProperties() {
        if (!this.method || !this.url || !this.headers["Content-Type"] || !this.headers["accept-language"]) {
            throw new Error("method, url, headers[\"Content-Type\"], headers[\"accept-language\"] are " +
                "required properties before making a request. Either provide them or use WebResource.prepare() method.");
        }
        return;
    }
    /**
     * Prepares the request.
     * @param {RequestPrepareOptions} options - Options to provide for preparing the request.
     * @returns {object} WebResource Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
     */
    prepare(options) {
        if (options === null || options === undefined || typeof options !== "object") {
            throw new Error("options cannot be null or undefined and must be of type object");
        }
        if (options.method === null || options.method === undefined || typeof options.method.valueOf() !== "string") {
            throw new Error("options.method cannot be null or undefined and it must be of type string.");
        }
        if (options.url && options.pathTemplate) {
            throw new Error("options.url and options.pathTemplate are mutually exclusive. Please provide either of them.");
        }
        if ((options.pathTemplate === null || options.pathTemplate === undefined || typeof options.pathTemplate.valueOf() !== "string") && (options.url === null || options.url === undefined || typeof options.url.valueOf() !== "string")) {
            throw new Error("Please provide either options.pathTemplate or options.url. Currently none of them were provided.");
        }
        // set the url if it is provided.
        if (options.url) {
            if (typeof options.url !== "string") {
                throw new Error("options.url must be of type \"string\".");
            }
            this.url = options.url;
        }
        // set the method
        if (options.method) {
            const validMethods = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
            if (validMethods.indexOf(options.method.toUpperCase()) === -1) {
                throw new Error("The provided method \"" + options.method + "\" is invalid. Supported HTTP methods are: " + JSON.stringify(validMethods));
            }
        }
        this.method = options.method.toUpperCase();
        // construct the url if path template is provided
        if (options.pathTemplate) {
            if (typeof options.pathTemplate !== "string") {
                throw new Error("options.pathTemplate must be of type \"string\".");
            }
            if (!options.baseUrl) {
                options.baseUrl = "https://management.azure.com";
            }
            const baseUrl = options.baseUrl;
            let url = baseUrl + (baseUrl.endsWith("/") ? "" : "/") + (options.pathTemplate.startsWith("/") ? options.pathTemplate.slice(1) : options.pathTemplate);
            const segments = url.match(/({\w*\s*\w*})/ig);
            if (segments && segments.length) {
                if (options.pathParameters === null || options.pathParameters === undefined || typeof options.pathParameters !== "object") {
                    throw new Error(`pathTemplate: ${options.pathTemplate} has been provided. Hence, options.pathParameters ` +
                        `cannot be null or undefined and must be of type "object".`);
                }
                segments.forEach(function (item) {
                    const pathParamName = item.slice(1, -1);
                    const pathParam = options.pathParameters[pathParamName];
                    if (pathParam === null || pathParam === undefined || !(typeof pathParam === "string" || typeof pathParam === "object")) {
                        throw new Error(`pathTemplate: ${options.pathTemplate} contains the path parameter ${pathParamName}` +
                            ` however, it is not present in ${options.pathParameters} - ${JSON.stringify(options.pathParameters, undefined, 2)}.` +
                            `The value of the path parameter can either be a "string" of the form { ${pathParamName}: "some sample value" } or ` +
                            `it can be an "object" of the form { "${pathParamName}": { value: "some sample value", skipUrlEncoding: true } }.`);
                    }
                    if (typeof pathParam.valueOf() === "string") {
                        url = url.replace(item, encodeURIComponent(pathParam));
                    }
                    if (typeof pathParam.valueOf() === "object") {
                        if (!pathParam.value) {
                            throw new Error(`options.pathParameters[${pathParamName}] is of type "object" but it does not contain a "value" property.`);
                        }
                        if (pathParam.skipUrlEncoding) {
                            url = url.replace(item, pathParam.value);
                        }
                        else {
                            url = url.replace(item, encodeURIComponent(pathParam.value));
                        }
                    }
                });
            }
            this.url = url;
        }
        // append query parameters to the url if they are provided. They can be provided with pathTemplate or url option.
        if (options.queryParameters) {
            if (typeof options.queryParameters !== "object") {
                throw new Error(`options.queryParameters must be of type object. It should be a JSON object ` +
                    `of "query-parameter-name" as the key and the "query-parameter-value" as the value. ` +
                    `The "query-parameter-value" may be fo type "string" or an "object" of the form { value: "query-parameter-value", skipUrlEncoding: true }.`);
            }
            // append question mark if it is not present in the url
            if (this.url && this.url.indexOf("?") === -1) {
                this.url += "?";
            }
            // construct queryString
            const queryParams = [];
            const queryParameters = options.queryParameters;
            // We need to populate this.query as a dictionary if the request is being used for Sway's validateRequest().
            this.query = {};
            for (const queryParamName in queryParameters) {
                const queryParam = queryParameters[queryParamName];
                if (queryParam) {
                    if (typeof queryParam === "string") {
                        queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam));
                        this.query[queryParamName] = encodeURIComponent(queryParam);
                    }
                    else if (typeof queryParam === "object") {
                        if (!queryParam.value) {
                            throw new Error(`options.queryParameters[${queryParamName}] is of type "object" but it does not contain a "value" property.`);
                        }
                        if (queryParam.skipUrlEncoding) {
                            queryParams.push(queryParamName + "=" + queryParam.value);
                            this.query[queryParamName] = queryParam.value;
                        }
                        else {
                            queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam.value));
                            this.query[queryParamName] = encodeURIComponent(queryParam.value);
                        }
                    }
                }
            } // end-of-for
            // append the queryString
            this.url += queryParams.join("&");
        }
        // add headers to the request if they are provided
        if (options.headers) {
            const headers = options.headers;
            for (const headerName in headers) {
                if (headers.hasOwnProperty(headerName)) {
                    this.headers[headerName] = headers[headerName];
                }
            }
        }
        // ensure accept-language is set correctly
        if (!this.headers["accept-language"]) {
            this.headers["accept-language"] = "en-US";
        }
        // ensure the request-id is set correctly
        if (!this.headers["x-ms-client-request-id"] && !options.disableClientRequestId) {
            this.headers["x-ms-client-request-id"] = utils_1.generateUuid();
        }
        // default
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/json; charset=utf-8";
        }
        // set the request body. request.js automatically sets the Content-Length request header, so we need not set it explicilty
        this.body = undefined;
        if (options.body !== null && options.body !== undefined) {
            // body as a stream special case. set the body as-is and check for some special request headers specific to sending a stream.
            if (options.bodyIsStream) {
                this.body = options.body;
                if (!this.headers["Transfer-Encoding"]) {
                    this.headers["Transfer-Encoding"] = "chunked";
                }
                if (this.headers["Content-Type"] !== "application/octet-stream") {
                    this.headers["Content-Type"] = "application/octet-stream";
                }
            }
            else {
                let serializedBody = undefined;
                if (options.serializationMapper) {
                    serializedBody = new serializer_1.Serializer(options.mappers).serialize(options.serializationMapper, options.body, "requestBody");
                }
                if (options.disableJsonStringifyOnBody) {
                    this.body = serializedBody || options.body;
                }
                else {
                    this.body = serializedBody ? JSON.stringify(serializedBody) : JSON.stringify(options.body);
                }
            }
        }
        return this;
    }
}
exports.WebResource = WebResource;
//# sourceMappingURL=webResource.js.map