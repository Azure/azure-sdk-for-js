// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "./url";

export function checkURL(testString: string): URL {
  return new URL(testString);
}

export function sanitizeEndpoint(url: string): string {
  return new URL(url).href.replace(/\/$/, "");
}
