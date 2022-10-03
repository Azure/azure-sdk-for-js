// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A Shim Library that provides compatibility between Core V1 & V2 Packages.
 *
 * @packageDocumentation
 */
export {
  ExtendedServiceClient,
  ExtendedServiceClientOptions,
  ExtendedCommonClientOptions,
  ExtendedClientOptions,
} from "./extendedClient";
export { CompatResponse } from "./response";
export {
  requestPolicyFactoryPolicyName,
  createRequestPolicyFactoryPolicy,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptionsLike,
  HttpPipelineLogLevel,
} from "./policies/requestPolicyFactoryPolicy";
export { KeepAliveOptions } from "./policies/keepAliveOptions";
export { RedirectOptions } from "./policies/redirectOptions";
export { disbaleKeepAlivePolicyName } from "./policies/disableKeepAlivePolicy";
export {
  WebResourceLike,
  HttpHeadersLike,
  RawHttpHeaders,
  HttpHeader,
  TransferProgressEvent,
} from "./util";
