// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
} from "@azure/core-http-compat";
import { Credential } from "@azure/storage-common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export class StorageSharedKeyCredential extends Credential {
  public readonly accountName: string;

  constructor(accountName: string, _accountKey: string) {
    super();
    this.accountName = accountName;
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }

  public create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy {
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }

  public computeHMACSHA256(_stringToSign: string): string {
    throw new Error("StorageSharedKeyCredential is not supported in React Native.");
  }
}
