// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  MongoCluster,
  MongoClusterUpdate,
  CheckNameAvailabilityRequest,
  FirewallRule,
  PrivateEndpointConnectionResource,
} from "./models.js";

export type OperationsListParameters = RequestParameters;
export type MongoClustersGetParameters = RequestParameters;

export interface MongoClustersCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: MongoCluster;
}

export type MongoClustersCreateOrUpdateParameters =
  MongoClustersCreateOrUpdateBodyParam & RequestParameters;

export interface MongoClustersUpdateBodyParam {
  /** The resource properties to be updated. */
  body: MongoClusterUpdate;
}

export type MongoClustersUpdateParameters = MongoClustersUpdateBodyParam &
  RequestParameters;
export type MongoClustersDeleteParameters = RequestParameters;
export type MongoClustersListByResourceGroupParameters = RequestParameters;
export type MongoClustersListParameters = RequestParameters;
export type MongoClustersListConnectionStringsParameters = RequestParameters;

export interface MongoClustersCheckNameAvailabilityBodyParam {
  /** The CheckAvailability request */
  body: CheckNameAvailabilityRequest;
}

export type MongoClustersCheckNameAvailabilityParameters =
  MongoClustersCheckNameAvailabilityBodyParam & RequestParameters;
export type FirewallRulesGetParameters = RequestParameters;

export interface FirewallRulesCreateOrUpdateBodyParam {
  /** Resource create parameters. */
  body: FirewallRule;
}

export type FirewallRulesCreateOrUpdateParameters =
  FirewallRulesCreateOrUpdateBodyParam & RequestParameters;
export type FirewallRulesDeleteParameters = RequestParameters;
export type FirewallRulesListByMongoClusterParameters = RequestParameters;
export type PrivateEndpointConnectionsListByMongoClusterParameters =
  RequestParameters;
export type PrivateEndpointConnectionsGetParameters = RequestParameters;

export interface PrivateEndpointConnectionsCreateBodyParam {
  /** Resource create parameters. */
  body: PrivateEndpointConnectionResource;
}

export type PrivateEndpointConnectionsCreateParameters =
  PrivateEndpointConnectionsCreateBodyParam & RequestParameters;
export type PrivateEndpointConnectionsDeleteParameters = RequestParameters;
export type PrivateLinksListByMongoClusterParameters = RequestParameters;
