// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext, KustoManagementClientOptionalParams } from "./api/index.js";
import { createKustoManagement } from "./api/index.js";
import type { AttachedDatabaseConfigurationsOperations } from "./classic/attachedDatabaseConfigurations/index.js";
import { _getAttachedDatabaseConfigurationsOperations } from "./classic/attachedDatabaseConfigurations/index.js";
import type { ClusterPrincipalAssignmentsOperations } from "./classic/clusterPrincipalAssignments/index.js";
import { _getClusterPrincipalAssignmentsOperations } from "./classic/clusterPrincipalAssignments/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { DataConnectionsOperations } from "./classic/dataConnections/index.js";
import { _getDataConnectionsOperations } from "./classic/dataConnections/index.js";
import type { DatabaseOperations } from "./classic/database/index.js";
import { _getDatabaseOperations } from "./classic/database/index.js";
import type { DatabasePrincipalAssignmentsOperations } from "./classic/databasePrincipalAssignments/index.js";
import { _getDatabasePrincipalAssignmentsOperations } from "./classic/databasePrincipalAssignments/index.js";
import type { DatabasesOperations } from "./classic/databases/index.js";
import { _getDatabasesOperations } from "./classic/databases/index.js";
import type { ManagedPrivateEndpointsOperations } from "./classic/managedPrivateEndpoints/index.js";
import { _getManagedPrivateEndpointsOperations } from "./classic/managedPrivateEndpoints/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OperationsResultsOperations } from "./classic/operationsResults/index.js";
import { _getOperationsResultsOperations } from "./classic/operationsResults/index.js";
import type { OperationsResultsLocationOperations } from "./classic/operationsResultsLocation/index.js";
import { _getOperationsResultsLocationOperations } from "./classic/operationsResultsLocation/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { SandboxCustomImagesOperations } from "./classic/sandboxCustomImages/index.js";
import { _getSandboxCustomImagesOperations } from "./classic/sandboxCustomImages/index.js";
import type { ScriptsOperations } from "./classic/scripts/index.js";
import { _getScriptsOperations } from "./classic/scripts/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { KustoManagementClientOptionalParams } from "./api/kustoManagementContext.js";

export class KustoManagementClient {
  private _client: KustoManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: KustoManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: KustoManagementClientOptionalParams,
  );
  /** The Azure Kusto management API provides a RESTful set of web services that interact with Azure Kusto services to manage your clusters and databases. The API enables you to create, update, and delete clusters and databases. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | KustoManagementClientOptionalParams,
    options?: KustoManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKustoManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationsResultsLocation = _getOperationsResultsLocationOperations(this._client);
    this.operationsResults = _getOperationsResultsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.database = _getDatabaseOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.sandboxCustomImages = _getSandboxCustomImagesOperations(this._client);
    this.managedPrivateEndpoints = _getManagedPrivateEndpointsOperations(this._client);
    this.attachedDatabaseConfigurations = _getAttachedDatabaseConfigurationsOperations(
      this._client,
    );
    this.databases = _getDatabasesOperations(this._client);
    this.dataConnections = _getDataConnectionsOperations(this._client);
    this.scripts = _getScriptsOperations(this._client);
    this.databasePrincipalAssignments = _getDatabasePrincipalAssignmentsOperations(this._client);
    this.clusterPrincipalAssignments = _getClusterPrincipalAssignmentsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for operationsResultsLocation */
  public readonly operationsResultsLocation: OperationsResultsLocationOperations;
  /** The operation groups for operationsResults */
  public readonly operationsResults: OperationsResultsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for database */
  public readonly database: DatabaseOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for sandboxCustomImages */
  public readonly sandboxCustomImages: SandboxCustomImagesOperations;
  /** The operation groups for managedPrivateEndpoints */
  public readonly managedPrivateEndpoints: ManagedPrivateEndpointsOperations;
  /** The operation groups for attachedDatabaseConfigurations */
  public readonly attachedDatabaseConfigurations: AttachedDatabaseConfigurationsOperations;
  /** The operation groups for databases */
  public readonly databases: DatabasesOperations;
  /** The operation groups for dataConnections */
  public readonly dataConnections: DataConnectionsOperations;
  /** The operation groups for scripts */
  public readonly scripts: ScriptsOperations;
  /** The operation groups for databasePrincipalAssignments */
  public readonly databasePrincipalAssignments: DatabasePrincipalAssignmentsOperations;
  /** The operation groups for clusterPrincipalAssignments */
  public readonly clusterPrincipalAssignments: ClusterPrincipalAssignmentsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
