// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions, URLBuilder } from "@azure/core-http";
import { parseConnectionString } from "./connectionString";

const isValidEndpoint = (host: string): boolean => {
  const url = URLBuilder.parse(host);

  return (
    !!url.getScheme()?.match(/^http[s]?/) &&
    url.getHost() !== undefined &&
    url.getHost() !== "" &&
    (url.getPath() === undefined || url.getPath() === "" || url.getPath() === "/")
  );
};

const assertValidEndpoint = (host: string): void => {
  if (!isValidEndpoint(host)) {
    throw new Error(`Invalid endpoint url ${host}`);
  }
};

/**
 * Checks whether a value is a KeyCredential.
 *
 * @param credential - The credential being checked.
 */
export const isKeyCredential = (
  credential?: KeyCredential | PipelineOptions | TokenCredential
): credential is KeyCredential => {
  if (credential === undefined) {
    return false;
  }

  return credential && (credential as KeyCredential).key !== undefined;
};

/**
 * The URL and credential from parsing the arguments of a communication client.
 */
export type UrlWithCredential = {
  url: string;
  credential: TokenCredential | KeyCredential;
};

/**
 * Parses arguments passed to a communication client.
 */
export const parseClientArguments = (
  connectionStringOrUrl: string,
  credentialOrOptions?: KeyCredential | PipelineOptions | TokenCredential
): UrlWithCredential => {
  if (isKeyCredential(credentialOrOptions) || isTokenCredential(credentialOrOptions)) {
    assertValidEndpoint(connectionStringOrUrl);
    return { url: connectionStringOrUrl, credential: credentialOrOptions };
  } else {
    const { endpoint: host, credential } = parseConnectionString(connectionStringOrUrl);
    assertValidEndpoint(host);
    return { url: host, credential };
  }
};
