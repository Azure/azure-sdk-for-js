// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants,
  DefaultConnectOptionsConstants,
  InternalEnvironmentVariables,
  ServiceAuth,
} from "./constants.js";
import type { PlaywrightServiceAdditionalOptions, OsType } from "./types.js";
import { getAndSetRunId, getRunName, ValidateRunID } from "../utils/utils.js";
import { CIInfoProvider } from "../utils/cIInfoProvider.js";
import { state } from "./state.js";
import { ServiceErrorMessageConstants } from "./messages.js";

class PlaywrightServiceConfig {
  public serviceOs: OsType;
  public runId: string;
  public connectTimeout: number;
  public slowMo: number;
  public exposeNetwork: string;
  public runName: string;
  public apiVersion: string;
  private _serviceAuthType: string = ServiceAuth.ENTRA_ID;

  constructor() {
    this.serviceOs = (process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] ||
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS) as OsType;
    this.runName = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] || "";
    this.runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] || "";
    this.connectTimeout = DefaultConnectOptionsConstants.DEFAULT_TIMEOUT;
    this.slowMo = DefaultConnectOptionsConstants.DEFAULT_SLOW_MO;
    this.exposeNetwork = DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK;
    this.apiVersion =
      process.env[InternalEnvironmentVariables.MPT_API_VERSION] || Constants.LatestAPIVersion;
  }

  public static get instance(): PlaywrightServiceConfig {
    if (!state.playwrightServiceConfig) {
      state.playwrightServiceConfig = new PlaywrightServiceConfig();
    }
    return state.playwrightServiceConfig;
  }

  public get serviceAuthType(): string {
    return this._serviceAuthType;
  }

  public set serviceAuthType(value: string) {
    this._serviceAuthType = value;
  }

  public async initialize(): Promise<void> {
    if (!this.runName) {
      const ciConfigInfo = CIInfoProvider.getCIInfo();
      this.runName = await getRunName(ciConfigInfo);
    }
  }

  validateOptions = (options?: PlaywrightServiceAdditionalOptions): void => {
    if (!options) return;

    const isUsingServiceConfig =
      process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] === "true";
    if (isUsingServiceConfig) {
      if (options.serviceAuthType || options.runId || options.runName) {
        const errorMessage = ServiceErrorMessageConstants.INVALID_PARAM_WITH_SERVICE_CONFIG.message;
        throw new Error(errorMessage);
      }
      return;
    }
  };

  setOptions = (
    options?: PlaywrightServiceAdditionalOptions,
    isGetConnectOptions: boolean = false,
  ): void => {
    if (isGetConnectOptions) {
      this.validateOptions(options);
    }

    if (options?.exposeNetwork) {
      this.exposeNetwork = options.exposeNetwork;
    }
    if (options?.apiVersion) {
      if (!process.env[InternalEnvironmentVariables.MPT_API_VERSION]) {
        process.env[InternalEnvironmentVariables.MPT_API_VERSION] = options.apiVersion;
      }
      this.apiVersion = options.apiVersion;
    }
    if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]) {
      if (options?.runId) {
        ValidateRunID(options.runId);
        this.runId = options.runId;
        process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = this.runId;
      } else {
        this.runId = getAndSetRunId();
      }
    }
    if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] && options?.runName) {
      this.runName = options.runName;
      process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = this.runName;
    }
    if (options?.os) {
      this.serviceOs = options.os;
      process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] = this.serviceOs;
    }
    if (options?.slowMo) {
      this.slowMo = options.slowMo;
    }
    if (options?.connectTimeout) {
      this.connectTimeout = options.connectTimeout;
    }
  };
}

export { PlaywrightServiceConfig };
