// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A Shim Library that provides compatibility between Core V1 & V2 Packages.
 *
 * @packageDocumentation
 */
export {
  ExtendedServiceClient,
  type ExtendedServiceClientOptions,
  type ExtendedCommonClientOptions,
  type ExtendedClientOptions,
} from "./extendedClient.js";
export type { CompatResponse } from "./response.js";
export {
  requestPolicyFactoryPolicyName,
  createRequestPolicyFactoryPolicy,
  type RequestPolicyFactory,
  type RequestPolicy,
  type RequestPolicyOptionsLike,
  HttpPipelineLogLevel,
} from "./policies/requestPolicyFactoryPolicy.js";
export type { KeepAliveOptions } from "./policies/keepAliveOptions.js";
export type { RedirectOptions } from "./policies/redirectOptions.js";
export { disableKeepAlivePolicyName } from "./policies/disableKeepAlivePolicy.js";
export { convertHttpClient } from "./httpClientAdapter.js";
export {
  type Agent,
  type WebResourceLike,
  type HttpHeadersLike,
  type RawHttpHeaders,
  type HttpHeader,
  type TransferProgressEvent,
  toHttpHeadersLike,
} from "./util.js";
