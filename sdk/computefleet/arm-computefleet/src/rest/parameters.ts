// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { Fleet, FleetUpdate } from "./models.js";

export type ListParameters = RequestParameters;
export type GetParameters = RequestParameters;

export interface CreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Fleet;
}

export type CreateOrUpdateParameters = CreateOrUpdateBodyParam &
  RequestParameters;

export interface UpdateBodyParam {
  /** The resource properties to be updated. */
  body: FleetUpdate;
}

export type UpdateParameters = UpdateBodyParam & RequestParameters;
export type DeleteParameters = RequestParameters;
export type ListByResourceGroupParameters = RequestParameters;
export type ListBySubscriptionParameters = RequestParameters;
export type ListVirtualMachineScaleSetsParameters = RequestParameters;
