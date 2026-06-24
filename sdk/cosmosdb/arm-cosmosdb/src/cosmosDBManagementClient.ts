// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CosmosDBManagementContext,
  CosmosDBManagementClientOptionalParams,
  createCosmosDBManagement,
} from "./api/index.js";
import {
  CassandraClustersOperations,
  _getCassandraClustersOperations,
} from "./classic/cassandraClusters/index.js";
import {
  CassandraDataCentersOperations,
  _getCassandraDataCentersOperations,
} from "./classic/cassandraDataCenters/index.js";
import {
  CassandraResourcesOperations,
  _getCassandraResourcesOperations,
} from "./classic/cassandraResources/index.js";
import { ChaosFaultOperations, _getChaosFaultOperations } from "./classic/chaosFault/index.js";
import { CollectionOperations, _getCollectionOperations } from "./classic/collection/index.js";
import {
  CollectionPartitionOperations,
  _getCollectionPartitionOperations,
} from "./classic/collectionPartition/index.js";
import {
  CollectionPartitionRegionOperations,
  _getCollectionPartitionRegionOperations,
} from "./classic/collectionPartitionRegion/index.js";
import {
  CollectionRegionOperations,
  _getCollectionRegionOperations,
} from "./classic/collectionRegion/index.js";
import { CopyJobsOperations, _getCopyJobsOperations } from "./classic/copyJobs/index.js";
import {
  DataTransferJobsOperations,
  _getDataTransferJobsOperations,
} from "./classic/dataTransferJobs/index.js";
import { DatabaseOperations, _getDatabaseOperations } from "./classic/database/index.js";
import {
  DatabaseAccountRegionOperations,
  _getDatabaseAccountRegionOperations,
} from "./classic/databaseAccountRegion/index.js";
import {
  DatabaseAccountsOperations,
  _getDatabaseAccountsOperations,
} from "./classic/databaseAccounts/index.js";
import { FleetOperations, _getFleetOperations } from "./classic/fleet/index.js";
import {
  FleetAnalyticsOperations,
  _getFleetAnalyticsOperations,
} from "./classic/fleetAnalytics/index.js";
import { FleetspaceOperations, _getFleetspaceOperations } from "./classic/fleetspace/index.js";
import {
  FleetspaceAccountOperations,
  _getFleetspaceAccountOperations,
} from "./classic/fleetspaceAccount/index.js";
import {
  GarnetClustersOperations,
  _getGarnetClustersOperations,
} from "./classic/garnetClusters/index.js";
import {
  GraphResourcesOperations,
  _getGraphResourcesOperations,
} from "./classic/graphResources/index.js";
import {
  GremlinResourcesOperations,
  _getGremlinResourcesOperations,
} from "./classic/gremlinResources/index.js";
import { LocationsOperations, _getLocationsOperations } from "./classic/locations/index.js";
import {
  MongoDBResourcesOperations,
  _getMongoDBResourcesOperations,
} from "./classic/mongoDBResources/index.js";
import {
  MongoMIResourcesOperations,
  _getMongoMIResourcesOperations,
} from "./classic/mongoMIResources/index.js";
import {
  NetworkSecurityPerimeterConfigurationsOperations,
  _getNetworkSecurityPerimeterConfigurationsOperations,
} from "./classic/networkSecurityPerimeterConfigurations/index.js";
import {
  NotebookWorkspacesOperations,
  _getNotebookWorkspacesOperations,
} from "./classic/notebookWorkspaces/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PartitionKeyRangeIdOperations,
  _getPartitionKeyRangeIdOperations,
} from "./classic/partitionKeyRangeId/index.js";
import {
  PartitionKeyRangeIdRegionOperations,
  _getPartitionKeyRangeIdRegionOperations,
} from "./classic/partitionKeyRangeIdRegion/index.js";
import { PercentileOperations, _getPercentileOperations } from "./classic/percentile/index.js";
import {
  PercentileSourceTargetOperations,
  _getPercentileSourceTargetOperations,
} from "./classic/percentileSourceTarget/index.js";
import {
  PercentileTargetOperations,
  _getPercentileTargetOperations,
} from "./classic/percentileTarget/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  RestorableDatabaseAccountsOperations,
  _getRestorableDatabaseAccountsOperations,
} from "./classic/restorableDatabaseAccounts/index.js";
import {
  RestorableGremlinDatabasesOperations,
  _getRestorableGremlinDatabasesOperations,
} from "./classic/restorableGremlinDatabases/index.js";
import {
  RestorableGremlinGraphsOperations,
  _getRestorableGremlinGraphsOperations,
} from "./classic/restorableGremlinGraphs/index.js";
import {
  RestorableGremlinResourcesOperations,
  _getRestorableGremlinResourcesOperations,
} from "./classic/restorableGremlinResources/index.js";
import {
  RestorableMongodbCollectionsOperations,
  _getRestorableMongodbCollectionsOperations,
} from "./classic/restorableMongodbCollections/index.js";
import {
  RestorableMongodbDatabasesOperations,
  _getRestorableMongodbDatabasesOperations,
} from "./classic/restorableMongodbDatabases/index.js";
import {
  RestorableMongodbResourcesOperations,
  _getRestorableMongodbResourcesOperations,
} from "./classic/restorableMongodbResources/index.js";
import {
  RestorableSqlContainersOperations,
  _getRestorableSqlContainersOperations,
} from "./classic/restorableSqlContainers/index.js";
import {
  RestorableSqlDatabasesOperations,
  _getRestorableSqlDatabasesOperations,
} from "./classic/restorableSqlDatabases/index.js";
import {
  RestorableSqlResourcesOperations,
  _getRestorableSqlResourcesOperations,
} from "./classic/restorableSqlResources/index.js";
import {
  RestorableTableResourcesOperations,
  _getRestorableTableResourcesOperations,
} from "./classic/restorableTableResources/index.js";
import {
  RestorableTablesOperations,
  _getRestorableTablesOperations,
} from "./classic/restorableTables/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import {
  SoftDeletedDatabaseAccountsOperations,
  _getSoftDeletedDatabaseAccountsOperations,
} from "./classic/softDeletedDatabaseAccounts/index.js";
import {
  SoftDeletedSqlContainersOperations,
  _getSoftDeletedSqlContainersOperations,
} from "./classic/softDeletedSqlContainers/index.js";
import {
  SoftDeletedSqlDatabasesOperations,
  _getSoftDeletedSqlDatabasesOperations,
} from "./classic/softDeletedSqlDatabases/index.js";
import {
  SqlResourcesOperations,
  _getSqlResourcesOperations,
} from "./classic/sqlResources/index.js";
import {
  TableResourcesOperations,
  _getTableResourcesOperations,
} from "./classic/tableResources/index.js";
import {
  ThroughputPoolOperations,
  _getThroughputPoolOperations,
} from "./classic/throughputPool/index.js";
import {
  ThroughputPoolAccountOperations,
  _getThroughputPoolAccountOperations,
} from "./classic/throughputPoolAccount/index.js";
import {
  ThroughputPoolAccountsOperations,
  _getThroughputPoolAccountsOperations,
} from "./classic/throughputPoolAccounts/index.js";
import {
  ThroughputPoolsOperations,
  _getThroughputPoolsOperations,
} from "./classic/throughputPools/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CosmosDBManagementClientOptionalParams } from "./api/cosmosDBManagementContext.js";

