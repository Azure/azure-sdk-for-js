// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client"

/** Optional request paramters support passing headers, abort signal, etc */
export type OptionalRequestParameters = Pick<RequestParameters, "headers"| "timeout"| "abortSignal"| "tracingOptions">

/** Request options for list requests */
export interface ListQueryParameters {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;

  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: "asc" | "desc";

  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;

  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}
