// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This is the ESM version of the file. We want to use createRequire to load the broker plugin synchronously.
// A better solution would be to use dynamic import, but that would require making the whole code-path async.
// Definitely something we should do, but this helps us get a working solution out the door.

import { createRequire } from "module";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ESM only output
const require = createRequire(import.meta.url);

export function tryLoadNativeBrokerPlugin():
  | import("@azure/msal-node").INativeBrokerPlugin
  | undefined {
  try {
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
