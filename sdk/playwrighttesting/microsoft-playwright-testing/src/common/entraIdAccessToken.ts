// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { jwtDecode } from "jwt-decode";
import mptDebugLogger from "./debugLogger";
import { EntraIdAccessTokenConstants, ServiceEnvironmentVariableConstants } from "./constants";
import { AccessTokenClaims } from "./types";

class EntraIdAccessToken {
  public token?: string;
  private _expiryTimestamp?: number; // in milli seconds
  private _credential?: TokenCredential;

  constructor(credential: TokenCredential = null) {
    this._credential = credential ?? new DefaultAzureCredential();
    this.setEntraIdAccessTokenFromEnvironment();
  }

  public fetchEntraIdAccessToken = async (): Promise<boolean> => {
    try {
      mptDebugLogger("Fetching entra id access token");
      const accessToken = await this._credential.getToken(EntraIdAccessTokenConstants.SCOPE);
      if (accessToken.token === this.token) {
        // azure identity library can fetch the same token again from cache. 10 mins before expiry, it allows token refresh
        mptDebugLogger("Cached access token is returned, will be retried again.");
        return false;
      }
      this.token = accessToken.token;
      this._expiryTimestamp = accessToken.expiresOnTimestamp;
      process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] =
        this.token!;
      mptDebugLogger("Entra id access token fetched and set in environment variable");
      mptDebugLogger(
        "Entra id access token expiry:",
        new Date(this._expiryTimestamp).toISOString(),
      );
      return true;
    } catch (err) {
      mptDebugLogger(err);
      return false;
    }
  };

  public doesEntraIdAccessTokenNeedRotation(): boolean {
    if (!this.token) {
      mptDebugLogger("Entra id access token not found, needs rotation");
      return true;
    }
    const lifetimeLeft = this._expiryTimestamp! - new Date().getTime();
    const doesEntraTokenRequireRotation =
      lifetimeLeft <
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000;
    mptDebugLogger(
      "Entra id access token requires rotation:",
      doesEntraTokenRequireRotation ? "Yes" : "No",
    );
    return doesEntraTokenRequireRotation;
  }

  private setEntraIdAccessTokenFromEnvironment = (): void => {
    try {
      const token =
        process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
      if (!token) {
        return;
      }
      const claims = jwtDecode(token) as Partial<AccessTokenClaims>;
      if (claims.accountId || claims.aid) {
        return;
      } // mpt PAT
      const expiry = new Date(claims.exp * 1000);
      this.token = token;
      this._expiryTimestamp = expiry.getTime();
    } catch (_) {
      return;
    }
  };
}

export { EntraIdAccessToken };
