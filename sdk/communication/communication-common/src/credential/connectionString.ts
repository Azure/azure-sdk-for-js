// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, KeyCredential } from "@azure/core-auth";

export interface EndpointCredential {
  endpoint: string;
  credential: KeyCredential;
}

// TODO: update when connection string format is finalized
const CONNECTION_STRING_REGEX = /endpoint=(.*);accesskey=(.*)/i;

const tryParseConnectionString = (s: string): EndpointCredential | undefined => {
  const match = s.match(CONNECTION_STRING_REGEX);
  if (match?.[1] && match[2]) {
    return { endpoint: match[1], credential: new AzureKeyCredential(match[2]) };
  }
  return undefined;
};

export const parseConnectionString = (connectionString: string): EndpointCredential => {
  const parsedConnectionString = tryParseConnectionString(connectionString);
  if (parsedConnectionString) {
    return parsedConnectionString;
  } else {
    throw new Error(`Invalid connection string ${connectionString}`);
  }
};
