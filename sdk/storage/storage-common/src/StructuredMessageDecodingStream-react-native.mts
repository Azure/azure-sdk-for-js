// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface StructuredMessageDecodingStreamOptions {
  highWaterMark?: number;
}

export const structuredMessageDecodingStream: (
  _source: never,
  _options: StructuredMessageDecodingStreamOptions,
) => never = undefined!;

export async function structuredMessageDecodingBrowser(_source: unknown): Promise<never> {
  throw new Error("structuredMessageDecodingBrowser is not supported in React Native.");
}
