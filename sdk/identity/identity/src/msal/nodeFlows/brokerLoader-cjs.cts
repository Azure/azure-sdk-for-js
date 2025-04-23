// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This is the CommonJS version of the file that uses the built-in `require`

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export function tryLoadNativeBrokerPlugin():
  | import("@azure/msal-node").INativeBrokerPlugin
  | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { nativeBrokerPlugin } = require("@azure/identity-broker");
    console.log("Loaded native broker plugin");
    return nativeBrokerPlugin;
  } catch (e) {
    // do nothing
    console.log("Failed to load native broker plugin");
    console.error(e);
    return undefined;
  }
}
