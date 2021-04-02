// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure/core-http";

/**
 * Represents an object with a non-enumerable _response property which provides
 * information about the HTTP response.
 */
export type WithResponse<T> = T & { _response: HttpResponse };

/**
 * Represents a generic HTTP response
 */
export type VoidResponse = WithResponse<{}>;
