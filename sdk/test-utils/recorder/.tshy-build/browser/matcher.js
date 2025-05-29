// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { logger } from "./log.js";
import { paths } from "./utils/paths.js";
import { RecorderError } from "./utils/utils.js";
export async function setMatcher(recorderUrl, httpClient, matcher, recordingId, matcherBody = { compareBodies: true, ignoreQueryOrdering: false }) {
    var _a, _b;
    const url = `${recorderUrl}${paths.admin}${paths.setMatcher}`;
    const request = createPipelineRequest({ url, method: "POST", allowInsecureConnection: true });
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
    logger.info("[setMatcher] Setting matcher", matcher, matcherBody);
    const response = await httpClient.sendRequest(request);
    const { status, bodyAsText } = response;
    if (status < 200 || status > 299) {
        logger.error("[setMatcher] setMatcher failed", response);
        throw new RecorderError(`setMatcher failed: ${bodyAsText}`, status);
    }
}
//# sourceMappingURL=matcher.js.map