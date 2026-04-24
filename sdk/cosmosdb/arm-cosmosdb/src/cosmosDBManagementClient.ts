// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CosmosDBManagementContext,
  CosmosDBManagementClientOptionalParams,
} from "./api/index.js";
import { createCosmosDBManagement } from "./api/index.js";
import type { CassandraClustersOperations } from "./classic/cassandraClusters/index.js";
import { _getCassandraClustersOperations } from "./classic/cassandraClusters/index.js";
import type { CassandraDataCentersOperations } from "./classic/cassandraDataCenters/index.js";
import { _getCassandraDataCentersOperations } from "./classic/cassandraDataCenters/index.js";
import type { CassandraResourcesOperations } from "./classic/cassandraResources/index.js";
import { _getCassandraResourcesOperations } from "./classic/cassandraResources/index.js";
import type { ChaosFaultOperations } from "./classic/chaosFault/index.js";
import { _getChaosFaultOperations } from "./classic/chaosFault/index.js";
import type { CollectionOperations } from "./classic/collection/index.js";
import { _getCollectionOperations } from "./classic/collection/index.js";
import type { CollectionPartitionOperations } from "./classic/collectionPartition/index.js";
import { _getCollectionPartitionOperations } from "./classic/collectionPartition/index.js";
import type { CollectionPartitionRegionOperations } from "./classic/collectionPartitionRegion/index.js";
import { _getCollectionPartitionRegionOperations } from "./classic/collectionPartitionRegion/index.js";
import type { CollectionRegionOperations } from "./classic/collectionRegion/index.js";
import { _getCollectionRegionOperations } from "./classic/collectionRegion/index.js";
import type { CopyJobsOperations } from "./classic/copyJobs/index.js";
import { _getCopyJobsOperations } from "./classic/copyJobs/index.js";
import type { DataTransferJobsOperations } from "./classic/dataTransferJobs/index.js";
import { _getDataTransferJobsOperations } from "./classic/dataTransferJobs/index.js";
import type { DatabaseOperations } from "./classic/database/index.js";
import { _getDatabaseOperations } from "./classic/database/index.js";
import type { DatabaseAccountRegionOperations } from "./classic/databaseAccountRegion/index.js";
import { _getDatabaseAccountRegionOperations } from "./classic/databaseAccountRegion/index.js";
import type { DatabaseAccountsOperations } from "./classic/databaseAccounts/index.js";
import { _getDatabaseAccountsOperations } from "./classic/databaseAccounts/index.js";
import type { FleetOperations } from "./classic/fleet/index.js";
import { _getFleetOperations } from "./classic/fleet/index.js";
import type { FleetAnalyticsOperations } from "./classic/fleetAnalytics/index.js";
import { _getFleetAnalyticsOperations } from "./classic/fleetAnalytics/index.js";
import type { FleetspaceOperations } from "./classic/fleetspace/index.js";
import { _getFleetspaceOperations } from "./classic/fleetspace/index.js";
import type { FleetspaceAccountOperations } from "./classic/fleetspaceAccount/index.js";
import { _getFleetspaceAccountOperations } from "./classic/fleetspaceAccount/index.js";
import type { GarnetClustersOperations } from "./classic/garnetClusters/index.js";
import { _getGarnetClustersOperations } from "./classic/garnetClusters/index.js";
import type { GraphResourcesOperations } from "./classic/graphResources/index.js";
import { _getGraphResourcesOperations } from "./classic/graphResources/index.js";
import type { GremlinResourcesOperations } from "./classic/gremlinResources/index.js";
import { _getGremlinResourcesOperations } from "./classic/gremlinResources/index.js";
import type { LocationsOperations } from "./classic/locations/index.js";
import { _getLocationsOperations } from "./classic/locations/index.js";
import type { MongoDBResourcesOperations } from "./classic/mongoDBResources/index.js";
import { _getMongoDBResourcesOperations } from "./classic/mongoDBResources/index.js";
import type { MongoMIResourcesOperations } from "./classic/mongoMIResources/index.js";
import { _getMongoMIResourcesOperations } from "./classic/mongoMIResources/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { NotebookWorkspacesOperations } from "./classic/notebookWorkspaces/index.js";
import { _getNotebookWorkspacesOperations } from "./classic/notebookWorkspaces/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PartitionKeyRangeIdOperations } from "./classic/partitionKeyRangeId/index.js";
import { _getPartitionKeyRangeIdOperations } from "./classic/partitionKeyRangeId/index.js";
import type { PartitionKeyRangeIdRegionOperations } from "./classic/partitionKeyRangeIdRegion/index.js";
import { _getPartitionKeyRangeIdRegionOperations } from "./classic/partitionKeyRangeIdRegion/index.js";
import type { PercentileOperations } from "./classic/percentile/index.js";
import { _getPercentileOperations } from "./classic/percentile/index.js";
import type { PercentileSourceTargetOperations } from "./classic/percentileSourceTarget/index.js";
import { _getPercentileSourceTargetOperations } from "./classic/percentileSourceTarget/index.js";
import type { PercentileTargetOperations } from "./classic/percentileTarget/index.js";
import { _getPercentileTargetOperations } from "./classic/percentileTarget/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { RestorableDatabaseAccountsOperations } from "./classic/restorableDatabaseAccounts/index.js";
import { _getRestorableDatabaseAccountsOperations } from "./classic/restorableDatabaseAccounts/index.js";
import type { RestorableGremlinDatabasesOperations } from "./classic/restorableGremlinDatabases/index.js";
import { _getRestorableGremlinDatabasesOperations } from "./classic/restorableGremlinDatabases/index.js";
import type { RestorableGremlinGraphsOperations } from "./classic/restorableGremlinGraphs/index.js";
import { _getRestorableGremlinGraphsOperations } from "./classic/restorableGremlinGraphs/index.js";
import type { RestorableGremlinResourcesOperations } from "./classic/restorableGremlinResources/index.js";
import { _getRestorableGremlinResourcesOperations } from "./classic/restorableGremlinResources/index.js";
import type { RestorableMongodbCollectionsOperations } from "./classic/restorableMongodbCollections/index.js";
import { _getRestorableMongodbCollectionsOperations } from "./classic/restorableMongodbCollections/index.js";
import type { RestorableMongodbDatabasesOperations } from "./classic/restorableMongodbDatabases/index.js";
import { _getRestorableMongodbDatabasesOperations } from "./classic/restorableMongodbDatabases/index.js";
import type { RestorableMongodbResourcesOperations } from "./classic/restorableMongodbResources/index.js";
import { _getRestorableMongodbResourcesOperations } from "./classic/restorableMongodbResources/index.js";
import type { RestorableSqlContainersOperations } from "./classic/restorableSqlContainers/index.js";
import { _getRestorableSqlContainersOperations } from "./classic/restorableSqlContainers/index.js";
import type { RestorableSqlDatabasesOperations } from "./classic/restorableSqlDatabases/index.js";
import { _getRestorableSqlDatabasesOperations } from "./classic/restorableSqlDatabases/index.js";
import type { RestorableSqlResourcesOperations } from "./classic/restorableSqlResources/index.js";
import { _getRestorableSqlResourcesOperations } from "./classic/restorableSqlResources/index.js";
import type { RestorableTableResourcesOperations } from "./classic/restorableTableResources/index.js";
import { _getRestorableTableResourcesOperations } from "./classic/restorableTableResources/index.js";
import type { RestorableTablesOperations } from "./classic/restorableTables/index.js";
import { _getRestorableTablesOperations } from "./classic/restorableTables/index.js";
import type { ServiceOperations } from "./classic/service/index.js";
import { _getServiceOperations } from "./classic/service/index.js";
import type { SqlResourcesOperations } from "./classic/sqlResources/index.js";
import { _getSqlResourcesOperations } from "./classic/sqlResources/index.js";
import type { TableResourcesOperations } from "./classic/tableResources/index.js";
import { _getTableResourcesOperations } from "./classic/tableResources/index.js";
import type { ThroughputPoolOperations } from "./classic/throughputPool/index.js";
import { _getThroughputPoolOperations } from "./classic/throughputPool/index.js";
import type { ThroughputPoolAccountOperations } from "./classic/throughputPoolAccount/index.js";
import { _getThroughputPoolAccountOperations } from "./classic/throughputPoolAccount/index.js";
import type { ThroughputPoolAccountsOperations } from "./classic/throughputPoolAccounts/index.js";
import { _getThroughputPoolAccountsOperations } from "./classic/throughputPoolAccounts/index.js";
import type { ThroughputPoolsOperations } from "./classic/throughputPools/index.js";
import { _getThroughputPoolsOperations } from "./classic/throughputPools/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
