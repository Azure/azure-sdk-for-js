// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { coreLogger } from "./logger";
import { EntraIdAccessTokenConstants, ServiceEnvironmentVariable } from "./constants";
import { AccessTokenClaims } from "./types";
import { parseJwt } from "../utils/utils";

class EntraIdAccessToken {
  public token?: string;
  private _expiryTimestamp?: number; // in milli seconds
  private _credential?: TokenCredential;

  constructor(credential?: TokenCredential) {
    this._credential = credential ?? new DefaultAzureCredential();
    this.setEntraIdAccessTokenFromEnvironment();
  }

  public fetchEntraIdAccessToken = async (): Promise<boolean> => {
    try {
      coreLogger.info("Fetching entra id access token");
      const accessToken = await this._credential!.getToken(EntraIdAccessTokenConstants.SCOPE);
      if (!accessToken) throw new Error("Entra id access token is null");
      if (accessToken.token === this.token) {
        // azure identity library can fetch the same token again from cache. 10 mins before expiry, it allows token refresh
        coreLogger.info("Cached access token is returned, will be retried again.");
        return false;
      }
      this.token = accessToken.token;
      this._expiryTimestamp = accessToken.expiresOnTimestamp;
      process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = this.token!;
      coreLogger.info("Entra id access token fetched and set in environment variable");
      coreLogger.info(
        "Entra id access token expiry:",
        new Date(this._expiryTimestamp).toISOString(),
      );
      return true;
    } catch (err) {
      coreLogger.error(err);
      return false;
    }
  };

  public doesEntraIdAccessTokenNeedRotation(): boolean {
    if (!this.token) {
      coreLogger.info("Entra id access token not found, needs rotation");
      return true;
    }
    const lifetimeLeft = this._expiryTimestamp! - new Date().getTime();
    const doesEntraTokenRequireRotation =
      lifetimeLeft <
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000;
    coreLogger.info(
      "Entra id access token requires rotation:",
      doesEntraTokenRequireRotation ? "Yes" : "No",
    );
    return doesEntraTokenRequireRotation;
  }

  private setEntraIdAccessTokenFromEnvironment = (): void => {
    try {
      const token = process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
      if (!token) {
        return;
      }
      const claims = parseJwt<Partial<AccessTokenClaims>>(token);
      if (claims.accountId || claims.aid) {
        return;
      } // mpt PAT
      const expiry = new Date(claims.exp! * 1000);
      this.token = token;
      this._expiryTimestamp = expiry.getTime();
    } catch (_) {
      return;
    }
  };
}

export { EntraIdAccessToken };
