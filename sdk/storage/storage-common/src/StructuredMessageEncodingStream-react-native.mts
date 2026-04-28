// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestBodyType } from "@azure/core-rest-pipeline";

export async function structuredMessageEncoding(
  _source: RequestBodyType,
  _contentLength: number,
): Promise<{ body: RequestBodyType; encodedContentLength: number }> {
  throw new Error("structuredMessageEncoding is not supported in React Native.");
}
