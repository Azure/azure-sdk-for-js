// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

function hasPackageCache<T extends {}>(
  obj: T
): obj is T & { packageCache: Map<string, { data: any }> } {
  return "packageCache" in obj;
}

function rewriteDistPath(path: string): string {
  return path.replace(/^\.\/dist-esm\/(\S+)\.js$/, function replacer(_match, path) {
    return `./src/${path}`;
  });
}

export default function browserTestMap() {
  return {
    name: "browser-test-config",
    enforce: "pre",
    configResolved: (config: {}) => {
      if (hasPackageCache(config)) {
        for (const { data } of config.packageCache.values()) {
          if (data.browser) {
            for (const [key, value] of Object.entries<string>(data.browser)) {
              data.browser[rewriteDistPath(key)] = rewriteDistPath(value);
            }
          }
        }
      }
    },
  };
}
