// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json.
 */

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
}

interface NavigatorEx extends Navigator {
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform?: string;
    getHighEntropyValues: (hints: string[]) => Promise<{
      architecture: string;
      bitness: string;
      brands: { brand: string; version: string }[];
      formFactor: string;
      fullVersionList: { brand: string; version: string }[];
      mobile: boolean;
      model: string;
      platform: string;
      platformVersion: string;
      wow64: boolean;
    }>
  };
}

/**
 * @internal
 */
export async function setPlatformSpecificData(map: Map<string, string>): Promise<void> {
  const localNavigator = globalThis.navigator as NavigatorEx;
  let osPlatform = "unknown";
  if (localNavigator.userAgentData) {
    const entropyValues = await localNavigator.userAgentData.getHighEntropyValues(["architecture", "platformVersion"]);
    osPlatform = `${entropyValues.architecture}-${entropyValues.platform}-${entropyValues.platformVersion}`;
  } else if (localNavigator?.platform) {
    osPlatform = localNavigator.platform;
  }

  map.set("OS", osPlatform);
}
