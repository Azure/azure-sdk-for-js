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
export { KeepAliveOptions } from "./policies/keepAliveOptions";
export { RedirectOptions } from "./policies/redirectOptions";
export { disbaleKeepAlivePolicyName } from "./policies/disableKeepAlivePolicy";
