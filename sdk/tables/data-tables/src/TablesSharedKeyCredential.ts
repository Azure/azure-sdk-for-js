// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "crypto";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TablesSharedKeyCredentialLike shape for account key authorization of Azure Tables service.
 */
export interface TablesSharedKeyCredentialLike {
  /**
   * Azure  account name; readonly.
   */
  accountName: string;
  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   */
  computeHMACSHA256: (stringToSign: string) => string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TablesSharedKeyCredential for account key authorization of Azure Tables service.
 */
export class TablesSharedKeyCredential implements TablesSharedKeyCredentialLike {
  /**
   * Azure  account name; readonly.
   */
  public readonly accountName: string;

  /**
   * Azure  account key; readonly.
   */
  private readonly accountKey: Buffer;

  /**
   * Creates an instance of TablesSharedKeyCredential.
   */
  constructor(accountName: string, accountKey: string) {
    this.accountName = accountName;
    this.accountKey = Buffer.from(accountKey, "base64");
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   */
  public computeHMACSHA256(stringToSign: string): string {
    return createHmac("sha256", this.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
  }
}
