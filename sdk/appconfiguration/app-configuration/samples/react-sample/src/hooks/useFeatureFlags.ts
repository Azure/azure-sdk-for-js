/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create a React hook integrating
  with Azure App Configuration.

  For more information on Azure App Configuration please see
  https://www.npmjs.com/package/@azure/app-configuration
*/

import { useEffect, useRef } from "react";
import { AppConfigurationClient, FeatureFlag, isFeatureFlag } from "@azure/app-configuration";
import { credential, getEnvironmentVariable } from "../utils";

type GetFeatureFlag = (key: string) => Promise<FeatureFlag | undefined>;
type Hook = () => [GetFeatureFlag];

/**
 * The useFeatureFlags hook exposes a methods to interact
 * with feature flags from Azure App Configuration.
 */
export const useFeatureFlags: Hook = () => {
  // Keep a reference to the AppConfig client
  // in order to lazy-load it as needed.
  // For more information about Azure App Configuration
  // Please refer to https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview
  const instance = useRef<AppConfigurationClient>();

  /**
   * Fetch a feature flag from Azure App Configuration, returning the feature flag if the key exists.
   * @param key The key for the feature flag configuration setting.
   */
  const getFeatureFlag = async (key: string): Promise<FeatureFlag | undefined> => {
    if (!instance.current) {
      throw new Error("[useFeatureFlags]: Instance never initialized.");
    }
    const setting = await instance.current.getConfigurationSetting({
      key /* etag and label can be passed if needed */
    });
    if (isFeatureFlag(setting)) {
      console.log(`${setting.key} is enabled : ${setting.enabled}`);
      return setting;
    }
    return undefined;
  };

  useEffect(() => {
    if (!instance.current) {
      const uri = getEnvironmentVariable("APP_CONFIG_ENDPOINT");
      instance.current = new AppConfigurationClient(uri, credential);
    }
  }, []);

  return [getFeatureFlag];
};
