// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { parseConnectionString } from "./connectionString";

const isValidEndpoint = (host: string): boolean => {
  const url = new URL(host);

  return (
    !!url.protocol?.match(/^http[s]?/) &&
    url.host !== undefined &&
    url.host !== "" &&
    (url.pathname === undefined || url.pathname === "" || url.pathname === "/")
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
 * @hidden
 */
export type UrlWithCredential = {
  url: string;
  credential: TokenCredential | KeyCredential;
};

/**
 * Parses arguments passed to a communication client.
 * @hidden
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
