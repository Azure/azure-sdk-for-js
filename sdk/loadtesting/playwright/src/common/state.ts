// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

(globalThis as any).state = (globalThis as any).state || {
  playwrightServiceEntra: null,
  customerConfig: null,
};
export const state: Record<string, any> = (globalThis as any).state;
