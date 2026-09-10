// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Host interface abstracting platform-specific operations (file I/O, etc.).
 * Set once at app startup via `setHost()`.
 */
export interface CdkHost {
  readFile(path: string): string;
}

let currentHost: CdkHost | undefined;

export function setHost(host: CdkHost): void {
  currentHost = host;
}

export function getHost(): CdkHost {
  if (!currentHost) {
    throw new Error(
      "No CDK host configured. Call setHost() before using host-dependent APIs like importStacks().",
    );
  }
  return currentHost;
}
