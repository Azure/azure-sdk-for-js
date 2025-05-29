"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordingRequest = createRecordingRequest;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
/**
 * Adds the recording id headers to the requests that are sent to the proxy tool.
 * These are required to appropriately save the recordings in the record mode and picking them up in playback.
 */
function createRecordingRequest(url, sessionFile, recordingId, method = "POST", assetsJson) {
    const req = (0, core_rest_pipeline_1.createPipelineRequest)({ url: url, method });
    if (sessionFile !== undefined) {
        const body = { "x-recording-file": sessionFile };
        // during browser tests the non-presence of an assets.json will result in the value "undefined" being set
        // its easier to just explicitly handle this case rather than ensure that folks update their karma conf properly.
        if (assetsJson && assetsJson !== "undefined") {
            body["x-recording-assets-file"] = assetsJson;
        }
        req.body = JSON.stringify(body);
    }
    if (recordingId !== undefined) {
        req.headers.set("x-recording-id", recordingId);
    }
    return req;
}
//# sourceMappingURL=createRecordingRequest.js.map