export class CosmosDBManagementClient {
  private _client: CosmosDBManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: CosmosDBManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: CosmosDBManagementClientOptionalParams,
  );
  /** Azure Cosmos DB Throughput Pool REST API */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | CosmosDBManagementClientOptionalParams,
    options?: CosmosDBManagementClientOptionalParams,
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
    this._client = createCosmosDBManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.fleetspaceAccount = _getFleetspaceAccountOperations(this._client);
    this.fleetspace = _getFleetspaceOperations(this._client);
    this.fleetAnalytics = _getFleetAnalyticsOperations(this._client);
    this.fleet = _getFleetOperations(this._client);
    this.mongoMIResources = _getMongoMIResourcesOperations(this._client);
    this.throughputPoolAccounts = _getThroughputPoolAccountsOperations(this._client);
    this.throughputPoolAccount = _getThroughputPoolAccountOperations(this._client);
    this.throughputPools = _getThroughputPoolsOperations(this._client);
    this.throughputPool = _getThroughputPoolOperations(this._client);
    this.service = _getServiceOperations(this._client);
    this.restorableTableResources = _getRestorableTableResourcesOperations(this._client);
    this.restorableTables = _getRestorableTablesOperations(this._client);
    this.restorableGremlinResources = _getRestorableGremlinResourcesOperations(this._client);
    this.restorableGremlinGraphs = _getRestorableGremlinGraphsOperations(this._client);
    this.restorableGremlinDatabases = _getRestorableGremlinDatabasesOperations(this._client);
    this.restorableMongodbResources = _getRestorableMongodbResourcesOperations(this._client);
    this.restorableMongodbCollections = _getRestorableMongodbCollectionsOperations(this._client);
    this.restorableMongodbDatabases = _getRestorableMongodbDatabasesOperations(this._client);
    this.restorableSqlResources = _getRestorableSqlResourcesOperations(this._client);
    this.restorableSqlContainers = _getRestorableSqlContainersOperations(this._client);
    this.restorableSqlDatabases = _getRestorableSqlDatabasesOperations(this._client);
    this.restorableDatabaseAccounts = _getRestorableDatabaseAccountsOperations(this._client);
    this.cassandraDataCenters = _getCassandraDataCentersOperations(this._client);
    this.cassandraClusters = _getCassandraClustersOperations(this._client);
    this.locations = _getLocationsOperations(this._client);
    this.partitionKeyRangeIdRegion = _getPartitionKeyRangeIdRegionOperations(this._client);
    this.partitionKeyRangeId = _getPartitionKeyRangeIdOperations(this._client);
    this.collectionPartition = _getCollectionPartitionOperations(this._client);
    this.collectionPartitionRegion = _getCollectionPartitionRegionOperations(this._client);
    this.percentile = _getPercentileOperations(this._client);
    this.percentileTarget = _getPercentileTargetOperations(this._client);
    this.percentileSourceTarget = _getPercentileSourceTargetOperations(this._client);
    this.databaseAccountRegion = _getDatabaseAccountRegionOperations(this._client);
    this.collectionRegion = _getCollectionRegionOperations(this._client);
    this.collection = _getCollectionOperations(this._client);
    this.database = _getDatabaseOperations(this._client);
    this.chaosFault = _getChaosFaultOperations(this._client);
    this.softDeletedSqlContainers = _getSoftDeletedSqlContainersOperations(this._client);
    this.softDeletedSqlDatabases = _getSoftDeletedSqlDatabasesOperations(this._client);
    this.softDeletedDatabaseAccounts = _getSoftDeletedDatabaseAccountsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.notebookWorkspaces = _getNotebookWorkspacesOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.garnetClusters = _getGarnetClustersOperations(this._client);
    this.dataTransferJobs = _getDataTransferJobsOperations(this._client);
    this.gremlinResources = _getGremlinResourcesOperations(this._client);
    this.cassandraResources = _getCassandraResourcesOperations(this._client);
    this.tableResources = _getTableResourcesOperations(this._client);
    this.mongoDBResources = _getMongoDBResourcesOperations(this._client);
    this.sqlResources = _getSqlResourcesOperations(this._client);
    this.graphResources = _getGraphResourcesOperations(this._client);
    this.copyJobs = _getCopyJobsOperations(this._client);
    this.databaseAccounts = _getDatabaseAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for fleetspaceAccount */
  public readonly fleetspaceAccount: FleetspaceAccountOperations;
  /** The operation groups for fleetspace */
  public readonly fleetspace: FleetspaceOperations;
  /** The operation groups for fleetAnalytics */
  public readonly fleetAnalytics: FleetAnalyticsOperations;
  /** The operation groups for fleet */
  public readonly fleet: FleetOperations;
  /** The operation groups for mongoMIResources */
  public readonly mongoMIResources: MongoMIResourcesOperations;
  /** The operation groups for throughputPoolAccounts */
  public readonly throughputPoolAccounts: ThroughputPoolAccountsOperations;
  /** The operation groups for throughputPoolAccount */
  public readonly throughputPoolAccount: ThroughputPoolAccountOperations;
  /** The operation groups for throughputPools */
  public readonly throughputPools: ThroughputPoolsOperations;
  /** The operation groups for throughputPool */
  public readonly throughputPool: ThroughputPoolOperations;
  /** The operation groups for service */
  public readonly service: ServiceOperations;
  /** The operation groups for restorableTableResources */
  public readonly restorableTableResources: RestorableTableResourcesOperations;
  /** The operation groups for restorableTables */
  public readonly restorableTables: RestorableTablesOperations;
  /** The operation groups for restorableGremlinResources */
  public readonly restorableGremlinResources: RestorableGremlinResourcesOperations;
  /** The operation groups for restorableGremlinGraphs */
  public readonly restorableGremlinGraphs: RestorableGremlinGraphsOperations;
  /** The operation groups for restorableGremlinDatabases */
  public readonly restorableGremlinDatabases: RestorableGremlinDatabasesOperations;
  /** The operation groups for restorableMongodbResources */
  public readonly restorableMongodbResources: RestorableMongodbResourcesOperations;
  /** The operation groups for restorableMongodbCollections */
  public readonly restorableMongodbCollections: RestorableMongodbCollectionsOperations;
  /** The operation groups for restorableMongodbDatabases */
  public readonly restorableMongodbDatabases: RestorableMongodbDatabasesOperations;
  /** The operation groups for restorableSqlResources */
  public readonly restorableSqlResources: RestorableSqlResourcesOperations;
  /** The operation groups for restorableSqlContainers */
  public readonly restorableSqlContainers: RestorableSqlContainersOperations;
  /** The operation groups for restorableSqlDatabases */
  public readonly restorableSqlDatabases: RestorableSqlDatabasesOperations;
  /** The operation groups for restorableDatabaseAccounts */
  public readonly restorableDatabaseAccounts: RestorableDatabaseAccountsOperations;
  /** The operation groups for cassandraDataCenters */
  public readonly cassandraDataCenters: CassandraDataCentersOperations;
  /** The operation groups for cassandraClusters */
  public readonly cassandraClusters: CassandraClustersOperations;
  /** The operation groups for locations */
  public readonly locations: LocationsOperations;
  /** The operation groups for partitionKeyRangeIdRegion */
  public readonly partitionKeyRangeIdRegion: PartitionKeyRangeIdRegionOperations;
  /** The operation groups for partitionKeyRangeId */
  public readonly partitionKeyRangeId: PartitionKeyRangeIdOperations;
  /** The operation groups for collectionPartition */
  public readonly collectionPartition: CollectionPartitionOperations;
  /** The operation groups for collectionPartitionRegion */
  public readonly collectionPartitionRegion: CollectionPartitionRegionOperations;
  /** The operation groups for percentile */
  public readonly percentile: PercentileOperations;
  /** The operation groups for percentileTarget */
  public readonly percentileTarget: PercentileTargetOperations;
  /** The operation groups for percentileSourceTarget */
  public readonly percentileSourceTarget: PercentileSourceTargetOperations;
  /** The operation groups for databaseAccountRegion */
  public readonly databaseAccountRegion: DatabaseAccountRegionOperations;
  /** The operation groups for collectionRegion */
  public readonly collectionRegion: CollectionRegionOperations;
  /** The operation groups for collection */
  public readonly collection: CollectionOperations;
  /** The operation groups for database */
  public readonly database: DatabaseOperations;
  /** The operation groups for chaosFault */
  public readonly chaosFault: ChaosFaultOperations;
  /** The operation groups for softDeletedSqlContainers */
  public readonly softDeletedSqlContainers: SoftDeletedSqlContainersOperations;
  /** The operation groups for softDeletedSqlDatabases */
  public readonly softDeletedSqlDatabases: SoftDeletedSqlDatabasesOperations;
  /** The operation groups for softDeletedDatabaseAccounts */
  public readonly softDeletedDatabaseAccounts: SoftDeletedDatabaseAccountsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for notebookWorkspaces */
  public readonly notebookWorkspaces: NotebookWorkspacesOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for garnetClusters */
  public readonly garnetClusters: GarnetClustersOperations;
  /** The operation groups for dataTransferJobs */
  public readonly dataTransferJobs: DataTransferJobsOperations;
  /** The operation groups for gremlinResources */
  public readonly gremlinResources: GremlinResourcesOperations;
  /** The operation groups for cassandraResources */
  public readonly cassandraResources: CassandraResourcesOperations;
  /** The operation groups for tableResources */
  public readonly tableResources: TableResourcesOperations;
  /** The operation groups for mongoDBResources */
  public readonly mongoDBResources: MongoDBResourcesOperations;
  /** The operation groups for sqlResources */
  public readonly sqlResources: SqlResourcesOperations;
  /** The operation groups for graphResources */
  public readonly graphResources: GraphResourcesOperations;
  /** The operation groups for copyJobs */
  public readonly copyJobs: CopyJobsOperations;
  /** The operation groups for databaseAccounts */
  public readonly databaseAccounts: DatabaseAccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
