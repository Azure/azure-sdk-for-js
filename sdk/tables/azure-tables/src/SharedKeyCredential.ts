// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { createHmac } from "crypto";
import { RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http";

import { SharedKeyCredentialPolicy } from "./SharedKeyCredentialPolicy";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * SharedKeyCredential for account key authorization of Azure  service.
 *
 * @export
 * @class SharedKeyCredential
 * @extends {Credential}
 */
export class SharedKeyCredential implements RequestPolicyFactory {
  /**
   * Azure  account name; readonly.
   *
   * @type {string}
   * @memberof SharedKeyCredential
   */
  public readonly accountName: string;

  /**
   * Azure  account key; readonly.
   *
   * @type {Buffer}
   * @memberof SharedKeyCredential
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of SharedKeyCredential.
   * @param {string} accountName
   * @param {string} accountKey
   * @memberof SharedKeyCredential
   */
  constructor(accountName: string, accountKey: string) {
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Creates a {@link SharedKeyCredentialPolicy} object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {SharedKeyCredentialPolicy}
   * @memberof SharedKeyCredential
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): SharedKeyCredentialPolicy {
    return new SharedKeyCredentialPolicy(nextPolicy, options, this);
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param {string} stringToSign
   * @returns {string}
   * @memberof SharedKeyCredential
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }
}
