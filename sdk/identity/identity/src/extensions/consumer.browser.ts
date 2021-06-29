// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This module is a shim for the extension consumer in the browser

export function useIdentityExtension(_extension: unknown): void {
  throw new Error("Identity extensions are not supported in browser environments.");
}
