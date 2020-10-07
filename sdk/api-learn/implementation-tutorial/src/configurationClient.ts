// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, TokenCredential, OperationOptions } from "@azure/core-http";
import { ConfigurationSetting } from "./generated/models";

// re-export generated types that are used as public interfaces.
export { ConfigurationSetting };

export interface GetConfigurationSettingOptions extends OperationOptions {
  onlyIfChanged?: boolean;
}

export interface ConfigurationClientOptions extends PipelineOptions {
  // any custom options go here.
}

export class ConfigurationClient {
  constructor(
    // These have a leading underscore to prevent TS from telling us
    // they are not used anywhere.
    _endpointUrl: string,
    _credential: TokenCredential,
    _options: ConfigurationClientOptions = {}
  ) {
    throw new Error("Not yet implemented.");
  }

  public async getConfigurationSetting(
    key: string,
    options?: GetConfigurationSettingOptions
  ): Promise<ConfigurationSetting>;
  public async getConfigurationSetting(
    setting: ConfigurationSetting,
    options?: GetConfigurationSettingOptions
  ): Promise<ConfigurationSetting>;
  public async getConfigurationSetting(
    _keyOrSetting: string | ConfigurationSetting,
    _options: GetConfigurationSettingOptions = {}
  ): Promise<ConfigurationSetting> {
    throw new Error("Not yet implemented.");
  }
}
