// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineRequestOptions } from "./interfacesWeb.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { randomUUID } from "#platform/util/uuidUtils";

/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */
export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return {
    url: options.url,
    method: options.method ?? "GET",
    headers: options.headers ?? createHttpHeaders(),
    timeout: options.timeout ?? 0,
    withCredentials: options.withCredentials ?? false,
    body: options.body,
    multipartBody: options.multipartBody,
    formData: options.formData,
    streamResponseStatusCodes: options.streamResponseStatusCodes,
    enableBrowserStreams: options.enableBrowserStreams ?? false,
    abortSignal: options.abortSignal,
    requestId: options.requestId || randomUUID(),
    allowInsecureConnection: options.allowInsecureConnection ?? false,
    onUploadProgress: options.onUploadProgress,
    onDownloadProgress: options.onDownloadProgress,
    requestOverrides: options.requestOverrides,
    authSchemes: options.authSchemes,
  };
}
