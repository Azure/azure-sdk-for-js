// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

/**
 * Test user constants used across tests.
 */
export const TEST_USERS = {
  ENTRA_USER: "test@example.com",
  MANAGED_IDENTITY_APP_ID: "managed-identity-app-id",
  FALLBACK_USER: "fallback@example.com",
};

/**
 * Create a base64url encoded string.
 */
export function createBase64UrlString(inputStr: string): string {
  return Buffer.from(inputStr).toString("base64url");
}

/**
 * Create a fake JWT token with a `upn` claim.
 */
export function createValidJwtToken(username: string): string {
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    upn: username,
    iat: 1234567890,
    exp: 9999999999,
  };

  const headerEncoded = createBase64UrlString(JSON.stringify(header));
  const payloadEncoded = createBase64UrlString(JSON.stringify(payload));

  return `${headerEncoded}.${payloadEncoded}.fake-signature`;
}

/**
 * Create a fake JWT token with an `appid` claim (for managed identity scenarios).
 */
export function createJwtTokenWithAppId(appId: string): string {
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    appid: appId,
    iat: 1234567890,
    exp: 9999999999,
  };

  const headerEncoded = createBase64UrlString(JSON.stringify(header));
  const payloadEncoded = createBase64UrlString(JSON.stringify(payload));

  return `${headerEncoded}.${payloadEncoded}.fake-signature`;
}

/**
 * A mock TokenCredential for testing. Returns a fixed token and tracks call count.
 */
export class TestTokenCredential implements TokenCredential {
  private _token: string;
  private _callCount: number;

  constructor(token: string) {
    this._token = token;
    this._callCount = 0;
  }

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    this._callCount++;
    const expiresOnTimestamp = Date.now() + 3600000; // 1 hour from now
    return {
      token: this._token,
      expiresOnTimestamp,
    };
  }

  getCallCount(): number {
    return this._callCount;
  }
}

/**
 * A mock TokenCredential that always fails.
 */
export class FailingTokenCredential implements TokenCredential {
  private _error: Error;

  constructor(message: string = "Token acquisition failed") {
    this._error = new Error(message);
  }

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    throw this._error;
  }
}

/**
 * A mock TokenCredential that returns null (no token).
 */
export class NullTokenCredential implements TokenCredential {
  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    return null;
  }
}

/**
 * Captures the callback registered via `beforeConnect` on a fake Sequelize-like object.
 */
export interface MockSequelizeInstance {
  beforeConnect: (
    callback: (config: { username?: string; password?: string }) => Promise<void>,
  ) => void;
  /** The captured callback, available after `configureEntraIdAuth` is called. */
  capturedCallback?: (config: { username?: string; password?: string }) => Promise<void>;
}

/**
 * Creates a mock object that mimics Sequelize's `beforeConnect` hook registration.
 */
export function createMockSequelizeInstance(): MockSequelizeInstance {
  const instance: MockSequelizeInstance = {
    beforeConnect(
      callback: (config: { username?: string; password?: string }) => Promise<void>,
    ): void {
      instance.capturedCallback = callback;
    },
  };
  return instance;
}
