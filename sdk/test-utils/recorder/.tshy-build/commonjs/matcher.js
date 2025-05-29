"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMatcher = setMatcher;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const log_js_1 = require("./log.js");
const paths_js_1 = require("./utils/paths.js");
const utils_js_1 = require("./utils/utils.js");
async function setMatcher(recorderUrl, httpClient, matcher, recordingId, matcherBody = { compareBodies: true, ignoreQueryOrdering: false }) {
    var _a, _b;
    const url = `${recorderUrl}${paths_js_1.paths.admin}${paths_js_1.paths.setMatcher}`;
    const request = (0, core_rest_pipeline_1.createPipelineRequest)({ url, method: "POST", allowInsecureConnection: true });
    request.headers.set("x-abstraction-identifier", matcher);
    if (recordingId) {
        request.headers.set("x-recording-id", recordingId);
    }
    if (matcherBody) {
        request.body = JSON.stringify({
            compareBodies: matcherBody.compareBodies,
            excludedHeaders: (_a = matcherBody.excludedHeaders) === null || _a === void 0 ? void 0 : _a.toString(),
            ignoredHeaders: (_b = matcherBody.ignoredHeaders) === null || _b === void 0 ? void 0 : _b.toString(),
            ignoreQueryOrdering: matcherBody.ignoreQueryOrdering,
        });
    }
    log_js_1.logger.info("[setMatcher] Setting matcher", matcher, matcherBody);
    const response = await httpClient.sendRequest(request);
    const { status, bodyAsText } = response;
    if (status < 200 || status > 299) {
        log_js_1.logger.error("[setMatcher] setMatcher failed", response);
        throw new utils_js_1.RecorderError(`setMatcher failed: ${bodyAsText}`, status);
    }
}
//# sourceMappingURL=matcher.js.map