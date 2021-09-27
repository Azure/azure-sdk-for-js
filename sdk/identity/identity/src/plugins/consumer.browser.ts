// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This module is a shim for the plugin consumer in the browser

export function useIdentityPlugin(_plugin: unknown): void {
  throw new Error("Identity plugins are not supported in browser environments.");
}
