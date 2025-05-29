"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRecordingOptions = setRecordingOptions;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const paths_js_1 = require("./utils/paths.js");
const utils_js_1 = require("./utils/utils.js");
async function setRecordingOptions(recorderUrl, httpClient, { handleRedirects, tlsValidationCert }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawBody = {
        HandleRedirects: handleRedirects,
    };
    if (tlsValidationCert) {
        rawBody.Transport = {
            TLSValidationCert: tlsValidationCert,
        };
    }
    const body = JSON.stringify(rawBody);
    const request = (0, core_rest_pipeline_1.createPipelineRequest)({
        url: `${recorderUrl}${paths_js_1.paths.admin}${paths_js_1.paths.setRecordingOptions}`,
        method: "POST",
        body,
        allowInsecureConnection: true,
        headers: (0, core_rest_pipeline_1.createHttpHeaders)({
            "Content-Type": "application/json",
        }),
    });
    const response = await httpClient.sendRequest(request);
    if (response.status < 200 || response.status > 299) {
        throw new utils_js_1.RecorderError(`setRecordingOptions failed: ${response.bodyAsText}`);
    }
}
//# sourceMappingURL=options.js.map