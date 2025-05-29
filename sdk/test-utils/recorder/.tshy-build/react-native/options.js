// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths.js";
import { RecorderError } from "./utils/utils.js";
export async function setRecordingOptions(recorderUrl, httpClient, { handleRedirects, tlsValidationCert }) {
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
    const request = createPipelineRequest({
        url: `${recorderUrl}${paths.admin}${paths.setRecordingOptions}`,
        method: "POST",
        body,
        allowInsecureConnection: true,
        headers: createHttpHeaders({
            "Content-Type": "application/json",
        }),
    });
    const response = await httpClient.sendRequest(request);
    if (response.status < 200 || response.status > 299) {
        throw new RecorderError(`setRecordingOptions failed: ${response.bodyAsText}`);
    }
}
//# sourceMappingURL=options.js.map