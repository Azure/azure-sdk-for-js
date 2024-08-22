// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EntraIdAccessTokenConstants } from "../common/constants";
import { coreLogger } from "../common/logger";
import { validateMptPAT } from "../utils/utils";
import { EntraIdAccessToken } from "../common/entraIdAccessToken";
import type { TokenCredential } from "@azure/identity";

class PlaywrightServiceEntra {
  private _entraIdAccessTokenRotationInterval?: NodeJS.Timeout;
  private static instance: PlaywrightServiceEntra;
  private _entraIdAccessToken: EntraIdAccessToken;

  static getInstance = (): PlaywrightServiceEntra => {
    if (!PlaywrightServiceEntra.instance) {
      PlaywrightServiceEntra.instance = new PlaywrightServiceEntra();
    }
    return PlaywrightServiceEntra.instance;
  };

  set entraIdAccessToken(credential: TokenCredential) {
    this._entraIdAccessToken = new EntraIdAccessToken(credential);
  }

  constructor() {
    this._entraIdAccessToken = new EntraIdAccessToken();
  }

  public globalSetup = async (): Promise<void> => {
    coreLogger.info("Entra id access token setup start");
    const operationResult = await this._entraIdAccessToken.fetchEntraIdAccessToken();
    if (operationResult) {
      this.entraIdGlobalSetupRotationHandler();
    } else {
      validateMptPAT();
    }
  };

  public globalTeardown = (): void => {
    coreLogger.info("Entra id access token teardown start");
    if (this._entraIdAccessTokenRotationInterval) {
      clearInterval(this._entraIdAccessTokenRotationInterval);
      coreLogger.info("Entra id access token roation interval cleared");
    }
  };

  private entraIdGlobalSetupRotationHandler = (): void => {
    this._entraIdAccessTokenRotationInterval = setInterval(
      this.entraIdAccessTokenRotation,
      EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000,
    );
    coreLogger.info("Entra id access token rotation handler setup done");
  };

  private entraIdAccessTokenRotation = async (): Promise<void> => {
    coreLogger.info("Entra id access token rotation handler");
    if (this._entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
      await this._entraIdAccessToken.fetchEntraIdAccessToken();
    }
  };
}

const instance = PlaywrightServiceEntra.getInstance();
export default instance;
