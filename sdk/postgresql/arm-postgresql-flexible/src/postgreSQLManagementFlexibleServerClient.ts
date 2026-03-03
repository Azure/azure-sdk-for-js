// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PostgreSQLManagementFlexibleServerContext,
  PostgreSQLManagementFlexibleServerClientOptionalParams,
} from "./api/index.js";
import { createPostgreSQLManagementFlexibleServer } from "./api/index.js";
import type { AdministratorsMicrosoftEntraOperations } from "./classic/administratorsMicrosoftEntra/index.js";
import { _getAdministratorsMicrosoftEntraOperations } from "./classic/administratorsMicrosoftEntra/index.js";
import type { AdvancedThreatProtectionSettingsOperations } from "./classic/advancedThreatProtectionSettings/index.js";
import { _getAdvancedThreatProtectionSettingsOperations } from "./classic/advancedThreatProtectionSettings/index.js";
import type { BackupsAutomaticAndOnDemandOperations } from "./classic/backupsAutomaticAndOnDemand/index.js";
import { _getBackupsAutomaticAndOnDemandOperations } from "./classic/backupsAutomaticAndOnDemand/index.js";
import type { BackupsLongTermRetentionOperations } from "./classic/backupsLongTermRetention/index.js";
import { _getBackupsLongTermRetentionOperations } from "./classic/backupsLongTermRetention/index.js";
import type { CapabilitiesByLocationOperations } from "./classic/capabilitiesByLocation/index.js";
import { _getCapabilitiesByLocationOperations } from "./classic/capabilitiesByLocation/index.js";
import type { CapabilitiesByServerOperations } from "./classic/capabilitiesByServer/index.js";
import { _getCapabilitiesByServerOperations } from "./classic/capabilitiesByServer/index.js";
import type { CapturedLogsOperations } from "./classic/capturedLogs/index.js";
import { _getCapturedLogsOperations } from "./classic/capturedLogs/index.js";
import type { ConfigurationsOperations } from "./classic/configurations/index.js";
import { _getConfigurationsOperations } from "./classic/configurations/index.js";
import type { DatabasesOperations } from "./classic/databases/index.js";
import { _getDatabasesOperations } from "./classic/databases/index.js";
import type { FirewallRulesOperations } from "./classic/firewallRules/index.js";
import { _getFirewallRulesOperations } from "./classic/firewallRules/index.js";
import type { MigrationsOperations } from "./classic/migrations/index.js";
import { _getMigrationsOperations } from "./classic/migrations/index.js";
import type { NameAvailabilityOperations } from "./classic/nameAvailability/index.js";
import { _getNameAvailabilityOperations } from "./classic/nameAvailability/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateDnsZoneSuffixOperations } from "./classic/privateDnsZoneSuffix/index.js";
import { _getPrivateDnsZoneSuffixOperations } from "./classic/privateDnsZoneSuffix/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { QuotaUsagesOperations } from "./classic/quotaUsages/index.js";
import { _getQuotaUsagesOperations } from "./classic/quotaUsages/index.js";
import type { ReplicasOperations } from "./classic/replicas/index.js";
import { _getReplicasOperations } from "./classic/replicas/index.js";
import type { ServerThreatProtectionSettingsOperations } from "./classic/serverThreatProtectionSettings/index.js";
import { _getServerThreatProtectionSettingsOperations } from "./classic/serverThreatProtectionSettings/index.js";
import type { ServersOperations } from "./classic/servers/index.js";
import { _getServersOperations } from "./classic/servers/index.js";
import type { TuningOptionsOperations } from "./classic/tuningOptions/index.js";
import { _getTuningOptionsOperations } from "./classic/tuningOptions/index.js";
import type { VirtualEndpointsOperations } from "./classic/virtualEndpoints/index.js";
import { _getVirtualEndpointsOperations } from "./classic/virtualEndpoints/index.js";
import type { VirtualNetworkSubnetUsageOperations } from "./classic/virtualNetworkSubnetUsage/index.js";
import { _getVirtualNetworkSubnetUsageOperations } from "./classic/virtualNetworkSubnetUsage/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { PostgreSQLManagementFlexibleServerClientOptionalParams } from "./api/postgreSQLManagementFlexibleServerContext.js";

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
    this.tuningOptions = _getTuningOptionsOperations(this._client);
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
  /** The operation groups for tuningOptions */
  public readonly tuningOptions: TuningOptionsOperations;
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
