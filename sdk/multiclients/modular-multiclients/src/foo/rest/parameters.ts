// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { Resource } from "./models.js";

export interface CreateOrUpdateBodyParam {
  /** The resource instance. */
  body: Resource;
}

export type CreateOrUpdateParameters = CreateOrUpdateBodyParam &
  RequestParameters;
export type GetParameters = RequestParameters;
export type DeleteParameters = RequestParameters;
export type ListParameters = RequestParameters;
