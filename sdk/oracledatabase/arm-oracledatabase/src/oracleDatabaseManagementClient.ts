// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OracleDatabaseManagementContext,
  OracleDatabaseManagementClientOptionalParams,
} from "./api/index.js";
import { createOracleDatabaseManagement } from "./api/index.js";
import type { AutonomousDatabaseBackupsOperations } from "./classic/autonomousDatabaseBackups/index.js";
import { _getAutonomousDatabaseBackupsOperations } from "./classic/autonomousDatabaseBackups/index.js";
import type { AutonomousDatabaseCharacterSetsOperations } from "./classic/autonomousDatabaseCharacterSets/index.js";
import { _getAutonomousDatabaseCharacterSetsOperations } from "./classic/autonomousDatabaseCharacterSets/index.js";
import type { AutonomousDatabaseNationalCharacterSetsOperations } from "./classic/autonomousDatabaseNationalCharacterSets/index.js";
import { _getAutonomousDatabaseNationalCharacterSetsOperations } from "./classic/autonomousDatabaseNationalCharacterSets/index.js";
import type { AutonomousDatabaseVersionsOperations } from "./classic/autonomousDatabaseVersions/index.js";
import { _getAutonomousDatabaseVersionsOperations } from "./classic/autonomousDatabaseVersions/index.js";
import type { AutonomousDatabasesOperations } from "./classic/autonomousDatabases/index.js";
import { _getAutonomousDatabasesOperations } from "./classic/autonomousDatabases/index.js";
import type { CloudExadataInfrastructuresOperations } from "./classic/cloudExadataInfrastructures/index.js";
import { _getCloudExadataInfrastructuresOperations } from "./classic/cloudExadataInfrastructures/index.js";
import type { CloudVmClustersOperations } from "./classic/cloudVmClusters/index.js";
import { _getCloudVmClustersOperations } from "./classic/cloudVmClusters/index.js";
import type { DbNodesOperations } from "./classic/dbNodes/index.js";
import { _getDbNodesOperations } from "./classic/dbNodes/index.js";
import type { DbServersOperations } from "./classic/dbServers/index.js";
import { _getDbServersOperations } from "./classic/dbServers/index.js";
import type { DbSystemShapesOperations } from "./classic/dbSystemShapes/index.js";
import { _getDbSystemShapesOperations } from "./classic/dbSystemShapes/index.js";
import type { DbSystemsOperations } from "./classic/dbSystems/index.js";
import { _getDbSystemsOperations } from "./classic/dbSystems/index.js";
import type { DbVersionsOperations } from "./classic/dbVersions/index.js";
import { _getDbVersionsOperations } from "./classic/dbVersions/index.js";
import type { DnsPrivateViewsOperations } from "./classic/dnsPrivateViews/index.js";
import { _getDnsPrivateViewsOperations } from "./classic/dnsPrivateViews/index.js";
import type { DnsPrivateZonesOperations } from "./classic/dnsPrivateZones/index.js";
import { _getDnsPrivateZonesOperations } from "./classic/dnsPrivateZones/index.js";
import type { ExadbVmClustersOperations } from "./classic/exadbVmClusters/index.js";
import { _getExadbVmClustersOperations } from "./classic/exadbVmClusters/index.js";
import type { ExascaleDbNodesOperations } from "./classic/exascaleDbNodes/index.js";
import { _getExascaleDbNodesOperations } from "./classic/exascaleDbNodes/index.js";
import type { ExascaleDbStorageVaultsOperations } from "./classic/exascaleDbStorageVaults/index.js";
import { _getExascaleDbStorageVaultsOperations } from "./classic/exascaleDbStorageVaults/index.js";
import type { FlexComponentsOperations } from "./classic/flexComponents/index.js";
import { _getFlexComponentsOperations } from "./classic/flexComponents/index.js";
import type { GiMinorVersionsOperations } from "./classic/giMinorVersions/index.js";
import { _getGiMinorVersionsOperations } from "./classic/giMinorVersions/index.js";
import type { GiVersionsOperations } from "./classic/giVersions/index.js";
import { _getGiVersionsOperations } from "./classic/giVersions/index.js";
import type { NetworkAnchorsOperations } from "./classic/networkAnchors/index.js";
import { _getNetworkAnchorsOperations } from "./classic/networkAnchors/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OracleSubscriptionsOperations } from "./classic/oracleSubscriptions/index.js";
import { _getOracleSubscriptionsOperations } from "./classic/oracleSubscriptions/index.js";
import type { ResourceAnchorsOperations } from "./classic/resourceAnchors/index.js";
import { _getResourceAnchorsOperations } from "./classic/resourceAnchors/index.js";
import type { SystemVersionsOperations } from "./classic/systemVersions/index.js";
import { _getSystemVersionsOperations } from "./classic/systemVersions/index.js";
import type { VirtualNetworkAddressesOperations } from "./classic/virtualNetworkAddresses/index.js";
import { _getVirtualNetworkAddressesOperations } from "./classic/virtualNetworkAddresses/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { OracleDatabaseManagementClientOptionalParams } from "./api/oracleDatabaseManagementContext.js";

