// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, TokenCredential, OperationOptions } from "@azure/core-http";
import { ConfigurationSetting } from "./generated/models";

export interface ConfigurationClientOptions extends PipelineOptions {
  // any custom options go here.
}

export interface GetConfigurationSettingOptions extends OperationOptions {
  onlyIfChanged?: boolean;
}

export function quoteETag(etag: string | undefined): string | undefined {
  console.log(etag);
  throw new Error("Not yet implemented.");
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
    _key: string,
    _options: GetConfigurationSettingOptions
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
