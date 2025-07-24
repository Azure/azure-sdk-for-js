// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultConnectOptionsConstants, InternalEnvironmentVariables } from "./constants.js";
import type { PlaywrightServiceAdditionalOptions, OsType } from "./types.js";
import { getAndSetRunId } from "../utils/utils.js";

class PlaywrightServiceConfig {
  public serviceOs: OsType;
  public runId: string;
  public timeout: number;
  public slowMo: number;
  public exposeNetwork: string;
  public runName: string;
  constructor() {
    this.serviceOs = (process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] ||
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS) as OsType;
    this.runName = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] || "";
    this.runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] || "";
    this.timeout = DefaultConnectOptionsConstants.DEFAULT_TIMEOUT;
    this.slowMo = DefaultConnectOptionsConstants.DEFAULT_SLOW_MO;
    this.exposeNetwork = DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK;
  }

  setOptions = (options?: PlaywrightServiceAdditionalOptions): void => {
    if (options?.exposeNetwork) {
      this.exposeNetwork = options.exposeNetwork;
    }
    if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]) {
      if (options?.runId) {
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
    if (options?.timeout) {
      this.timeout = options.timeout;
    }
  };
}

export { PlaywrightServiceConfig };
