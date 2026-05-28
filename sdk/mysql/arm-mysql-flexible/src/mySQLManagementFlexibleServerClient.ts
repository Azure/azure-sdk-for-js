// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MySQLManagementFlexibleServerContext,
  MySQLManagementFlexibleServerClientOptionalParams,
  createMySQLManagementFlexibleServer,
} from "./api/index.js";
import {
  AdvancedThreatProtectionSettingsOperations,
  _getAdvancedThreatProtectionSettingsOperations,
} from "./classic/advancedThreatProtectionSettings/index.js";
import {
  AzureADAdministratorsOperations,
  _getAzureADAdministratorsOperations,
} from "./classic/azureADAdministrators/index.js";
import {
  BackupAndExportOperations,
  _getBackupAndExportOperations,
} from "./classic/backupAndExport/index.js";
import { BackupsOperations, _getBackupsOperations } from "./classic/backups/index.js";
import {
  CheckNameAvailabilityOperations,
  _getCheckNameAvailabilityOperations,
} from "./classic/checkNameAvailability/index.js";
import {
  CheckNameAvailabilityWithoutLocationOperations,
  _getCheckNameAvailabilityWithoutLocationOperations,
} from "./classic/checkNameAvailabilityWithoutLocation/index.js";
import {
  CheckVirtualNetworkSubnetUsageOperations,
  _getCheckVirtualNetworkSubnetUsageOperations,
} from "./classic/checkVirtualNetworkSubnetUsage/index.js";
import {
  ConfigurationsOperations,
  _getConfigurationsOperations,
} from "./classic/configurations/index.js";
import { DatabasesOperations, _getDatabasesOperations } from "./classic/databases/index.js";
import {
  FirewallRulesOperations,
  _getFirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import {
  GetPrivateDnsZoneSuffixOperations,
  _getGetPrivateDnsZoneSuffixOperations,
} from "./classic/getPrivateDnsZoneSuffix/index.js";
import {
  LocationBasedCapabilitiesOperations,
  _getLocationBasedCapabilitiesOperations,
} from "./classic/locationBasedCapabilities/index.js";
import {
  LocationBasedCapabilitySetOperations,
  _getLocationBasedCapabilitySetOperations,
} from "./classic/locationBasedCapabilitySet/index.js";
import { LogFilesOperations, _getLogFilesOperations } from "./classic/logFiles/index.js";
import {
  LongRunningBackupOperations,
  _getLongRunningBackupOperations,
} from "./classic/longRunningBackup/index.js";
import {
  LongRunningBackupsOperations,
  _getLongRunningBackupsOperations,
} from "./classic/longRunningBackups/index.js";
import {
  MaintenancesOperations,
  _getMaintenancesOperations,
} from "./classic/maintenances/index.js";
import {
  OperationProgressOperations,
  _getOperationProgressOperations,
} from "./classic/operationProgress/index.js";
import {
  OperationResultsOperations,
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { ReplicasOperations, _getReplicasOperations } from "./classic/replicas/index.js";
import { ServersOperations, _getServersOperations } from "./classic/servers/index.js";
import {
  ServersMigrationOperations,
  _getServersMigrationOperations,
} from "./classic/serversMigration/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MySQLManagementFlexibleServerClientOptionalParams } from "./api/mySQLManagementFlexibleServerContext.js";

export class MySQLManagementFlexibleServerClient {
  private _client: MySQLManagementFlexibleServerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: MySQLManagementFlexibleServerClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MySQLManagementFlexibleServerClientOptionalParams,
  );
  /** The Microsoft Azure management API provides create, read, update, and delete functionality for Azure MySQL resources including servers, databases, firewall rules, VNET rules, log files and configurations with new business model. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MySQLManagementFlexibleServerClientOptionalParams,
    options?: MySQLManagementFlexibleServerClientOptionalParams,
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
    this._client = createMySQLManagementFlexibleServer(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.replicas = _getReplicasOperations(this._client);
    this.getPrivateDnsZoneSuffix = _getGetPrivateDnsZoneSuffixOperations(this._client);
    this.operationProgress = _getOperationProgressOperations(this._client);
    this.operationResults = _getOperationResultsOperations(this._client);
    this.checkNameAvailabilityWithoutLocation = _getCheckNameAvailabilityWithoutLocationOperations(
      this._client,
    );
    this.checkNameAvailability = _getCheckNameAvailabilityOperations(this._client);
    this.checkVirtualNetworkSubnetUsage = _getCheckVirtualNetworkSubnetUsageOperations(
      this._client,
    );
    this.locationBasedCapabilities = _getLocationBasedCapabilitiesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.maintenances = _getMaintenancesOperations(this._client);
    this.locationBasedCapabilitySet = _getLocationBasedCapabilitySetOperations(this._client);
    this.advancedThreatProtectionSettings = _getAdvancedThreatProtectionSettingsOperations(
      this._client,
    );
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.databases = _getDatabasesOperations(this._client);
    this.configurations = _getConfigurationsOperations(this._client);
    this.longRunningBackup = _getLongRunningBackupOperations(this._client);
    this.longRunningBackups = _getLongRunningBackupsOperations(this._client);
    this.backups = _getBackupsOperations(this._client);
    this.serversMigration = _getServersMigrationOperations(this._client);
    this.logFiles = _getLogFilesOperations(this._client);
    this.backupAndExport = _getBackupAndExportOperations(this._client);
    this.servers = _getServersOperations(this._client);
    this.azureADAdministrators = _getAzureADAdministratorsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for replicas */
  public readonly replicas: ReplicasOperations;
  /** The operation groups for getPrivateDnsZoneSuffix */
  public readonly getPrivateDnsZoneSuffix: GetPrivateDnsZoneSuffixOperations;
  /** The operation groups for operationProgress */
  public readonly operationProgress: OperationProgressOperations;
  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for checkNameAvailabilityWithoutLocation */
  public readonly checkNameAvailabilityWithoutLocation: CheckNameAvailabilityWithoutLocationOperations;
  /** The operation groups for checkNameAvailability */
  public readonly checkNameAvailability: CheckNameAvailabilityOperations;
  /** The operation groups for checkVirtualNetworkSubnetUsage */
  public readonly checkVirtualNetworkSubnetUsage: CheckVirtualNetworkSubnetUsageOperations;
  /** The operation groups for locationBasedCapabilities */
  public readonly locationBasedCapabilities: LocationBasedCapabilitiesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for maintenances */
  public readonly maintenances: MaintenancesOperations;
  /** The operation groups for locationBasedCapabilitySet */
  public readonly locationBasedCapabilitySet: LocationBasedCapabilitySetOperations;
  /** The operation groups for advancedThreatProtectionSettings */
  public readonly advancedThreatProtectionSettings: AdvancedThreatProtectionSettingsOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for databases */
  public readonly databases: DatabasesOperations;
  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for longRunningBackup */
  public readonly longRunningBackup: LongRunningBackupOperations;
  /** The operation groups for longRunningBackups */
  public readonly longRunningBackups: LongRunningBackupsOperations;
  /** The operation groups for backups */
  public readonly backups: BackupsOperations;
  /** The operation groups for serversMigration */
  public readonly serversMigration: ServersMigrationOperations;
  /** The operation groups for logFiles */
  public readonly logFiles: LogFilesOperations;
  /** The operation groups for backupAndExport */
  public readonly backupAndExport: BackupAndExportOperations;
  /** The operation groups for servers */
  public readonly servers: ServersOperations;
  /** The operation groups for azureADAdministrators */
  public readonly azureADAdministrators: AzureADAdministratorsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
