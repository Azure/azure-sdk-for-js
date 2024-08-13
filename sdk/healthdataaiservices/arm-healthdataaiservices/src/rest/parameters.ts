// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { DeidService, DeidUpdate, PrivateEndpointConnectionResource } from "./models.js";

export type OperationsListParameters = RequestParameters;
export type DeidServicesGetParameters = RequestParameters;
export type DeidServicesListByResourceGroupParameters = RequestParameters;
export type DeidServicesListBySubscriptionParameters = RequestParameters;

export interface DeidServicesCreateBodyParam {
  /** Resource create parameters. */
  body: DeidService;
}

export type DeidServicesCreateParameters = DeidServicesCreateBodyParam & RequestParameters;

export interface DeidServicesUpdateBodyParam {
  /** The resource properties to be updated. */
  body: DeidUpdate;
}

export type DeidServicesUpdateParameters = DeidServicesUpdateBodyParam & RequestParameters;
export type DeidServicesDeleteParameters = RequestParameters;
export type PrivateEndpointConnectionsGetParameters = RequestParameters;

export interface PrivateEndpointConnectionsCreateBodyParam {
  /** Resource create parameters. */
  body: PrivateEndpointConnectionResource;
}

export type PrivateEndpointConnectionsCreateParameters = PrivateEndpointConnectionsCreateBodyParam &
  RequestParameters;
export type PrivateEndpointConnectionsDeleteParameters = RequestParameters;
export type PrivateEndpointConnectionsListByDeidServiceParameters = RequestParameters;
export type PrivateLinksListByDeidServiceParameters = RequestParameters;
