// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { ManagedPrivateEndpoint } from "./models";

export type GetParameters = RequestParameters;

export interface CreateBodyParam {
  body: ManagedPrivateEndpoint;
}

export type CreateParameters = RequestParameters & CreateBodyParam;
export type DeleteParameters = RequestParameters;
export type ListParameters = RequestParameters;
