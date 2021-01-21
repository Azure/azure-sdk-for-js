// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { WithResponse } from "../common/models";
import { AcquiredPhoneNumber } from "./generated/src/models";

export type UpdatePhoneNumberOptions = OperationOptions;

export type UpdatePhoneNumberResponse = WithResponse<AcquiredPhoneNumber>;

export type GetPhoneNumberOptions = OperationOptions;

export type GetPhoneNumberResponse = WithResponse<AcquiredPhoneNumber>;

export type ListPhoneNumbersOptions = OperationOptions;

export {
    AcquiredPhoneNumber
} from "./generated/src/models";