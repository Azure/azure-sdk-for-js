// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A Shim Library that provides compatibility between Core V1 & V2 Packages.
 *
 * @packageDocumentation
 */
export { ShimClient, ShimClientOptions, ShimCommonClientOptions, ShimOptions } from "./shimClient";
export { KeepAliveOptions } from "./policies/keepAliveOptions";
export { RedirectOptions } from "./policies/redirectOptions";
export { disbaleKeepAlivePolicyName } from "./policies/disableKeepAlivePolicy";
