// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  OperationListResultOutput,
  ErrorResponseOutput,
  MongoClusterOutput,
  MongoClusterListResultOutput,
  ListConnectionStringsResultOutput,
  CheckNameAvailabilityResponseOutput,
  FirewallRuleOutput,
  FirewallRuleListResultOutput,
  PrivateEndpointConnectionResourceListResultOutput,
  PrivateEndpointConnectionResourceOutput,
  PrivateLinkResourceListResultOutput,
} from "./outputModels.js";

/** Azure operation completed successfully. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface MongoClustersGet200Response extends HttpResponse {
  status: "200";
  body: MongoClusterOutput;
}

export interface MongoClustersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'MongoCluster' update operation succeeded */
export interface MongoClustersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: MongoClusterOutput;
}

export interface MongoClustersCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'MongoCluster' create operation succeeded */
export interface MongoClustersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: MongoClusterOutput;
  headers: RawHttpHeaders & MongoClustersCreateOrUpdate201Headers;
}

export interface MongoClustersCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface MongoClustersCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: MongoClusterOutput;
}

/** Azure operation completed successfully. */
export interface MongoClustersUpdate200Response extends HttpResponse {
  status: "200";
  body: MongoClusterOutput;
}

export interface MongoClustersUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface MongoClustersUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & MongoClustersUpdate202Headers;
}

export interface MongoClustersUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface MongoClustersUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: MongoClusterOutput;
}

export interface MongoClustersDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface MongoClustersDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & MongoClustersDelete202Headers;
}

/** Resource does not exist. */
export interface MongoClustersDelete204Response extends HttpResponse {
  status: "204";
}

export interface MongoClustersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface MongoClustersDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface MongoClustersListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: MongoClusterListResultOutput;
}

export interface MongoClustersListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface MongoClustersList200Response extends HttpResponse {
  status: "200";
  body: MongoClusterListResultOutput;
}

export interface MongoClustersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface MongoClustersListConnectionStrings200Response
  extends HttpResponse {
  status: "200";
  body: ListConnectionStringsResultOutput;
}

export interface MongoClustersListConnectionStringsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface MongoClustersCheckNameAvailability200Response
  extends HttpResponse {
  status: "200";
  body: CheckNameAvailabilityResponseOutput;
}

export interface MongoClustersCheckNameAvailabilityDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface FirewallRulesGet200Response extends HttpResponse {
  status: "200";
  body: FirewallRuleOutput;
}

export interface FirewallRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'FirewallRule' update operation succeeded */
export interface FirewallRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FirewallRuleOutput;
}

/** Resource 'FirewallRule' create operation succeeded */
export interface FirewallRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FirewallRuleOutput;
}

export interface FirewallRulesCreateOrUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource operation accepted. */
export interface FirewallRulesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & FirewallRulesCreateOrUpdate202Headers;
}

export interface FirewallRulesCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface FirewallRulesCreateOrUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: FirewallRuleOutput;
}

export interface FirewallRulesDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface FirewallRulesDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & FirewallRulesDelete202Headers;
}

/** Resource does not exist. */
export interface FirewallRulesDelete204Response extends HttpResponse {
  status: "204";
}

export interface FirewallRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface FirewallRulesDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface FirewallRulesListByMongoCluster200Response
  extends HttpResponse {
  status: "200";
  body: FirewallRuleListResultOutput;
}

export interface FirewallRulesListByMongoClusterDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface PrivateEndpointConnectionsListByMongoCluster200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceListResultOutput;
}

export interface PrivateEndpointConnectionsListByMongoClusterDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface PrivateEndpointConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsGetDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'PrivateEndpointConnectionResource' update operation succeeded */
export interface PrivateEndpointConnectionsCreate200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

/** Resource 'PrivateEndpointConnectionResource' create operation succeeded */
export interface PrivateEndpointConnectionsCreate201Response
  extends HttpResponse {
  status: "201";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsCreate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource operation accepted. */
export interface PrivateEndpointConnectionsCreate202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PrivateEndpointConnectionsCreate202Headers;
}

export interface PrivateEndpointConnectionsCreateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running create operation */
export interface PrivateEndpointConnectionsCreateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface PrivateEndpointConnectionsDelete202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PrivateEndpointConnectionsDelete202Headers;
}

/** Resource does not exist. */
export interface PrivateEndpointConnectionsDelete204Response
  extends HttpResponse {
  status: "204";
}

export interface PrivateEndpointConnectionsDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface PrivateEndpointConnectionsDeleteLogicalResponse
  extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface PrivateLinksListByMongoCluster200Response
  extends HttpResponse {
  status: "200";
  body: PrivateLinkResourceListResultOutput;
}

export interface PrivateLinksListByMongoClusterDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
