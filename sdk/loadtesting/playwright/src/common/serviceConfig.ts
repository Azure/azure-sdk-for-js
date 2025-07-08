// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceAuth } from "./constants.js";
import { state } from "./state.js";

export class ServiceConfig {
  private _serviceAuthType: string = ServiceAuth.ENTRA_ID;

  public static get instance(): ServiceConfig {
    if (!state.serviceConfig) {
      state.serviceConfig = new ServiceConfig();
    }
    return state.serviceConfig;
  }

  public get serviceAuthType(): string {
    return this._serviceAuthType;
  }

  public set serviceAuthType(value: string) {
    this._serviceAuthType = value;
  }
}
