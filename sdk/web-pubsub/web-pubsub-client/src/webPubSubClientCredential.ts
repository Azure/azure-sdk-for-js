// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GetClientAccessUrlOptions } from "./models";

/**
 * The WebPubSubClient credential
 */
export interface WebPubSubClientCredential {
  /**
   * Gets an `getClientAccessUrl` which is used in connecting to the service
   * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
   */
  getClientAccessUrl: string | ((options?: GetClientAccessUrlOptions) => Promise<string>);
}
