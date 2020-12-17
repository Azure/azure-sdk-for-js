// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { WithResponse } from "../common/models";
import { AcquiredPhoneNumber } from "./generated/src/models";

/**
 * Options for listing acquired phone numbers.
 */
export type ListPhoneNumbersOptions = OperationOptions;
export type GetPhoneNumberOptions = OperationOptions;
export type UpdatePhoneNumberOptions = OperationOptions;

export type UpdatePhoneNumberResponse = WithResponse<AcquiredPhoneNumber>;
