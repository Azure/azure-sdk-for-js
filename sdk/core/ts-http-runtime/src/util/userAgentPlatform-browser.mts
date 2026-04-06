// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

interface BrowserBrand {
  brand: string;
  version: string;
}

interface UserAgentData {
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
}

declare global {
  interface Navigator {
    userAgentData?: UserAgentData;
  }

  // Vercel Edge Runtime global
  var EdgeRuntime: string | undefined;
}

/**
 * @internal
 */
export function getHeaderName(): string {
  return "x-ms-useragent";
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
  const nav = globalThis.navigator;
  let osInfo = "unknown";

  if (nav?.userAgentData) {
    const entropyValues = await nav.userAgentData.getHighEntropyValues([
      "architecture",
      "platformVersion",
    ]);
    osInfo = `${entropyValues.platform} ${entropyValues.platformVersion}; ${entropyValues.architecture}`;

    const brand = getBrandVersionString(nav.userAgentData.brands);
    if (brand) {
      map.set(brand.brand, `${brand.version} (${osInfo})`);
    }
  } else if (nav) {
    osInfo = nav.platform;
    const brand = getBrowserInfo(nav.userAgent);
    if (brand) {
      map.set(brand.brand, `${brand.version} (${osInfo})`);
    }
  } else if (typeof EdgeRuntime === "string") {
    map.set("EdgeRuntime", `${EdgeRuntime} (${osInfo})`);
  }
}
