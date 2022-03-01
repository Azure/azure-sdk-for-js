// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Keep Alive Options for how HTTP connections.
 */
export interface KeepAliveOptions {
  /**
   * When true, connections will be kept alive for multiple requests.
   * Defaults to true.
   */
  enable?: boolean;
}
