"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDownloaderImpl = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
/** Class containing ContentDownloading operations. */
class ContentDownloaderImpl {
    /**
     * Initialize a new instance of the class ContentDownloader class.
     * @param client - Reference to the service client
     */
    constructor(client) {
        this.client = client;
        this.addCustomSignUrlPolicy();
    }
    addCustomSignUrlPolicy() {
        const signUrlPolicy = {
            name: "CustomSignUrlPolicy",
            async sendRequest(request, next) {
                if (request.headers.has("OriginalUrl")) {
                    request.url = `${request.headers.get("OriginalUrl")}`;
                    const originalRequest = new URL(request.url);
                    request.headers.set("Host", originalRequest.host);
                }
                return next(request);
            },
        };
        const pipelineOptions = {};
        pipelineOptions.afterPhase = "Sign";
        this.client.pipeline.addPolicy(signUrlPolicy, pipelineOptions);
    }
    /**
     * Deletes a recording.
     * @param deleteLocationUrl - The recording location url. Required.
     */
    async deleteRecording(deleteLocationUrl, options) {
        var _a, _b, _c;
        const fileLocation = new URL(deleteLocationUrl);
        const endpoint = new URL(this.client.endpoint);
        const modifiedUrlForSigning = endpoint.origin + fileLocation.pathname;
        const opt = {
            url: modifiedUrlForSigning,
            method: "DELETE",
            headers: (0, core_rest_pipeline_1.createHttpHeaders)(),
            body: "",
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            tracingOptions: options === null || options === void 0 ? void 0 : options.tracingOptions,
        };
        (_a = opt.headers) === null || _a === void 0 ? void 0 : _a.set("OriginalUrl", deleteLocationUrl);
        (_b = opt.headers) === null || _b === void 0 ? void 0 : _b.set("x-ms-host", endpoint.host);
        (_c = opt.headers) === null || _c === void 0 ? void 0 : _c.set("accept", "application/json");
        const req = (0, core_rest_pipeline_1.createPipelineRequest)(opt);
        const results = await this.client.sendRequest(req);
        if (results.status !== 200) {
            if (results.bodyAsText) {
                const jsonBody = JSON.parse(results.bodyAsText);
                throw { status: jsonBody.status, message: jsonBody.message };
            }
            throw { status: results.status };
        }
    }
    /**
     * Returns a stream with a call recording.
     * @param sourceLocationUrl - The source location url. Required.
     * @param options - Additional request options contains downloadRecording options.
     */
    async download(sourceLocationUrl, options) {
        var _a, _b, _c, _d;
        const fileLocation = new URL(sourceLocationUrl);
        const endpoint = new URL(this.client.endpoint);
        const modifiedUrlForSigning = endpoint.origin + fileLocation.pathname;
        const opt = {
            url: modifiedUrlForSigning,
            method: "GET",
            headers: (0, core_rest_pipeline_1.createHttpHeaders)(),
            body: "",
            streamResponseStatusCodes: new Set([200, 206]),
            abortSignal: options.abortSignal,
            tracingOptions: options === null || options === void 0 ? void 0 : options.tracingOptions,
        };
        if (options.length && !options.offset) {
            throw Error("Download offset value must not be empty if length is set.");
        }
        else if (options.length && options.offset) {
            options.length = options.offset + options.length - 1;
        }
        let rangeHeader = "bytes=" + options.offset;
        if (options.length)
            rangeHeader += "-" + options.length;
        (_a = opt.headers) === null || _a === void 0 ? void 0 : _a.set("OriginalUrl", sourceLocationUrl);
        (_b = opt.headers) === null || _b === void 0 ? void 0 : _b.set("x-ms-host", endpoint.host);
        (_c = opt.headers) === null || _c === void 0 ? void 0 : _c.set("accept", "application/json");
        (_d = opt.headers) === null || _d === void 0 ? void 0 : _d.set("Range", rangeHeader);
        const req = (0, core_rest_pipeline_1.createPipelineRequest)(opt);
        const results = await this.client.sendRequest(req);
        if (results.status !== 200 && results.status !== 206) {
            if (results.bodyAsText) {
                const jsonBody = JSON.parse(results.bodyAsText);
                throw { status: jsonBody.status, message: jsonBody.message };
            }
            throw { status: results.status };
        }
        return results;
    }
}
exports.ContentDownloaderImpl = ContentDownloaderImpl;
//# sourceMappingURL=contentDownloader.js.map