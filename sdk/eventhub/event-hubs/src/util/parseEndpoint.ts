// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Parses the host, hostname, and port from an endpoint.
 * @param endpoint And endpoint to parse.
 * @internal
 */
export function parseEndpoint(endpoint: string): { host: string; hostname: string; port?: string } {
  const hostMatch = endpoint.match(/.*:\/\/([^/]*)/);
  if (!hostMatch) {
    throw new TypeError(`Invalid endpoint missing host: ${endpoint}`);
  }

  const [, host] = hostMatch;
  const [hostname, port] = host.split(":");

  return { host, hostname, port };
}
