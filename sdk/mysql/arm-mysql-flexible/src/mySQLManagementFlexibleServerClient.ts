// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MySQLManagementFlexibleServerContext,
  MySQLManagementFlexibleServerClientOptionalParams,
} from "./api/index.js";
import { createMySQLManagementFlexibleServer } from "./api/index.js";
import type { AdvancedThreatProtectionSettingsOperations } from "./classic/advancedThreatProtectionSettings/index.js";
import { _getAdvancedThreatProtectionSettingsOperations } from "./classic/advancedThreatProtectionSettings/index.js";
import type { AzureADAdministratorsOperations } from "./classic/azureADAdministrators/index.js";
import { _getAzureADAdministratorsOperations } from "./classic/azureADAdministrators/index.js";
import type { BackupAndExportOperations } from "./classic/backupAndExport/index.js";
import { _getBackupAndExportOperations } from "./classic/backupAndExport/index.js";
import type { BackupsOperations } from "./classic/backups/index.js";
import { _getBackupsOperations } from "./classic/backups/index.js";
import type { CheckNameAvailabilityOperations } from "./classic/checkNameAvailability/index.js";
import { _getCheckNameAvailabilityOperations } from "./classic/checkNameAvailability/index.js";
import type { CheckNameAvailabilityWithoutLocationOperations } from "./classic/checkNameAvailabilityWithoutLocation/index.js";
import { _getCheckNameAvailabilityWithoutLocationOperations } from "./classic/checkNameAvailabilityWithoutLocation/index.js";
import type { CheckVirtualNetworkSubnetUsageOperations } from "./classic/checkVirtualNetworkSubnetUsage/index.js";
import { _getCheckVirtualNetworkSubnetUsageOperations } from "./classic/checkVirtualNetworkSubnetUsage/index.js";
import type { ConfigurationsOperations } from "./classic/configurations/index.js";
import { _getConfigurationsOperations } from "./classic/configurations/index.js";
import type { DatabasesOperations } from "./classic/databases/index.js";
import { _getDatabasesOperations } from "./classic/databases/index.js";
import type { FirewallRulesOperations } from "./classic/firewallRules/index.js";
import { _getFirewallRulesOperations } from "./classic/firewallRules/index.js";
import type { GetPrivateDnsZoneSuffixOperations } from "./classic/getPrivateDnsZoneSuffix/index.js";
import { _getGetPrivateDnsZoneSuffixOperations } from "./classic/getPrivateDnsZoneSuffix/index.js";
import type { LocationBasedCapabilitiesOperations } from "./classic/locationBasedCapabilities/index.js";
import { _getLocationBasedCapabilitiesOperations } from "./classic/locationBasedCapabilities/index.js";
import type { LocationBasedCapabilitySetOperations } from "./classic/locationBasedCapabilitySet/index.js";
import { _getLocationBasedCapabilitySetOperations } from "./classic/locationBasedCapabilitySet/index.js";
import type { LogFilesOperations } from "./classic/logFiles/index.js";
import { _getLogFilesOperations } from "./classic/logFiles/index.js";
import type { LongRunningBackupOperations } from "./classic/longRunningBackup/index.js";
import { _getLongRunningBackupOperations } from "./classic/longRunningBackup/index.js";
import type { LongRunningBackupsOperations } from "./classic/longRunningBackups/index.js";
import { _getLongRunningBackupsOperations } from "./classic/longRunningBackups/index.js";
import type { MaintenancesOperations } from "./classic/maintenances/index.js";
import { _getMaintenancesOperations } from "./classic/maintenances/index.js";
import type { OperationProgressOperations } from "./classic/operationProgress/index.js";
import { _getOperationProgressOperations } from "./classic/operationProgress/index.js";
import type { OperationResultsOperations } from "./classic/operationResults/index.js";
import { _getOperationResultsOperations } from "./classic/operationResults/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ReplicasOperations } from "./classic/replicas/index.js";
import { _getReplicasOperations } from "./classic/replicas/index.js";
import type { ServersOperations } from "./classic/servers/index.js";
import { _getServersOperations } from "./classic/servers/index.js";
import type { ServersMigrationOperations } from "./classic/serversMigration/index.js";
import { _getServersMigrationOperations } from "./classic/serversMigration/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { MySQLManagementFlexibleServerClientOptionalParams } from "./api/mySQLManagementFlexibleServerContext.js";

export class MySQLManagementFlexibleServerClient {
  private _client: MySQLManagementFlexibleServerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft Azure management API provides create, read, update, and delete functionality for Azure MySQL resources including servers, databases, firewall rules, VNET rules, log files and configurations with new business model. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MySQLManagementFlexibleServerClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMySQLManagementFlexibleServer(credential, subscriptionId, {
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
