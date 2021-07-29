/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { RequestPolicy, ServiceClientCredentials } from "@azure/ms-rest-js";
import { createHmac } from "crypto";

/**
 * Creates a new BatchSharedKeyCredentials object.
 * @constructor
 * @param accountName The batch account name.
 * @param accountKey The batch account key.
 */
export class BatchSharedKeyCredentials implements ServiceClientCredentials {
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
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Creates a StorageSharedKeyCredentialPolicy object.
   *
   * @param nextPolicy -
   * @param options -
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): BatchSharedKeyCredentialPolicy {
    return new BatchSharedKeyCredentialPolicy(nextPolicy, options, this);
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param stringToSign -
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }

  public signRequest(resource: WebResourceLike): Promise<WebResourceLike> {}
}
