// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { createHmac } from "crypto";
import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";

import { StorageSharedKeyCredentialPolicy } from "../policies/StorageSharedKeyCredentialPolicy";
import { Credential } from "./Credential";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 *
 * @export
 * @class StorageSharedKeyCredential
 * @extends {Credential}
 */
export class StorageSharedKeyCredential extends Credential {
  /**
   * Azure Storage account name; readonly.
   *
   * @type {string}
   * @memberof StorageSharedKeyCredential
   */
  public readonly accountName: string;

  /**
   * Azure Storage account key; readonly.
   *
   * @type {Buffer}
   * @memberof StorageSharedKeyCredential
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of StorageSharedKeyCredential.
   * @param {string} accountName
   * @param {string} accountKey
   * @memberof StorageSharedKeyCredential
   */
  constructor(accountName: string, accountKey: string) {
    super();
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Creates a StorageSharedKeyCredentialPolicy object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {StorageSharedKeyCredentialPolicy}
   * @memberof StorageSharedKeyCredential
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
   * @param {string} stringToSign
   * @returns {string}
   * @memberof StorageSharedKeyCredential
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }
}
