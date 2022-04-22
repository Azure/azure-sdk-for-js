// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AutoRefreshTokenCredential,
  CommunicationTokenRefreshOptions,
  TeamsTokenRefreshOptions,
} from "./autoRefreshTokenCredential";
import {
  CommunicationGetTokenOptions,
  CommunicationTokenCredential,
  TokenCredential,
} from "./communicationTokenCredential";
import { AccessToken } from "@azure/core-auth";
import { StaticTokenCredential } from "./staticTokenCredential";
import { parseToken } from "./tokenParser";
import { CommunicationAccessToken } from "./models";

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
  constructor(
    tokenOrRefreshOptions: string | CommunicationTokenRefreshOptions | TeamsTokenRefreshOptions
  ) {
    if (typeof tokenOrRefreshOptions === "string") {
      const parsedToken = parseToken(tokenOrRefreshOptions);
      const communicationToken = {
        token: parsedToken.token,
        expiresOn: new Date(parsedToken.expiresOnTimestamp),
      };
      this.tokenCredential = new StaticTokenCredential(communicationToken);
    } else {
      this.tokenCredential = new AutoRefreshTokenCredential(tokenOrRefreshOptions);
    }
  }

  /**
   * Gets an Communication access token for the user. Throws if already disposed.
   * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
   */
  public async getCommunicationToken(
    options?: CommunicationGetTokenOptions
  ): Promise<CommunicationAccessToken> {
    this.throwIfDisposed();
    const token = await this.tokenCredential.getCommunicationToken(options);
    this.throwIfDisposed();
    return token;
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
