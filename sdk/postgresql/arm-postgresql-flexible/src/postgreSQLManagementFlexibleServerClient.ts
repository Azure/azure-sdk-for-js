// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PostgreSQLManagementFlexibleServerContext,
  PostgreSQLManagementFlexibleServerClientOptionalParams,
  createPostgreSQLManagementFlexibleServer,
} from "./api/index.js";
import {
  AdministratorsMicrosoftEntraOperations,
  _getAdministratorsMicrosoftEntraOperations,
} from "./classic/administratorsMicrosoftEntra/index.js";
import {
  AdvancedThreatProtectionSettingsOperations,
  _getAdvancedThreatProtectionSettingsOperations,
} from "./classic/advancedThreatProtectionSettings/index.js";
import {
  BackupsAutomaticAndOnDemandOperations,
  _getBackupsAutomaticAndOnDemandOperations,
} from "./classic/backupsAutomaticAndOnDemand/index.js";
import {
  BackupsLongTermRetentionOperations,
  _getBackupsLongTermRetentionOperations,
} from "./classic/backupsLongTermRetention/index.js";
import {
  CapabilitiesByLocationOperations,
  _getCapabilitiesByLocationOperations,
} from "./classic/capabilitiesByLocation/index.js";
import {
  CapabilitiesByServerOperations,
  _getCapabilitiesByServerOperations,
} from "./classic/capabilitiesByServer/index.js";
import {
  CapturedLogsOperations,
  _getCapturedLogsOperations,
} from "./classic/capturedLogs/index.js";
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
  MaintenanceEventsOperations,
  _getMaintenanceEventsOperations,
} from "./classic/maintenanceEvents/index.js";
import {
  MajorVersionUpgradePrecheckOperations,
  _getMajorVersionUpgradePrecheckOperations,
} from "./classic/majorVersionUpgradePrecheck/index.js";
import { MigrationsOperations, _getMigrationsOperations } from "./classic/migrations/index.js";
import {
  NameAvailabilityOperations,
  _getNameAvailabilityOperations,
} from "./classic/nameAvailability/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateDnsZoneSuffixOperations,
  _getPrivateDnsZoneSuffixOperations,
} from "./classic/privateDnsZoneSuffix/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { QuotaUsagesOperations, _getQuotaUsagesOperations } from "./classic/quotaUsages/index.js";
import { ReplicasOperations, _getReplicasOperations } from "./classic/replicas/index.js";
import {
  ServerThreatProtectionSettingsOperations,
  _getServerThreatProtectionSettingsOperations,
} from "./classic/serverThreatProtectionSettings/index.js";
import { ServersOperations, _getServersOperations } from "./classic/servers/index.js";
import {
  TuningOptionsOperationsOperations,
  _getTuningOptionsOperationsOperations,
} from "./classic/tuningOptionsOperations/index.js";
import {
  VirtualEndpointsOperations,
  _getVirtualEndpointsOperations,
} from "./classic/virtualEndpoints/index.js";
import {
  VirtualNetworkSubnetUsageOperations,
  _getVirtualNetworkSubnetUsageOperations,
} from "./classic/virtualNetworkSubnetUsage/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PostgreSQLManagementFlexibleServerClientOptionalParams } from "./api/postgreSQLManagementFlexibleServerContext.js";

