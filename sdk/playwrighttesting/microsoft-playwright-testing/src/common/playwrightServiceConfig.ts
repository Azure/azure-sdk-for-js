// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultConnectOptionsConstants, ServiceEnvironmentVariableConstants } from "./constants";
import { PlaywrightServiceAdditionalOptions, OsType } from "./types";
import { getDefaultRunId } from "../utils/utils";

class PlaywrightServiceConfig {
  public serviceOs: OsType;
  public runId: string;
  public timeout: number;
  public slowMo: number;
  public exposeNetwork: string;

  constructor() {
    this.serviceOs = (process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS] ||
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS) as OsType;
    this.runId =
      process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID] ||
      getDefaultRunId();
    this.timeout = DefaultConnectOptionsConstants.DEFAULT_TIMEOUT;
    this.slowMo = DefaultConnectOptionsConstants.DEFAULT_SLOW_MO;
    this.exposeNetwork = DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK;
  }

  setOptions = (options?: PlaywrightServiceAdditionalOptions): void => {
    if (options?.exposeNetwork) {
      this.exposeNetwork = options.exposeNetwork;
    }
    if (options?.runId) {
      this.runId = options.runId;
      process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID] = this.runId;
    }
    if (options?.os) {
      this.serviceOs = options.os;
      process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS] = this.serviceOs;
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
