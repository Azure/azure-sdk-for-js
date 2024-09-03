// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";

export interface RequestOptions {
  requestOptions?: {
    /**
     * Headers to send along with the request
     */
    headers?: RawHttpHeadersInput;
    /** Set to true if the request is sent over HTTP instead of HTTPS */
    allowInsecureConnection?: boolean;
    /** Set to true if you want to skip encoding the path parameters */
    skipUrlEncoding?: boolean;
  };
}
