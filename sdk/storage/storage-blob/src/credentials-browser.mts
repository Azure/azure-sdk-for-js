// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "./Pipeline.js";
import { isPipelineLike } from "./Pipeline.js";
import type { StorageSharedKeyCredential } from "@azure/storage-common";
import { AnonymousCredential } from "@azure/storage-common";

/**
 * StorageSharedKeyCredential is not available in browser.
 * Always returns false but includes type predicate for type narrowing.
 * @internal
 */
export function isStorageSharedKeyCredential(
  _credential: unknown,
): _credential is StorageSharedKeyCredential {
  return false;
}

/**
 * StorageSharedKeyCredential cannot be created in browser.
 * @internal
 */
export function createSharedKeyCredentialFromConnectionString(
  _accountName: string,
  _accountKey: string,
): never {
  throw new Error("StorageSharedKeyCredential is only supported in Node.js environment");
}

/**
 * Account connection strings with keys are not supported in non-Node.js environments.
 * @internal
 */
export function parseConnectionString(_connectionString: string):
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
      proxyUri?: string;
    } {
  // AccountConnString requires StorageSharedKeyCredential which is Node.js only
  throw new Error("Account connection string is only supported in Node.js environment");
}

/**
 * @internal
 */
export type CredentialType = StorageSharedKeyCredential | AnonymousCredential | TokenCredential;

/**
 * Checks if the credential is a valid storage credential type (browser version).
 * @internal
 */
export function isValidCredential(credential: unknown): credential is CredentialType {
  return credential instanceof AnonymousCredential || isTokenCredential(credential);
}

/**
 * Determines if the second argument is a credential or pipeline.
 * @internal
 */
export function isCredentialOrPipeline(arg: unknown): arg is CredentialType | Pipeline {
  return isPipelineLike(arg) || isValidCredential(arg);
}
