// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  constructor(tokenOrRefreshOptions: string | CommunicationTokenRefreshOptions) {
    if (typeof tokenOrRefreshOptions === "string") {
      this.tokenCredential = new StaticTokenCredential(parseToken(tokenOrRefreshOptions));
    } else {
      this.tokenCredential = new AutoRefreshTokenCredential(tokenOrRefreshOptions);
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
