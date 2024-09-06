// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import { Fleet, FleetUpdate } from "./models.js";

export type OperationsListParameters = RequestParameters;
export type FleetsGetParameters = RequestParameters;

export interface FleetsCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Fleet;
}

export type FleetsCreateOrUpdateParameters = FleetsCreateOrUpdateBodyParam & RequestParameters;

export interface FleetsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: FleetUpdate;
}

export type FleetsUpdateParameters = FleetsUpdateBodyParam & RequestParameters;
export type FleetsDeleteParameters = RequestParameters;
export type FleetsListByResourceGroupParameters = RequestParameters;
export type FleetsListBySubscriptionParameters = RequestParameters;
export type FleetsListVirtualMachineScaleSetsParameters = RequestParameters;
