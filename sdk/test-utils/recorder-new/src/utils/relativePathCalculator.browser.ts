// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function relativeRecordingsPathForNode() {
  throw new Error("Attempted to use the function meant for node in a browser.");
}

export function relativeRecordingsPathForBrowser() {
  // If you get this error, it's because you tried to use this config in a browser.
  // It is meant to be imported in the karma configuration file and used to configure
  // the browser launch specifications, not to be used within the browser itself.
  throw new Error("Attempted to use the base karma configuration in a browser.");
}
