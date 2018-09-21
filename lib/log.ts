// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
/**
 * @ignore
 * log statements for cbs
 */
export const cbs = debugModule("azure:amqp-common:cbs");
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:amqp-common:error");
/**
 * @ignore
 * log statements for datatransformer
 */
export const transformer = debugModule("azure:amqp-common:datatransformer");
/**
 * @ignore
 * log statements for messageHeader
 */
export const msgHeader = debugModule("azure:amqp-common:messageHeader");
/**
 * @ignore
 * log statements for messageProperties
 */
export const msgProperties = debugModule("azure:amqp-common:messageProperties");
/**
 * @ignore
 * log statements for retry
 */
export const retry = debugModule("azure:amqp-common:retry");
/**
 * @ignore
 * log statements for reqreslink
 */
export const reqres = debugModule("azure:amqp-common:reqreslink");
