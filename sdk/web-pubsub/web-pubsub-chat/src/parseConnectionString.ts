// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ParsedConnectionString {
  endpoint: string;
  accessKey: string;
}

/**
 * Parses a Web PubSub connection string of the form:
 *   Endpoint=https://<host>;AccessKey=<key>
 */
export function parseConnectionString(connectionString: string): ParsedConnectionString {
  const pairs = connectionString.split(";");
  let endpoint: string | undefined;
  let accessKey: string | undefined;
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx <= 0) continue;
    const key = pair.substring(0, idx).trim().toLowerCase();
    const value = pair.substring(idx + 1).trim();
    if (key === "endpoint") {
      endpoint = value;
    } else if (key === "accesskey") {
      accessKey = value;
    }
  }
  if (!endpoint) {
    throw new Error("Connection string must contain an Endpoint.");
  }
  if (!accessKey) {
    throw new Error("Connection string must contain an AccessKey.");
  }
  return { endpoint, accessKey };
}
