// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  MongoClustersGetParameters,
  MongoClustersCreateOrUpdateParameters,
  MongoClustersUpdateParameters,
  MongoClustersDeleteParameters,
  MongoClustersListByResourceGroupParameters,
  MongoClustersListParameters,
  MongoClustersListConnectionStringsParameters,
  MongoClustersCheckNameAvailabilityParameters,
  FirewallRulesGetParameters,
  FirewallRulesCreateOrUpdateParameters,
  FirewallRulesDeleteParameters,
  FirewallRulesListByMongoClusterParameters,
  PrivateEndpointConnectionsListByMongoClusterParameters,
  PrivateEndpointConnectionsGetParameters,
  PrivateEndpointConnectionsCreateParameters,
  PrivateEndpointConnectionsDeleteParameters,
  PrivateLinksListByMongoClusterParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  MongoClustersGet200Response,
  MongoClustersGetDefaultResponse,
  MongoClustersCreateOrUpdate200Response,
  MongoClustersCreateOrUpdate201Response,
  MongoClustersCreateOrUpdateDefaultResponse,
  MongoClustersUpdate200Response,
  MongoClustersUpdate202Response,
  MongoClustersUpdateDefaultResponse,
  MongoClustersDelete202Response,
  MongoClustersDelete204Response,
  MongoClustersDeleteDefaultResponse,
  MongoClustersListByResourceGroup200Response,
  MongoClustersListByResourceGroupDefaultResponse,
  MongoClustersList200Response,
  MongoClustersListDefaultResponse,
  MongoClustersListConnectionStrings200Response,
  MongoClustersListConnectionStringsDefaultResponse,
  MongoClustersCheckNameAvailability200Response,
  MongoClustersCheckNameAvailabilityDefaultResponse,
  FirewallRulesGet200Response,
  FirewallRulesGetDefaultResponse,
  FirewallRulesCreateOrUpdate200Response,
  FirewallRulesCreateOrUpdate201Response,
  FirewallRulesCreateOrUpdate202Response,
  FirewallRulesCreateOrUpdateDefaultResponse,
  FirewallRulesDelete202Response,
  FirewallRulesDelete204Response,
  FirewallRulesDeleteDefaultResponse,
  FirewallRulesListByMongoCluster200Response,
  FirewallRulesListByMongoClusterDefaultResponse,
  PrivateEndpointConnectionsListByMongoCluster200Response,
  PrivateEndpointConnectionsListByMongoClusterDefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreate202Response,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateLinksListByMongoCluster200Response,
  PrivateLinksListByMongoClusterDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<
    OperationsList200Response | OperationsListDefaultResponse
  >;
}

export interface MongoClustersGet {
  /** Gets information about a mongo cluster. */
  get(
    options?: MongoClustersGetParameters,
  ): StreamableMethod<
    MongoClustersGet200Response | MongoClustersGetDefaultResponse
  >;
  /** Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. */
  put(
    options: MongoClustersCreateOrUpdateParameters,
  ): StreamableMethod<
    | MongoClustersCreateOrUpdate200Response
    | MongoClustersCreateOrUpdate201Response
    | MongoClustersCreateOrUpdateDefaultResponse
  >;
  /** Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. */
  patch(
    options: MongoClustersUpdateParameters,
  ): StreamableMethod<
    | MongoClustersUpdate200Response
    | MongoClustersUpdate202Response
    | MongoClustersUpdateDefaultResponse
  >;
  /** Deletes a mongo cluster. */
  delete(
    options?: MongoClustersDeleteParameters,
  ): StreamableMethod<
    | MongoClustersDelete202Response
    | MongoClustersDelete204Response
    | MongoClustersDeleteDefaultResponse
  >;
}

export interface MongoClustersListByResourceGroup {
  /** List all the mongo clusters in a given resource group. */
  get(
    options?: MongoClustersListByResourceGroupParameters,
  ): StreamableMethod<
    | MongoClustersListByResourceGroup200Response
    | MongoClustersListByResourceGroupDefaultResponse
  >;
}

export interface MongoClustersList {
  /** List all the mongo clusters in a given subscription. */
  get(
    options?: MongoClustersListParameters,
  ): StreamableMethod<
    MongoClustersList200Response | MongoClustersListDefaultResponse
  >;
}