export class PostgreSQLManagementFlexibleServerClient {
  private _client: PostgreSQLManagementFlexibleServerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: PostgreSQLManagementFlexibleServerClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PostgreSQLManagementFlexibleServerClientOptionalParams,
  );
  /** The Azure Database for PostgreSQL management API provides create, read, update, and delete functionality for Azure PostgreSQL resources including servers, databases, firewall rules, network configuration, security alert policies, log files and configurations with new business model. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PostgreSQLManagementFlexibleServerClientOptionalParams,
    options?: PostgreSQLManagementFlexibleServerClientOptionalParams,
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
    this._client = createPostgreSQLManagementFlexibleServer(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.virtualNetworkSubnetUsage = _getVirtualNetworkSubnetUsageOperations(this._client);
    this.quotaUsages = _getQuotaUsagesOperations(this._client);
    this.privateDnsZoneSuffix = _getPrivateDnsZoneSuffixOperations(this._client);
    this.nameAvailability = _getNameAvailabilityOperations(this._client);
    this.capabilitiesByLocation = _getCapabilitiesByLocationOperations(this._client);
    this.tuningOptionsOperations = _getTuningOptionsOperationsOperations(this._client);
    this.backupsAutomaticAndOnDemand = _getBackupsAutomaticAndOnDemandOperations(this._client);
    this.serverThreatProtectionSettings = _getServerThreatProtectionSettingsOperations(
      this._client,
    );
    this.advancedThreatProtectionSettings = _getAdvancedThreatProtectionSettingsOperations(
      this._client,
    );
    this.replicas = _getReplicasOperations(this._client);
    this.backupsLongTermRetention = _getBackupsLongTermRetentionOperations(this._client);
    this.capturedLogs = _getCapturedLogsOperations(this._client);
    this.capabilitiesByServer = _getCapabilitiesByServerOperations(this._client);
    this.administratorsMicrosoftEntra = _getAdministratorsMicrosoftEntraOperations(this._client);
    this.majorVersionUpgradePrecheck = _getMajorVersionUpgradePrecheckOperations(this._client);
    this.maintenanceEvents = _getMaintenanceEventsOperations(this._client);
    this.virtualEndpoints = _getVirtualEndpointsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.databases = _getDatabasesOperations(this._client);
    this.configurations = _getConfigurationsOperations(this._client);
    this.servers = _getServersOperations(this._client);
    this.migrations = _getMigrationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for virtualNetworkSubnetUsage */
  public readonly virtualNetworkSubnetUsage: VirtualNetworkSubnetUsageOperations;
  /** The operation groups for quotaUsages */
  public readonly quotaUsages: QuotaUsagesOperations;
  /** The operation groups for privateDnsZoneSuffix */
  public readonly privateDnsZoneSuffix: PrivateDnsZoneSuffixOperations;
  /** The operation groups for nameAvailability */
  public readonly nameAvailability: NameAvailabilityOperations;
  /** The operation groups for capabilitiesByLocation */
  public readonly capabilitiesByLocation: CapabilitiesByLocationOperations;
  /** The operation groups for tuningOptionsOperations */
  public readonly tuningOptionsOperations: TuningOptionsOperationsOperations;
  /** The operation groups for backupsAutomaticAndOnDemand */
  public readonly backupsAutomaticAndOnDemand: BackupsAutomaticAndOnDemandOperations;
  /** The operation groups for serverThreatProtectionSettings */
  public readonly serverThreatProtectionSettings: ServerThreatProtectionSettingsOperations;
  /** The operation groups for advancedThreatProtectionSettings */
  public readonly advancedThreatProtectionSettings: AdvancedThreatProtectionSettingsOperations;
  /** The operation groups for replicas */
  public readonly replicas: ReplicasOperations;
  /** The operation groups for backupsLongTermRetention */
  public readonly backupsLongTermRetention: BackupsLongTermRetentionOperations;
  /** The operation groups for capturedLogs */
  public readonly capturedLogs: CapturedLogsOperations;
  /** The operation groups for capabilitiesByServer */
  public readonly capabilitiesByServer: CapabilitiesByServerOperations;
  /** The operation groups for administratorsMicrosoftEntra */
  public readonly administratorsMicrosoftEntra: AdministratorsMicrosoftEntraOperations;
  /** The operation groups for majorVersionUpgradePrecheck */
  public readonly majorVersionUpgradePrecheck: MajorVersionUpgradePrecheckOperations;
  /** The operation groups for maintenanceEvents */
  public readonly maintenanceEvents: MaintenanceEventsOperations;
  /** The operation groups for virtualEndpoints */
  public readonly virtualEndpoints: VirtualEndpointsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for databases */
  public readonly databases: DatabasesOperations;
  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for servers */
  public readonly servers: ServersOperations;
  /** The operation groups for migrations */
  public readonly migrations: MigrationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
