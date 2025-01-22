// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AutoRefreshTokenCredential,
  type CommunicationTokenRefreshOptions,
} from "./autoRefreshTokenCredential.js";
import type {
  CommunicationGetTokenOptions,
  CommunicationTokenCredential,
  TokenCredential,
} from "./communicationTokenCredential.js";
import type { AccessToken } from "@azure/core-auth";
import { StaticTokenCredential } from "./staticTokenCredential.js";
import { parseToken } from "./tokenParser.js";
import {
  type EntraCommunicationTokenCredentialOptions,
  EntraTokenCredential,
} from "./entraTokenCredential.js";

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
   * Creates an instance of CommunicationTokenCredential with an Entra ID token credential. In most cases, you might want to use InteractiveBrowserCredential to sign in your user.
   * @param entraOptions - Options to configure the Entra ID token credential.
   */
  constructor(entraOptions: EntraCommunicationTokenCredentialOptions);
  constructor(
    tokenOrRefreshOptionsOrEntraOptions:
      | string
      | CommunicationTokenRefreshOptions
      | EntraCommunicationTokenCredentialOptions,
  ) {
    if (typeof tokenOrRefreshOptionsOrEntraOptions === "string") {
      this.tokenCredential = new StaticTokenCredential(
        parseToken(tokenOrRefreshOptionsOrEntraOptions),
      );
    } else if ("tokenRefresher" in tokenOrRefreshOptionsOrEntraOptions) {
      this.tokenCredential = new AutoRefreshTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
    } else {
      this.tokenCredential = new EntraTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
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
