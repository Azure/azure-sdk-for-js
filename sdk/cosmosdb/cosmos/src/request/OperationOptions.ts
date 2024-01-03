// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface QueryOperationOptions {
  /**
   * Request Units(RU) Cap for a given request. Default: Undefined
   */
  ruCapPerOperation?: number;
  /**
   * Additonal headers to be added to the request
   */
  [key: string]: any;
}
