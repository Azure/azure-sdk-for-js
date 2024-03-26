// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Association,
  AssociationUpdate,
  Frontend,
  FrontendUpdate,
  TrafficController,
  TrafficControllerUpdate,
} from "./models.js";

export type AssociationsInterfaceGetParameters = RequestParameters;

export interface AssociationsInterfaceCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Association;
}

export type AssociationsInterfaceCreateOrUpdateParameters =
  AssociationsInterfaceCreateOrUpdateBodyParam & RequestParameters;

export interface AssociationsInterfaceUpdateBodyParam {
  /** The resource properties to be updated. */
  body: AssociationUpdate;
}

export type AssociationsInterfaceUpdateParameters =
  AssociationsInterfaceUpdateBodyParam & RequestParameters;
export type AssociationsInterfaceDeleteParameters = RequestParameters;
export type AssociationsInterfaceListByTrafficControllerParameters =
  RequestParameters;
export type FrontendsInterfaceGetParameters = RequestParameters;

export interface FrontendsInterfaceCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: Frontend;
}

export type FrontendsInterfaceCreateOrUpdateParameters =
  FrontendsInterfaceCreateOrUpdateBodyParam & RequestParameters;

export interface FrontendsInterfaceUpdateBodyParam {
  /** The resource properties to be updated. */
  body: FrontendUpdate;
}

export type FrontendsInterfaceUpdateParameters =
  FrontendsInterfaceUpdateBodyParam & RequestParameters;
export type FrontendsInterfaceDeleteParameters = RequestParameters;
export type FrontendsInterfaceListByTrafficControllerParameters =
  RequestParameters;
export type TrafficControllerInterfaceGetParameters = RequestParameters;

export interface TrafficControllerInterfaceCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: TrafficController;
}

export type TrafficControllerInterfaceCreateOrUpdateParameters =
  TrafficControllerInterfaceCreateOrUpdateBodyParam & RequestParameters;

export interface TrafficControllerInterfaceUpdateBodyParam {
  /** The resource properties to be updated. */
  body: TrafficControllerUpdate;
}

export type TrafficControllerInterfaceUpdateParameters =
  TrafficControllerInterfaceUpdateBodyParam & RequestParameters;
export type TrafficControllerInterfaceDeleteParameters = RequestParameters;
export type TrafficControllerInterfaceListByResourceGroupParameters =
  RequestParameters;
export type TrafficControllerInterfaceListBySubscriptionParameters =
  RequestParameters;
export type OperationsListParameters = RequestParameters;
