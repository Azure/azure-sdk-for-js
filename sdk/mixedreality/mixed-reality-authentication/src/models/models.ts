// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, HttpResponse } from "@azure/core-http";

/**
 * Represents an object with a non-enumerable _response property which provides
 */
export type WithResponse<T> = T & { _response: HttpResponse };

/**
 * Represents the response from getting a token.
 */
export type GetTokenResponse = WithResponse<AccessToken>;
