// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions as RestClientOptions } from "@azure-rest/core-client";
import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
export interface ClientOptions extends RestClientOptions {}
export interface RequestOptions {
  requestOptions?: {
    /**
     * Headers to send along with the request
     */
    headers?: RawHttpHeadersInput;
    /**
     * Body to send with the request
     */
    body?: unknown;
    /**
     * Query parameters to send with the request
     */
    queryParameters?: Record<string, unknown>;
    /** Set to true if the request is sent over HTTP instead of HTTPS */
    allowInsecureConnection?: boolean;
    /** Set to true if you want to skip encoding the path parameters */
    skipUrlEncoding?: boolean;
  };
}
