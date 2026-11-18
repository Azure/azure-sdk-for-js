// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "#platform/indexPlatform";

// Compatibility types referenced by the public API above. The full compatibility
// surface is available from the "@azure/storage-common/compatibility" subpath.
export {
  HttpPipelineLogLevel,
  type Agent,
  type CompatResponse,
  type HttpHeader,
  type HttpHeadersLike,
  type RawHttpHeaders,
  type RequestPolicy,
  type RequestPolicyFactory,
  type RequestPolicyOptionsLike,
  type TransferProgressEvent,
  type WebResourceLike,
} from "./compatibility/index.js";
