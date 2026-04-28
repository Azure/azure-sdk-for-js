// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const structuredMessageDecodingStream = 1;

export async function structuredMessageDecodingBrowser(_source: unknown): Promise<never> {
  throw new Error("structuredMessageDecodingBrowser is not supported in React Native.");
}
