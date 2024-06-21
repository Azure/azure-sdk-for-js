// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
    }>;
  };
}

function getBrandVersionString(
  brands: { brand: string; version: string }[],
): { brand: string; version: string } | undefined {
  const brandOrder = ["Google Chrome", "Microsoft Edge", "Brave", "Chromium"];
  for (const brand of brandOrder) {
    const foundBrand = brands.find((b) => b.brand === brand);
    if (foundBrand) {
      return foundBrand;
    }
  }
  return undefined;
}

/**
 * @internal
 */
export async function setPlatformSpecificData(map: Map<string, string>): Promise<void> {
  const localNavigator = globalThis.navigator as NavigatorEx;
  let osPlatform = "unknown";
  if (localNavigator.userAgentData) {
    const entropyValues = await localNavigator.userAgentData.getHighEntropyValues([
      "architecture",
      "platformVersion",
    ]);
    osPlatform = `${entropyValues.architecture}-${entropyValues.platform}-${entropyValues.platformVersion}`;

    // Get the brand and version
    const brand = getBrandVersionString(entropyValues.brands);
    if (brand) {
      map.set(brand.brand, brand.version);
    }
  } else if (localNavigator?.platform) {
    osPlatform = localNavigator.platform;
  }

  map.set("OS", osPlatform);
}
