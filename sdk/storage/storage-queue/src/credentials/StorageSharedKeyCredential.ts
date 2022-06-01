// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "crypto";
import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";

import { StorageSharedKeyCredentialPolicy } from "../policies/StorageSharedKeyCredentialPolicy";
import { Credential } from "./Credential";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export class StorageSharedKeyCredential extends Credential {
  /**
   * Azure Storage account name; readonly.
   */
  public readonly accountName: string;

  /**
   * Azure Storage account key; readonly.
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of StorageSharedKeyCredential.
   * @param accountName -
   * @param accountKey -
   */
  constructor(accountName: string, accountKey: string) {
    super();
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Creates a {@link StorageSharedKeyCredentialPolicy} object.
   *
   * @param nextPolicy -
   * @param options -
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): StorageSharedKeyCredentialPolicy {
    return new StorageSharedKeyCredentialPolicy(nextPolicy, options, this);
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param stringToSign -
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey).update(stringToSign, "utf8").digest("base64");
  }
}
