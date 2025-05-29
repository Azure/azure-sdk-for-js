"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransform = addTransform;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const paths_js_1 = require("./utils/paths.js");
const utils_js_1 = require("./utils/utils.js");
const log_js_1 = require("./log.js");
async function addTransform(recorderUrl, httpClient, transform, recordingId) {
    var _a;
    const url = `${recorderUrl}${paths_js_1.paths.admin}${paths_js_1.paths.addTransform}`;
    const request = (0, core_rest_pipeline_1.createPipelineRequest)({ url, method: "POST", allowInsecureConnection: true });
    request.headers.set("x-abstraction-identifier", transform.type);
    if (recordingId) {
        request.headers.set("x-recording-id", recordingId);
    }
    request.body = JSON.stringify(Object.assign(Object.assign({}, (transform.applyCondition ? { applyCondition: transform.applyCondition } : {})), ((_a = transform.params) !== null && _a !== void 0 ? _a : {})));
    log_js_1.logger.info("[addTransform] Adding transform", transform);
    const response = await httpClient.sendRequest(request);
    const { status, bodyAsText } = response;
    if (status < 200 || status > 299) {
        log_js_1.logger.error("[addTransform] addTransform failed", response);
        throw new utils_js_1.RecorderError(`addTransform failed: ${bodyAsText}`, status);
    }
}
//# sourceMappingURL=transform.js.map