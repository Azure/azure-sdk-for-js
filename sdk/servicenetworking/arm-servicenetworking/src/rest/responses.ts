// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  AssociationOutput,
  ErrorResponseOutput,
  AssociationListResultOutput,
  FrontendOutput,
  FrontendListResultOutput,
  TrafficControllerOutput,
  TrafficControllerListResultOutput,
  PagedOperationOutput,
} from "./outputModels.js";

/** Azure operation completed successfully. */
export interface AssociationsInterfaceGet200Response extends HttpResponse {
  status: "200";
  body: AssociationOutput;
}

export interface AssociationsInterfaceGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Association' update operation succeeded */
export interface AssociationsInterfaceCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: AssociationOutput;
}

export interface AssociationsInterfaceCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Association' create operation succeeded */
export interface AssociationsInterfaceCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: AssociationOutput;
  headers: RawHttpHeaders & AssociationsInterfaceCreateOrUpdate201Headers;
}

export interface AssociationsInterfaceCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface AssociationsInterfaceCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: AssociationOutput;
}

/** Azure operation completed successfully. */
export interface AssociationsInterfaceUpdate200Response extends HttpResponse {
  status: "200";
  body: AssociationOutput;
}

export interface AssociationsInterfaceUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource deleted successfully. */
export interface AssociationsInterfaceDeleteOperation200Response
  extends HttpResponse {
  status: "200";
}

export interface AssociationsInterfaceDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface AssociationsInterfaceDeleteOperation202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AssociationsInterfaceDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface AssociationsInterfaceDeleteOperation204Response
  extends HttpResponse {
  status: "204";
}

export interface AssociationsInterfaceDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface AssociationsInterfaceDeleteLogicalResponse
  extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface AssociationsInterfaceListByTrafficController200Response
  extends HttpResponse {
  status: "200";
  body: AssociationListResultOutput;
}

export interface AssociationsInterfaceListByTrafficControllerDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface FrontendsInterfaceGet200Response extends HttpResponse {
  status: "200";
  body: FrontendOutput;
}

export interface FrontendsInterfaceGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Frontend' update operation succeeded */
export interface FrontendsInterfaceCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: FrontendOutput;
}

export interface FrontendsInterfaceCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Frontend' create operation succeeded */
export interface FrontendsInterfaceCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: FrontendOutput;
  headers: RawHttpHeaders & FrontendsInterfaceCreateOrUpdate201Headers;
}

export interface FrontendsInterfaceCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface FrontendsInterfaceCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: FrontendOutput;
}

/** Azure operation completed successfully. */
export interface FrontendsInterfaceUpdate200Response extends HttpResponse {
  status: "200";
  body: FrontendOutput;
}

export interface FrontendsInterfaceUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource deleted successfully. */
export interface FrontendsInterfaceDeleteOperation200Response
  extends HttpResponse {
  status: "200";
}

export interface FrontendsInterfaceDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface FrontendsInterfaceDeleteOperation202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & FrontendsInterfaceDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface FrontendsInterfaceDeleteOperation204Response
  extends HttpResponse {
  status: "204";
}

export interface FrontendsInterfaceDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface FrontendsInterfaceDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface FrontendsInterfaceListByTrafficController200Response
  extends HttpResponse {
  status: "200";
  body: FrontendListResultOutput;
}

export interface FrontendsInterfaceListByTrafficControllerDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface TrafficControllerInterfaceGet200Response extends HttpResponse {
  status: "200";
  body: TrafficControllerOutput;
}

export interface TrafficControllerInterfaceGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'TrafficController' update operation succeeded */
export interface TrafficControllerInterfaceCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: TrafficControllerOutput;
}

export interface TrafficControllerInterfaceCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'TrafficController' create operation succeeded */
export interface TrafficControllerInterfaceCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: TrafficControllerOutput;
  headers: RawHttpHeaders & TrafficControllerInterfaceCreateOrUpdate201Headers;
}

export interface TrafficControllerInterfaceCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface TrafficControllerInterfaceCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: TrafficControllerOutput;
}

/** Azure operation completed successfully. */
export interface TrafficControllerInterfaceUpdate200Response
  extends HttpResponse {
  status: "200";
  body: TrafficControllerOutput;
}

export interface TrafficControllerInterfaceUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource deleted successfully. */
export interface TrafficControllerInterfaceDeleteOperation200Response
  extends HttpResponse {
  status: "200";
}

export interface TrafficControllerInterfaceDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface TrafficControllerInterfaceDeleteOperation202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TrafficControllerInterfaceDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface TrafficControllerInterfaceDeleteOperation204Response
  extends HttpResponse {
  status: "204";
}

export interface TrafficControllerInterfaceDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface TrafficControllerInterfaceDeleteLogicalResponse
  extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface TrafficControllerInterfaceListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: TrafficControllerListResultOutput;
}

export interface TrafficControllerInterfaceListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface TrafficControllerInterfaceListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: TrafficControllerListResultOutput;
}

export interface TrafficControllerInterfaceListBySubscriptionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedOperationOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
