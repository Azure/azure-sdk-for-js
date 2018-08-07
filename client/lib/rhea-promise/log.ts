// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
/**
 * @ignore
 * log statements for connection
 */
export const connection = debugModule("rhea-promise:connection");
/**
 * @ignore
 * log statements for session
 */
export const session = debugModule("rhea-promise:session");
/**
 * @ignore
 * log statements for sender
 */
export const sender = debugModule("rhea-promise:sender");
/**
 * @ignore
 * log statements for receiver
 */
export const receiver = debugModule("rhea-promise:receiver");
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("rhea-promise:error");
