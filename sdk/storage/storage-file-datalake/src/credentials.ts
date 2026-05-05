// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "./Pipeline.js";
import { isPipelineLike } from "./Pipeline.js";
import { AnonymousCredential, StorageSharedKeyCredential } from "@azure/storage-common";
import { extractConnectionStringParts } from "./utils/utils.common.js";

/**
 * Checks if the credential is a StorageSharedKeyCredential (Node.js only).
 * @internal
 */
export function isStorageSharedKeyCredential(
  credential: unknown,
): credential is StorageSharedKeyCredential {
  return credential instanceof StorageSharedKeyCredential;
}

/**
 * Extracts and validates credentials from connection string (Node.js only).
 * Returns the credential and URL, or throws for SAS connection strings.
 * @internal
 */
export function parseConnectionString(connectionString: string):
  | {
      kind: "AccountConnString";
      url: string;
      credential: StorageSharedKeyCredential;
      accountName: string;
      proxyUri?: string;
    }
  | {
      kind: "SASConnString";
      url: string;
      accountName: string;
    } {
  const extractedCreds = extractConnectionStringParts(connectionString);
  if (extractedCreds.kind === "AccountConnString") {
    return {
      kind: "AccountConnString",
      url: extractedCreds.url,
      credential: new StorageSharedKeyCredential(
        extractedCreds.accountName!,
        extractedCreds.accountKey,
      ),
      accountName: extractedCreds.accountName!,
      proxyUri: extractedCreds.proxyUri,
    };
  }
  return {
    kind: "SASConnString",
    url: extractedCreds.url,
    accountName: extractedCreds.accountName,
  };
}

/**
 * @internal
 */
export type CredentialType = StorageSharedKeyCredential | AnonymousCredential | TokenCredential;

/**
 * Checks if the credential is a valid storage credential type.
 * @internal
 */
export function isValidCredential(credential: unknown): credential is CredentialType {
  return (
    credential instanceof StorageSharedKeyCredential ||
    credential instanceof AnonymousCredential ||
    isTokenCredential(credential)
  );
}

/**
 * Determines if the second argument is a credential or pipeline.
 * @internal
 */
export function isCredentialOrPipeline(arg: unknown): arg is CredentialType | Pipeline {
  return isPipelineLike(arg) || isValidCredential(arg);
}

/**
 * Whether to return early for browser responses.
 * In Node.js, we continue processing the stream.
 * @internal
 */
export const shouldReturnEarlyForBrowserResponse = false;
