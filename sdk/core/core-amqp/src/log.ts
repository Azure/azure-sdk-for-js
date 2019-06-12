// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import debugModule from "debug";
/**
 * @ignore
 * log statements for cbs
 */
export const cbs = debugModule("azure:core-http:cbs");
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:core-http:error");
/**
 * @ignore
 * log statements for datatransformer
 */
export const transformer = debugModule("azure:core-http:datatransformer");
/**
 * @ignore
 * log statements for messageHeader
 */
export const msgHeader = debugModule("azure:core-http:messageHeader");
/**
 * @ignore
 * log statements for messageProperties
 */
export const msgProperties = debugModule("azure:core-http:messageProperties");
/**
 * @ignore
 * log statements for retry
 */
export const retry = debugModule("azure:core-http:retry");
/**
 * @ignore
 * log statements for reqreslink
 */
export const reqres = debugModule("azure:core-http:reqreslink");
