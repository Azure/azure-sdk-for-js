// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class TablesSharedKeyCredential {
  /**
   * Creates an instance of TablesSharedKeyCredential.
   * @param {string} accountName
   * @param {string} accountKey
   */
  constructor(_accountName: string, _accountKey: string) {
    throw new Error("TablesSharedKeyCredential is only supported in Node.js environment");
  }
}
