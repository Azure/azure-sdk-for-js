// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";

export function getInsecureServerAddress(): string {
  return inject("insecureServerAddress");
}

export function getSecureServerAddress(): string {
  return inject("secureServerAddress");
}
