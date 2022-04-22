// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { AccessToken } from "@azure/core-auth";
import { CommunicationAccessToken } from "./models";

export type TokenCredential = Pick<CommunicationTokenCredential, "getToken" | "dispose" | "getCommunicationToken">;

/**
 * Options for `CommunicationTokenCredential`'s `getToken` function.
 */
export interface CommunicationGetTokenOptions {
  /**
   * An implementation of `AbortSignalLike` to cancel the operation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * The Azure Communication Services token credential.
 */
export interface CommunicationTokenCredential {
  /**
   * Gets an `AccessToken` for the user. Throws if already disposed.
   * @param options - Additional options.
   */
  getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken>;

  /**
   * Gets a Communication access token for the user. Throws if already disposed.
   * @param options - Additional options.
   */
  getCommunicationToken(options?: CommunicationGetTokenOptions): Promise<CommunicationAccessToken>;

  /**
   * Disposes the CommunicationTokenCredential and cancels any internal auto-refresh operation.
   */
  dispose(): void;
}
