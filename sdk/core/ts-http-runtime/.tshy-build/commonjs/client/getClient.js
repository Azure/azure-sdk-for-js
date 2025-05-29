"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = getClient;
const clientHelpers_js_1 = require("./clientHelpers.js");
const sendRequest_js_1 = require("./sendRequest.js");
const urlHelpers_js_1 = require("./urlHelpers.js");
const checkEnvironment_js_1 = require("../util/checkEnvironment.js");
/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 */
function getClient(endpoint, clientOptions = {}) {
    var _a, _b, _c;
    const pipeline = (_a = clientOptions.pipeline) !== null && _a !== void 0 ? _a : (0, clientHelpers_js_1.createDefaultPipeline)(clientOptions);
    if ((_b = clientOptions.additionalPolicies) === null || _b === void 0 ? void 0 : _b.length) {
        for (const { policy, position } of clientOptions.additionalPolicies) {
            // Sign happens after Retry and is commonly needed to occur
            // before policies that intercept post-retry.
            const afterPhase = position === "perRetry" ? "Sign" : undefined;
            pipeline.addPolicy(policy, {
                afterPhase,
            });
        }
    }
    const { allowInsecureConnection, httpClient } = clientOptions;
    const endpointUrl = (_c = clientOptions.endpoint) !== null && _c !== void 0 ? _c : endpoint;
    const client = (path, ...args) => {
        const getUrl = (requestOptions) => (0, urlHelpers_js_1.buildRequestUrl)(endpointUrl, path, args, Object.assign({ allowInsecureConnection }, requestOptions));
        return {
            get: (requestOptions = {}) => {
                return buildOperation("GET", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            post: (requestOptions = {}) => {
                return buildOperation("POST", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            put: (requestOptions = {}) => {
                return buildOperation("PUT", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            patch: (requestOptions = {}) => {
                return buildOperation("PATCH", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            delete: (requestOptions = {}) => {
                return buildOperation("DELETE", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            head: (requestOptions = {}) => {
                return buildOperation("HEAD", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            options: (requestOptions = {}) => {
                return buildOperation("OPTIONS", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            trace: (requestOptions = {}) => {
                return buildOperation("TRACE", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
        };
    };
    return {
        path: client,
        pathUnchecked: client,
        pipeline,
    };
}
function buildOperation(method, url, pipeline, options, allowInsecureConnection, httpClient) {
    var _a;
    allowInsecureConnection = (_a = options.allowInsecureConnection) !== null && _a !== void 0 ? _a : allowInsecureConnection;
    return {
        then: function (onFulfilled, onrejected) {
            return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, Object.assign(Object.assign({}, options), { allowInsecureConnection }), httpClient).then(onFulfilled, onrejected);
        },
        async asBrowserStream() {
            if (checkEnvironment_js_1.isNodeLike) {
                throw new Error("`asBrowserStream` is supported only in the browser environment. Use `asNodeStream` instead to obtain the response body stream. If you require a Web stream of the response in Node, consider using `Readable.toWeb` on the result of `asNodeStream`.");
            }
            else {
                return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, Object.assign(Object.assign({}, options), { allowInsecureConnection, responseAsStream: true }), httpClient);
            }
        },
        async asNodeStream() {
            if (checkEnvironment_js_1.isNodeLike) {
                return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, Object.assign(Object.assign({}, options), { allowInsecureConnection, responseAsStream: true }), httpClient);
            }
            else {
                throw new Error("`isNodeStream` is not supported in the browser environment. Use `asBrowserStream` to obtain the response body stream.");
            }
        },
    };
}
//# sourceMappingURL=getClient.js.map