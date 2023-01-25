// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallConnection } from "../callConnection";
import { CallConnectionPropertiesDto } from "./models";

/**
 * The interface used as parent of [action]CallResult
 */
interface CallResult {
    /*
     * The callConnectionProperties
     */
    callConnectionProperties: CallConnectionPropertiesDto;

    /*
     * The callConnection
     */
    callConnection: CallConnection;
}

/**
 * CreateCall result
 */
export type CreateCallResult = CallResult;

/**
 * CreateCall result
 */
export type AnswerCallResult = CallResult;
