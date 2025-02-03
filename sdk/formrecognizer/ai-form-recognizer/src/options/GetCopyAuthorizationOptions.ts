// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { CommonModelCreationOptions } from "./BuildModelOptions.js";

/**
 * Options for the get copy authorization method.
 */
export interface GetCopyAuthorizationOptions extends OperationOptions, CommonModelCreationOptions {}
