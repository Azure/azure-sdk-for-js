# Release History
    
## 10.0.0-beta.1 (2022-04-08)
    
**Features**

  - Added operation group DistributedAvailabilityGroups
  - Added operation group EndpointCertificates
  - Added operation group IPv6FirewallRules
  - Added operation group ManagedServerDnsAliases
  - Added operation group ServerTrustCertificates
  - Added operation ManagedDatabaseSensitivityLabels.listByDatabase
  - Added operation SensitivityLabels.listByDatabase
  - Added Interface DistributedAvailabilityGroupsCreateOrUpdateOptionalParams
  - Added Interface DistributedAvailabilityGroupsDeleteOptionalParams
  - Added Interface DistributedAvailabilityGroupsGetOptionalParams
  - Added Interface DistributedAvailabilityGroupsListByInstanceNextOptionalParams
  - Added Interface DistributedAvailabilityGroupsListByInstanceOptionalParams
  - Added Interface DistributedAvailabilityGroupsListResult
  - Added Interface DistributedAvailabilityGroupsUpdateOptionalParams
  - Added Interface EndpointCertificateListResult
  - Added Interface EndpointCertificatesGetOptionalParams
  - Added Interface EndpointCertificatesListByInstanceNextOptionalParams
  - Added Interface EndpointCertificatesListByInstanceOptionalParams
  - Added Interface IPv6FirewallRuleListResult
  - Added Interface IPv6FirewallRulesCreateOrUpdateOptionalParams
  - Added Interface IPv6FirewallRulesDeleteOptionalParams
  - Added Interface IPv6FirewallRulesGetOptionalParams
  - Added Interface IPv6FirewallRulesListByServerNextOptionalParams
  - Added Interface IPv6FirewallRulesListByServerOptionalParams
  - Added Interface ManagedDatabaseSensitivityLabelsListByDatabaseNextOptionalParams
  - Added Interface ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams
  - Added Interface ManagedServerDnsAliasAcquisition
  - Added Interface ManagedServerDnsAliasCreation
  - Added Interface ManagedServerDnsAliasesAcquireOptionalParams
  - Added Interface ManagedServerDnsAliasesCreateOrUpdateOptionalParams
  - Added Interface ManagedServerDnsAliasesDeleteOptionalParams
  - Added Interface ManagedServerDnsAliasesGetOptionalParams
  - Added Interface ManagedServerDnsAliasesListByManagedInstanceNextOptionalParams
  - Added Interface ManagedServerDnsAliasesListByManagedInstanceOptionalParams
  - Added Interface ManagedServerDnsAliasListResult
  - Added Interface SensitivityLabelsListByDatabaseNextOptionalParams
  - Added Interface SensitivityLabelsListByDatabaseOptionalParams
  - Added Interface ServerTrustCertificatesCreateOrUpdateOptionalParams
  - Added Interface ServerTrustCertificatesDeleteOptionalParams
  - Added Interface ServerTrustCertificatesGetOptionalParams
  - Added Interface ServerTrustCertificatesListByInstanceNextOptionalParams
  - Added Interface ServerTrustCertificatesListByInstanceOptionalParams
  - Added Interface ServerTrustCertificatesListResult
  - Added Type Alias DistributedAvailabilityGroup
  - Added Type Alias DistributedAvailabilityGroupsCreateOrUpdateResponse
  - Added Type Alias DistributedAvailabilityGroupsGetResponse
  - Added Type Alias DistributedAvailabilityGroupsListByInstanceNextResponse
  - Added Type Alias DistributedAvailabilityGroupsListByInstanceResponse
  - Added Type Alias DistributedAvailabilityGroupsUpdateResponse
  - Added Type Alias EndpointCertificate
  - Added Type Alias EndpointCertificatesGetResponse
  - Added Type Alias EndpointCertificatesListByInstanceNextResponse
  - Added Type Alias EndpointCertificatesListByInstanceResponse
  - Added Type Alias IPv6FirewallRule
  - Added Type Alias IPv6FirewallRulesCreateOrUpdateResponse
  - Added Type Alias IPv6FirewallRulesGetResponse
  - Added Type Alias IPv6FirewallRulesListByServerNextResponse
  - Added Type Alias IPv6FirewallRulesListByServerResponse
  - Added Type Alias ManagedDatabaseSensitivityLabelsListByDatabaseNextResponse
  - Added Type Alias ManagedDatabaseSensitivityLabelsListByDatabaseResponse
  - Added Type Alias ManagedServerDnsAlias
  - Added Type Alias ManagedServerDnsAliasesAcquireResponse
  - Added Type Alias ManagedServerDnsAliasesCreateOrUpdateResponse
  - Added Type Alias ManagedServerDnsAliasesGetResponse
  - Added Type Alias ManagedServerDnsAliasesListByManagedInstanceNextResponse
  - Added Type Alias ManagedServerDnsAliasesListByManagedInstanceResponse
  - Added Type Alias ReplicationLinksFailoverAllowDataLossResponse
  - Added Type Alias ReplicationLinksFailoverResponse
  - Added Type Alias ReplicationMode
  - Added Type Alias SensitivityLabelsListByDatabaseNextResponse
  - Added Type Alias SensitivityLabelsListByDatabaseResponse
  - Added Type Alias ServerTrustCertificate
  - Added Type Alias ServerTrustCertificatesCreateOrUpdateResponse
  - Added Type Alias ServerTrustCertificatesGetResponse
  - Added Type Alias ServerTrustCertificatesListByInstanceNextResponse
  - Added Type Alias ServerTrustCertificatesListByInstanceResponse
  - Added Type Alias SyncGroupsType
  - Interface ElasticPoolUpdate has a new optional parameter highAvailabilityReplicaCount
  - Class SqlManagementClient has a new parameter distributedAvailabilityGroups
  - Class SqlManagementClient has a new parameter endpointCertificates
  - Class SqlManagementClient has a new parameter iPv6FirewallRules
  - Class SqlManagementClient has a new parameter managedServerDnsAliases
  - Class SqlManagementClient has a new parameter serverTrustCertificates
  - Type Alias Database has a new parameter sourceResourceId
  - Type Alias ElasticPool has a new parameter highAvailabilityReplicaCount
  - Added Enum KnownReplicationMode
  - Added Enum KnownSyncGroupsType

**Breaking Changes**

  - Removed operation group OperationsHealthOperations
  - Removed operation ReplicationLinks.beginUnlink
  - Removed operation ReplicationLinks.beginUnlinkAndWait
  - Operation SyncGroups.listLogs has a new signature
  - Interface DatabaseIdentity no longer has parameter delegatedResources
  - Interface DatabaseUpdate no longer has parameter primaryDelegatedIdentityClientId
  - Class SqlManagementClient no longer has parameter operationsHealthOperations
  - Type Alias Database no longer has parameter primaryDelegatedIdentityClientId
  - Removed Enum KnownEnum60
    
    
## 9.0.0 (2021-12-07)

The package of @azure/arm-sql is using our next generation design principles since version 9.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
