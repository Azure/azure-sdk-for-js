// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetClientAccessUrlOptions } from "./models";

/**
 * Type to be used to get clientAccessUri
 */
export type ClientAccessUriProvider = (options?: GetClientAccessUrlOptions) => Promise<string>;

/**
 * The WebPubSubClient credential
 */
export interface WebPubSubClientCredential {
  /**
   * Gets an `getClientAccessUrl` which is used in connecting to the service
   * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
   */
  getClientAccessUrl(options?: GetClientAccessUrlOptions): Promise<string>;
}

/**
 * Default implementation of WebPubSubClientCredential
 */
export class DefaultWebPubSubClientCredential implements WebPubSubClientCredential {
  private readonly _clientAccessUriProvider: ClientAccessUriProvider;

  /**
   * Creates an instance of DefaultWebPubSubClientCredential with a static clientAccessUri and no proactive refreshing.
   * @param clientAccessUri - The clientAccessUri to be used in connecting to the service
   */
  constructor(clientAccessUri: string);
  /**
   * Creates an instance of DefaultWebPubSubClientCredential with a lambda to get a clientAccessUri.
   * @param clientAccessUriProvider - Lambda provider to proactively get clientAccessUri.
   */
  constructor(clientAccessUriProvider: ClientAccessUriProvider);
  constructor(clientAccessUriProvider: string | ClientAccessUriProvider) {
    if (typeof clientAccessUriProvider === "string") {
      this._clientAccessUriProvider = async (_) => clientAccessUriProvider;
    } else {
      this._clientAccessUriProvider = clientAccessUriProvider;
    }
  }

  /**
   * Gets an `getClientAccessUrl` which is used in connecting to the service
   * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
   */
  public async getClientAccessUrl(options?: GetClientAccessUrlOptions): Promise<string> {
    const token = await this._clientAccessUriProvider(options);
    return token;
  }
}
