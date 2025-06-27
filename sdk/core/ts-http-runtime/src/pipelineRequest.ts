// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineRequestOptions } from "./interfaces.js";
import type { PipelineRequestOptionsInternal } from "./interfacesInternal.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { randomUUID } from "./util/uuidUtils.js";

/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */
export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  const typedOptions = options as PipelineRequestOptionsInternal;

  return {
    url: typedOptions.url,
    method: typedOptions.method ?? "GET",
    headers: typedOptions.headers ?? createHttpHeaders(),
    timeout: typedOptions.timeout ?? 0,
    withCredentials: typedOptions.withCredentials ?? false,
    body: typedOptions.body,
    multipartBody: typedOptions.multipartBody,
    formData: typedOptions.formData,
    streamResponseStatusCodes: typedOptions.streamResponseStatusCodes,
    enableBrowserStreams: typedOptions.enableBrowserStreams ?? false,
    proxySettings: typedOptions.proxySettings,
    disableKeepAlive: typedOptions.disableKeepAlive ?? false,
    abortSignal: typedOptions.abortSignal,
    requestId: typedOptions.requestId || randomUUID(),
    allowInsecureConnection: typedOptions.allowInsecureConnection ?? false,
    onUploadProgress: typedOptions.onUploadProgress,
    onDownloadProgress: typedOptions.onDownloadProgress,
    requestOverrides: typedOptions.requestOverrides,
    authSchemes: typedOptions.authSchemes,
  } as PipelineRequest;
}
