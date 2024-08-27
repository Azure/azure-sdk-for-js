// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { CommonModelCreationOptions } from "./BuildModelOptions";

/**
 * Options for the get copy authorization method.
 */
export interface GetCopyAuthorizationOptions extends OperationOptions, CommonModelCreationOptions {}
