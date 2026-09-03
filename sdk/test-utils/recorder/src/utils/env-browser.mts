// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Bundlers and test frameworks (e.g. vitest's `define`) may inject a `process.env`
// object into browser bundles. Declare the minimal shape on globalThis so we can
// access it type-safely without pulling in @types/node.
declare global {
  var process: { env?: Record<string, string | undefined> } | undefined;
}

export const env = globalThis.process?.env ?? ({} as Record<string, string | undefined>);
