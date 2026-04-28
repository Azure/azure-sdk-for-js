// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
} from "@azure/core-http-compat";
import { Credential } from "./Credential.js";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export class StorageSharedKeyCredential extends Credential {
  /**
   * Azure Storage account name; readonly.
   */
  public readonly accountName!: string;

  /**
   * Creates an instance of StorageSharedKeyCredential.
   * @param accountName -
   * @param accountKey -
   */
  constructor(_accountName: string, _accountKey: string) {
    super();
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }

  /**
   * Creates a StorageSharedKeyCredentialPolicy object.
   *
   * @param _nextPolicy -
   * @param _options -
   */
  public create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy {
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param _stringToSign -
   */
  public computeHMACSHA256(_stringToSign: string): string {
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }
}
