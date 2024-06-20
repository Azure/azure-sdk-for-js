// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AutoRefreshTokenCredential,
  CommunicationTokenRefreshOptions,
} from "./autoRefreshTokenCredential";
import {
  CommunicationGetTokenOptions,
  CommunicationTokenCredential,
  TokenCredential,
} from "./communicationTokenCredential";
import { AccessToken } from "@azure/core-auth";
import { StaticTokenCredential } from "./staticTokenCredential";
import { parseToken } from "./tokenParser";
import { exchangeEntraToken } from "./entraTokenExchange";

/**
 * The CommunicationTokenCredential implementation with support for proactive token refresh.
 */

export class AzureCommunicationTokenCredential implements CommunicationTokenCredential {
  private readonly tokenCredential: TokenCredential;
  private disposed = false;

  /**
   * Creates an instance of CommunicationTokenCredential with a static token and no proactive refreshing.
   * @param token - A user access token issued by Communication Services.
   */
  constructor(token: string);
  /**
   * Creates an instance of CommunicationTokenCredential with a lambda to get a token and options
   * to configure proactive refreshing.
   * @param refreshOptions - Options to configure refresh and opt-in to proactive refreshing.
   */
  constructor(refreshOptions: CommunicationTokenRefreshOptions);
  /**
   * Creates an instance of CommunicationTokenCredential with an Entra ID token and no proactive refreshing.
   * @param entraToken - The Azure Communication Service resource endpoint URL, e.g. https://myResource.communication.azure.com.
   * @param entraToken - An Entra ID token for Azure Communication Service's chat or voip scope.
   */
  constructor(resourceEndpoint: string, entraToken: string);
  constructor(tokenOrRefreshOptionsOrResourceEndpoint: string | CommunicationTokenRefreshOptions, entraToken?: string) {
    if (!!entraToken) {
      const resourceEndpoint = tokenOrRefreshOptionsOrResourceEndpoint as string;
      this.tokenCredential = new StaticTokenCredential(exchangeEntraToken(resourceEndpoint, entraToken));
    } else if (typeof tokenOrRefreshOptionsOrResourceEndpoint === "string") {
      this.tokenCredential = new StaticTokenCredential(parseToken(tokenOrRefreshOptionsOrResourceEndpoint));
    } else {
      this.tokenCredential = new AutoRefreshTokenCredential(tokenOrRefreshOptionsOrResourceEndpoint);
    }
  }

  /**
   * Gets an `AccessToken` for the user. Throws if already disposed.
   * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
   */
  public async getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken> {
    this.throwIfDisposed();
    const token = await this.tokenCredential.getToken(options);
    this.throwIfDisposed();
    return token;
  }

  /**
   * Disposes the CommunicationTokenCredential and cancels any internal auto-refresh operation.
   */
  public dispose(): void {
    this.disposed = true;
    this.tokenCredential.dispose();
  }

  private throwIfDisposed(): void {
    if (this.disposed) {
      throw new Error("User credential is disposed");
    }
  }
}
