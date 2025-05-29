// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths.js";
import { RecorderError } from "./utils/utils.js";
import { logger } from "./log.js";
export async function addTransform(recorderUrl, httpClient, transform, recordingId) {
    var _a;
    const url = `${recorderUrl}${paths.admin}${paths.addTransform}`;
    const request = createPipelineRequest({ url, method: "POST", allowInsecureConnection: true });
    request.headers.set("x-abstraction-identifier", transform.type);
    if (recordingId) {
        request.headers.set("x-recording-id", recordingId);
    }
    request.body = JSON.stringify(Object.assign(Object.assign({}, (transform.applyCondition ? { applyCondition: transform.applyCondition } : {})), ((_a = transform.params) !== null && _a !== void 0 ? _a : {})));
    logger.info("[addTransform] Adding transform", transform);
    const response = await httpClient.sendRequest(request);
    const { status, bodyAsText } = response;
    if (status < 200 || status > 299) {
        logger.error("[addTransform] addTransform failed", response);
        throw new RecorderError(`addTransform failed: ${bodyAsText}`, status);
    }
}
//# sourceMappingURL=transform.js.map