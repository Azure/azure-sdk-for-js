// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

function hasPackageCache<T extends Record<string, unknown>>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): obj is T & { packageCache: Map<string, { data: any }> } {
  return "packageCache" in obj;
}

function rewriteDistPath(path: string): string {
  return path.replace(/^\.\/dist-esm\/(\S+)\.js$/, function replacer(_match, path) {
    if (path.startsWith("src")) {
      return `./${path}`;
    } else {
      return `./src/${path}`;
    }
  });
}

export default function browserTestMap(): {
  name: string;
  enforce: "pre";
  configResolved: (config: Record<string, unknown>) => void;
} {
  return {
    name: "browser-test-config",
    enforce: "pre",
    configResolved: (config: Record<string, unknown>) => {
      if (hasPackageCache(config)) {
        for (const { data } of config.packageCache.values()) {
          // Ensure that it isn't just a top level string
          if (data.browser && typeof data.browser === "object") {
            for (const [key, value] of Object.entries<string>(data.browser)) {
              data.browser[rewriteDistPath(key)] = rewriteDistPath(value);
            }
          }
        }
      }
    },
  };
}
