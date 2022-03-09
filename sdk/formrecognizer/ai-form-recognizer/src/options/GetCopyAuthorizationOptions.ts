// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Options for the get copy authorization method.
 */
export interface GetCopyAuthorizationOptions extends OperationOptions {
  /**
   * A textual description of the model (can be any text).
   */
  description?: string;
}
