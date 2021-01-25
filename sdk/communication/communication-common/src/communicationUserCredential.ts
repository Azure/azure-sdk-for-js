// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AccessToken } from "@azure/core-http";
import { parseToken } from "./tokenParser";
import { StaticTokenCredential } from "./staticTokenCredential";
import { AutoRefreshUserCredential, RefreshOptions } from "./autoRefreshUserCredential";

export type UserCredential = Pick<AzureCommunicationUserCredential, "getToken" | "dispose">;

/**
 * The Azure Communication Services User token credential.
 */
export interface CommunicationUserCredential {
  /**
   * Gets an `AccessToken` for the user. Throws if already disposed.
   * @param abortSignal An implementation of `AbortSignalLike` to cancel the operation.
   */
  getToken(abortSignal?: AbortSignalLike): Promise<AccessToken>;
  /**
   * Disposes the CommunicationUserCredential and cancels any internal auto-refresh operation.
   */
  dispose(): void;
}

/**
 * The CommunicationUserCredential implementation with support for proactive token refresh.
 */
export class AzureCommunicationUserCredential implements CommunicationUserCredential {
  private readonly userCredential: UserCredential;
  private disposed = false;

  /**
   * Creates an instance of CommunicationUserCredential with a static token and no proactive refreshing.
   * @param token A user access token issued by Communication Services.
   */
  constructor(token: string);
  /**
   * Creates an instance of CommunicationUserCredential with a lambda to get a token and options
   * to configure proactive refreshing.
   * @param refreshOptions Options to configure refresh and opt-in to proactive refreshing.
   */
  constructor(refreshOptions: RefreshOptions);
  constructor(tokenOrRefreshOptions: string | RefreshOptions) {
    if (typeof tokenOrRefreshOptions === "string") {
      this.userCredential = new StaticTokenCredential(parseToken(tokenOrRefreshOptions));
    } else {
      this.userCredential = new AutoRefreshUserCredential(tokenOrRefreshOptions);
    }
  }

  /**
   * Gets an `AccessToken` for the user. Throws if already disposed.
   * @param abortSignal An implementation of `AbortSignalLike` to cancel the operation.
   */
  public async getToken(abortSignal?: AbortSignalLike): Promise<AccessToken> {
    this.throwIfDisposed();
    const token = await this.userCredential.getToken(abortSignal);
    this.throwIfDisposed();
    return token;
  }

  /**
   * Disposes the CommunicationUserCredential and cancels any internal auto-refresh operation.
   */
  public dispose(): void {
    this.disposed = true;
    this.userCredential.dispose();
  }

  private throwIfDisposed(): void {
    if (this.disposed) {
      throw new Error("User credential is disposed");
    }
  }
}
