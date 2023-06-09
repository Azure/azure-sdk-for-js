// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetBinaryParameters,
  GetArrayParameters,
  CreateWithHeadersParameters,
  DeleteWithHeadersParameters,
} from "./parameters.js";
import {
  GetBinary200Response,
  GetArray200Response,
  CreateWithHeaders201Response,
  DeleteWithHeaders204Response,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetBinary {
  get(options?: GetBinaryParameters): StreamableMethod<GetBinary200Response>;
}

export interface GetArray {
  get(options?: GetArrayParameters): StreamableMethod<GetArray200Response>;
}

export interface CreateWithHeaders {
  put(
    options?: CreateWithHeadersParameters
  ): StreamableMethod<CreateWithHeaders201Response>;
}

export interface DeleteWithHeaders {
  delete(
    options?: DeleteWithHeadersParameters
  ): StreamableMethod<DeleteWithHeaders204Response>;
}

export interface Routes {
  /** Resource for '/cadl-bar/get-binary' has methods for the following verbs: get */
  (path: "/cadl-bar/get-binary"): GetBinary;
  /** Resource for '/cadl-bar' has methods for the following verbs: get */
  (path: "/cadl-bar"): GetArray;
  /** Resource for '/cadl-bar/create-with-headers' has methods for the following verbs: put */
  (path: "/cadl-bar/create-with-headers"): CreateWithHeaders;
  /** Resource for '/cadl-bar/delete-with-headers' has methods for the following verbs: delete */
  (path: "/cadl-bar/delete-with-headers"): DeleteWithHeaders;
}

export type BarContext = Client & {
  path: Routes;
};