export class OracleDatabaseManagementClient {
  private _client: OracleDatabaseManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: OracleDatabaseManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createOracleDatabaseManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.dbVersions = _getDbVersionsOperations(this._client);
    this.dbSystems = _getDbSystemsOperations(this._client);
    this.resourceAnchors = _getResourceAnchorsOperations(this._client);
    this.networkAnchors = _getNetworkAnchorsOperations(this._client);
    this.exascaleDbStorageVaults = _getExascaleDbStorageVaultsOperations(this._client);
    this.exascaleDbNodes = _getExascaleDbNodesOperations(this._client);
    this.exadbVmClusters = _getExadbVmClustersOperations(this._client);
    this.autonomousDatabaseVersions = _getAutonomousDatabaseVersionsOperations(this._client);
    this.autonomousDatabaseNationalCharacterSets =
      _getAutonomousDatabaseNationalCharacterSetsOperations(this._client);
    this.autonomousDatabaseCharacterSets = _getAutonomousDatabaseCharacterSetsOperations(
      this._client,
    );
    this.autonomousDatabaseBackups = _getAutonomousDatabaseBackupsOperations(this._client);
    this.autonomousDatabases = _getAutonomousDatabasesOperations(this._client);
    this.flexComponents = _getFlexComponentsOperations(this._client);
    this.dnsPrivateZones = _getDnsPrivateZonesOperations(this._client);
    this.dnsPrivateViews = _getDnsPrivateViewsOperations(this._client);
    this.dbSystemShapes = _getDbSystemShapesOperations(this._client);
    this.giMinorVersions = _getGiMinorVersionsOperations(this._client);
    this.giVersions = _getGiVersionsOperations(this._client);
    this.dbNodes = _getDbNodesOperations(this._client);
    this.oracleSubscriptions = _getOracleSubscriptionsOperations(this._client);
    this.systemVersions = _getSystemVersionsOperations(this._client);
    this.virtualNetworkAddresses = _getVirtualNetworkAddressesOperations(this._client);
    this.cloudVmClusters = _getCloudVmClustersOperations(this._client);
    this.dbServers = _getDbServersOperations(this._client);
    this.cloudExadataInfrastructures = _getCloudExadataInfrastructuresOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for dbVersions */
  public readonly dbVersions: DbVersionsOperations;
  /** The operation groups for dbSystems */
  public readonly dbSystems: DbSystemsOperations;
  /** The operation groups for resourceAnchors */
  public readonly resourceAnchors: ResourceAnchorsOperations;
  /** The operation groups for networkAnchors */
  public readonly networkAnchors: NetworkAnchorsOperations;
  /** The operation groups for exascaleDbStorageVaults */
  public readonly exascaleDbStorageVaults: ExascaleDbStorageVaultsOperations;
  /** The operation groups for exascaleDbNodes */
  public readonly exascaleDbNodes: ExascaleDbNodesOperations;
  /** The operation groups for exadbVmClusters */
  public readonly exadbVmClusters: ExadbVmClustersOperations;
  /** The operation groups for autonomousDatabaseVersions */
  public readonly autonomousDatabaseVersions: AutonomousDatabaseVersionsOperations;
  /** The operation groups for autonomousDatabaseNationalCharacterSets */
  public readonly autonomousDatabaseNationalCharacterSets: AutonomousDatabaseNationalCharacterSetsOperations;
  /** The operation groups for autonomousDatabaseCharacterSets */
  public readonly autonomousDatabaseCharacterSets: AutonomousDatabaseCharacterSetsOperations;
  /** The operation groups for autonomousDatabaseBackups */
  public readonly autonomousDatabaseBackups: AutonomousDatabaseBackupsOperations;
  /** The operation groups for autonomousDatabases */
  public readonly autonomousDatabases: AutonomousDatabasesOperations;
  /** The operation groups for flexComponents */
  public readonly flexComponents: FlexComponentsOperations;
  /** The operation groups for dnsPrivateZones */
  public readonly dnsPrivateZones: DnsPrivateZonesOperations;
  /** The operation groups for dnsPrivateViews */
  public readonly dnsPrivateViews: DnsPrivateViewsOperations;
  /** The operation groups for dbSystemShapes */
  public readonly dbSystemShapes: DbSystemShapesOperations;
  /** The operation groups for giMinorVersions */
  public readonly giMinorVersions: GiMinorVersionsOperations;
  /** The operation groups for giVersions */
  public readonly giVersions: GiVersionsOperations;
  /** The operation groups for dbNodes */
  public readonly dbNodes: DbNodesOperations;
  /** The operation groups for oracleSubscriptions */
  public readonly oracleSubscriptions: OracleSubscriptionsOperations;
  /** The operation groups for systemVersions */
  public readonly systemVersions: SystemVersionsOperations;
  /** The operation groups for virtualNetworkAddresses */
  public readonly virtualNetworkAddresses: VirtualNetworkAddressesOperations;
  /** The operation groups for cloudVmClusters */
  public readonly cloudVmClusters: CloudVmClustersOperations;
  /** The operation groups for dbServers */
  public readonly dbServers: DbServersOperations;
  /** The operation groups for cloudExadataInfrastructures */
  public readonly cloudExadataInfrastructures: CloudExadataInfrastructuresOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
