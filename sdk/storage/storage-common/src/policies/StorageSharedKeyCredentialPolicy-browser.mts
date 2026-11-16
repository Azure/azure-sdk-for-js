// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
} from "@azure/core-http-compat";
import type { StorageSharedKeyCredential } from "#platform/credentials/StorageSharedKeyCredential";
import { CredentialPolicy } from "./CredentialPolicy.js";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
  /**
   * Creates an instance of StorageSharedKeyCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   * @param _factory -
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    _factory: StorageSharedKeyCredential,
  ) {
    super(nextPolicy, options);
    throw new Error("StorageSharedKeyCredentialPolicy is not supported in the browser.");
  }
}
