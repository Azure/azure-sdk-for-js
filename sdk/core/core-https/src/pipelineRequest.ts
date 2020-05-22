// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, TransferProgressEvent, RequestBodyType } from "./interfaces";
import { createHttpHeaders } from "./httpHeaders";
import { AbortSignalLike } from "@azure/abort-controller";

export interface PipelineRequestOptions {
  url: string;
  abortSignal?: AbortSignalLike;
  /**
   * The HTTP body content (if any)
   */
  body?: RequestBodyType;

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   * If the request is terminated, an `AbortError` is thrown.
   * Defaults to 0, which disables the timeout.
   */
  timeout?: number;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return {
    url: options.url,
    body: options.body,
    headers: createHttpHeaders(),
    method: "GET",
    timeout: options.timeout ?? 0,
    withCredentials: false,
    abortSignal: options.abortSignal,
    onUploadProgress: options.onUploadProgress,
    onDownloadProgress: options.onDownloadProgress
  };
}
