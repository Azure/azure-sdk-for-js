// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions as RestClientOptions, StreamableMethod } from "@azure-rest/core-client";
import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";

type StreamableResolvedType<T> = T extends StreamableMethod<infer R> ? R : never;
export type OperationRawReturnType<T extends (...args: any[]) => StreamableMethod<any>> =
  StreamableResolvedType<ReturnType<T>>;

export interface ClientOptions extends RestClientOptions {}
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
    /**
     * Callback to access the raw response object when the response is received
     */
    onResponse?: (response: HttpResponse) => void;
  };
}
