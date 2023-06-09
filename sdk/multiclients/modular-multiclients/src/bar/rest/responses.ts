// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import { ResourceOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface GetBinary200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** The request has succeeded. */
export interface GetArray200Response extends HttpResponse {
  status: "200";
  body: Array<ResourceOutput>;
}

export interface CreateWithHeaders201Headers {
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateWithHeaders201Response extends HttpResponse {
  status: "201";
  body: ResourceOutput;
  headers: RawHttpHeaders & CreateWithHeaders201Headers;
}

export interface DeleteWithHeaders204Headers {
  "operation-location": string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteWithHeaders204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteWithHeaders204Headers;
}
