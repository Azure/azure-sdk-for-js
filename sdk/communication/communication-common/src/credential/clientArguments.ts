// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { URLBuilder } from "@azure/core-http";
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
export const isKeyCredential = (credential: unknown): credential is KeyCredential => {
  const castCredential = credential as {
    key: unknown;
    getToken: unknown;
  };
  return (
    castCredential &&
    typeof castCredential.key === "string" &&
    castCredential.getToken === undefined
  );
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
  credentialOrOptions?: unknown
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