export interface MongoClustersListConnectionStrings {
  /** List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. */
  post(
    options: MongoClustersListConnectionStringsParameters,
  ): StreamableMethod<
    | MongoClustersListConnectionStrings200Response
    | MongoClustersListConnectionStringsDefaultResponse
  >;
}

export interface MongoClustersCheckNameAvailability {
  /** Check if mongo cluster name is available for use. */
  post(
    options: MongoClustersCheckNameAvailabilityParameters,
  ): StreamableMethod<
    | MongoClustersCheckNameAvailability200Response
    | MongoClustersCheckNameAvailabilityDefaultResponse
  >;
}

export interface FirewallRulesGet {
  /** Gets information about a mongo cluster firewall rule. */
  get(
    options?: FirewallRulesGetParameters,
  ): StreamableMethod<
    FirewallRulesGet200Response | FirewallRulesGetDefaultResponse
  >;
  /** Creates a new firewall rule or updates an existing firewall rule on a mongo cluster. */
  put(
    options: FirewallRulesCreateOrUpdateParameters,
  ): StreamableMethod<
    | FirewallRulesCreateOrUpdate200Response
    | FirewallRulesCreateOrUpdate201Response
    | FirewallRulesCreateOrUpdate202Response
    | FirewallRulesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a mongo cluster firewall rule. */
  delete(
    options?: FirewallRulesDeleteParameters,
  ): StreamableMethod<
    | FirewallRulesDelete202Response
    | FirewallRulesDelete204Response
    | FirewallRulesDeleteDefaultResponse
  >;
}

export interface FirewallRulesListByMongoCluster {
  /** List all the firewall rules in a given mongo cluster. */
  get(
    options?: FirewallRulesListByMongoClusterParameters,
  ): StreamableMethod<
    | FirewallRulesListByMongoCluster200Response
    | FirewallRulesListByMongoClusterDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsListByMongoCluster {
  /** List existing private connections */
  get(
    options?: PrivateEndpointConnectionsListByMongoClusterParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsListByMongoCluster200Response
    | PrivateEndpointConnectionsListByMongoClusterDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsGet {
  /** Get a specific private connection */
  get(
    options?: PrivateEndpointConnectionsGetParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetDefaultResponse
  >;
  /** Create a Private endpoint connection */
  put(
    options: PrivateEndpointConnectionsCreateParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreate202Response
    | PrivateEndpointConnectionsCreateDefaultResponse
  >;
  /** Delete the private endpoint connection */
  delete(
    options?: PrivateEndpointConnectionsDeleteParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse
  >;
}

export interface PrivateLinksListByMongoCluster {
  /** list private links on the given resource */
  get(
    options?: PrivateLinksListByMongoClusterParameters,
  ): StreamableMethod<
    | PrivateLinksListByMongoCluster200Response
    | PrivateLinksListByMongoClusterDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.DocumentDB/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.DocumentDB/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
  ): MongoClustersGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters",
    subscriptionId: string,
    resourceGroupName: string,
  ): MongoClustersListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.DocumentDB/mongoClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/mongoClusters",
    subscriptionId: string,
  ): MongoClustersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/listConnectionStrings' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/listConnectionStrings",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
  ): MongoClustersListConnectionStrings;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.DocumentDB/locations/\{location\}/checkMongoClusterNameAvailability' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/checkMongoClusterNameAvailability",
    subscriptionId: string,
    location: string,
  ): MongoClustersCheckNameAvailability;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/firewallRules/\{firewallRuleName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
  ): FirewallRulesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/firewallRules' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
  ): FirewallRulesListByMongoCluster;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/privateEndpointConnections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
  ): PrivateEndpointConnectionsListByMongoCluster;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/privateEndpointConnections/\{privateEndpointConnectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    privateEndpointConnectionName: string,
  ): PrivateEndpointConnectionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.DocumentDB/mongoClusters/\{mongoClusterName\}/privateLinkResources' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources",
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
  ): PrivateLinksListByMongoCluster;
}

export type DocumentDBContext = Client & {
  path: Routes;
};
