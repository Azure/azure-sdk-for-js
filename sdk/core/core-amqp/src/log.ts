// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import debugModule from "debug";
/**
 * @ignore
 * log statements for cbs
 */
export const cbs = debugModule("azure:core-amqp:cbs");
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:core-amqp:error");
/**
 * @ignore
 * log statements for datatransformer
 */
export const transformer = debugModule("azure:core-amqp:datatransformer");
/**
 * @ignore
 * log statements for messageHeader
 */
export const msgHeader = debugModule("azure:core-amqp:messageHeader");
/**
 * @ignore
 * log statements for messageProperties
 */
export const msgProperties = debugModule("azure:core-amqp:messageProperties");
/**
 * @ignore
 * log statements for retry
 */
export const retry = debugModule("azure:core-amqp:retry");
/**
 * @ignore
 * log statements for reqreslink
 */
export const reqres = debugModule("azure:core-amqp:reqreslink");
