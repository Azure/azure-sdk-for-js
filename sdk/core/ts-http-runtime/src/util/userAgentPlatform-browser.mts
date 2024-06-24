// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
}

interface BrowserBrand {
  brand: string;
  version: string;
}

interface NavigatorEx extends Navigator {
  userAgentData?: {
    brands: BrowserBrand[];
    mobile: boolean;
    platform?: string;
    getHighEntropyValues: (hints: string[]) => Promise<{
      architecture: string;
      bitness: string;
      brands: BrowserBrand[];
      formFactor: string;
      fullVersionList: BrowserBrand[];
      mobile: boolean;
      model: string;
      platform: string;
      platformVersion: string;
      wow64: boolean;
    }>;
  };
}

function getBrowserInfo(userAgent: string): BrowserBrand | undefined {
  const browserRegexes = [
    { name: "Firefox", regex: /Firefox\/([\d.]+)/ },
    { name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
  ];

  for (const browser of browserRegexes) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return { brand: browser.name, version: match[1] };
    }
  }

  return undefined;
}

function getBrandVersionString(brands: BrowserBrand[]): BrowserBrand | undefined {
  const brandOrder = ["Google Chrome", "Microsoft Edge", "Opera", "Brave", "Chromium"];
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
    const brand = getBrandVersionString(localNavigator.userAgentData.brands);
    if (brand) {
      map.set(brand.brand, brand.version);
    }
  } else if (localNavigator?.platform) {
    osPlatform = localNavigator.platform;
    const brand = getBrowserInfo(localNavigator.userAgent);
    if (brand) {
      map.set(brand.brand, brand.version);
    }
  }

  map.set("OS", osPlatform);
}
