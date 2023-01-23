# Release History

## 8.1.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 8.1.0-beta.2 (2022-12-16)
    
**Features**

  - Added operation group WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettings
  - Added Interface AttachedDatabaseConfiguration
  - Added Interface AzureADOnlyAuthentication
  - Added Interface AzureEntityResource
  - Added Interface BigDataPoolResourceInfo
  - Added Interface ClusterPrincipalAssignment
  - Added Interface CmdkeySetup
  - Added Interface ComponentSetup
  - Added Interface Database
  - Added Interface DatabasePrincipalAssignment
  - Added Interface DataConnection
  - Added Interface DataMaskingPolicy
  - Added Interface DataMaskingRule
  - Added Interface DataWarehouseUserActivities
  - Added Interface DedicatedSQLminimalTlsSettings
  - Added Interface DedicatedSQLminimalTlsSettingsListResult
  - Added Interface DedicatedSQLminimalTlsSettingsPatchInfo
  - Added Interface EncryptionProtector
  - Added Interface EnvironmentVariableSetup
  - Added Interface EventGridDataConnection
  - Added Interface EventHubDataConnection
  - Added Interface ExtendedServerBlobAuditingPolicy
  - Added Interface ExtendedSqlPoolBlobAuditingPolicy
  - Added Interface GeoBackupPolicy
  - Added Interface IntegrationRuntimeResource
  - Added Interface IotHubDataConnection
  - Added Interface IpFirewallRuleInfo
  - Added Interface Key
  - Added Interface KustoPool
  - Added Interface KustoPoolUpdate
  - Added Interface LibraryResource
  - Added Interface LinkedIntegrationRuntimeKeyAuthorization
  - Added Interface LinkedIntegrationRuntimeRbacAuthorization
  - Added Interface MaintenanceWindowOptions
  - Added Interface MaintenanceWindows
  - Added Interface ManagedIdentitySqlControlSettingsModel
  - Added Interface ManagedIntegrationRuntime
  - Added Interface ManagedIntegrationRuntimeStatus
  - Added Interface MetadataSyncConfig
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionForPrivateLinkHub
  - Added Interface PrivateLinkHub
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface ReadOnlyFollowingDatabase
  - Added Interface ReadWriteDatabase
  - Added Interface RecommendedSensitivityLabelUpdate
  - Added Interface RecoverableSqlPool
  - Added Interface ReplicationLink
  - Added Interface RestorableDroppedSqlPool
  - Added Interface RestorePoint
  - Added Interface SecureString
  - Added Interface SelfHostedIntegrationRuntime
  - Added Interface SelfHostedIntegrationRuntimeStatus
  - Added Interface SensitivityLabel
  - Added Interface SensitivityLabelUpdate
  - Added Interface ServerBlobAuditingPolicy
  - Added Interface ServerSecurityAlertPolicy
  - Added Interface ServerVulnerabilityAssessment
  - Added Interface SparkConfigurationResource
  - Added Interface SqlPool
  - Added Interface SqlPoolBlobAuditingPolicy
  - Added Interface SqlPoolColumn
  - Added Interface SqlPoolConnectionPolicy
  - Added Interface SqlPoolOperation
  - Added Interface SqlPoolSchema
  - Added Interface SqlPoolSecurityAlertPolicy
  - Added Interface SqlPoolTable
  - Added Interface SqlPoolVulnerabilityAssessment
  - Added Interface SqlPoolVulnerabilityAssessmentRuleBaseline
  - Added Interface SqlPoolVulnerabilityAssessmentScansExport
  - Added Interface SsisEnvironment
  - Added Interface SsisFolder
  - Added Interface SsisPackage
  - Added Interface SsisProject
  - Added Interface SubResource
  - Added Interface TrackedResource
  - Added Interface TransparentDataEncryption
  - Added Interface VulnerabilityAssessmentScanRecord
  - Added Interface WorkloadClassifier
  - Added Interface WorkloadGroup
  - Added Interface Workspace
  - Added Interface WorkspaceAadAdminInfo
  - Added Interface WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetOptionalParams
  - Added Interface WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListNextOptionalParams
  - Added Interface WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListOptionalParams
  - Added Interface WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateOptionalParams
  - Added Type Alias DedicatedSQLMinimalTlsSettingsName
  - Added Type Alias WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetResponse
  - Added Type Alias WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListNextResponse
  - Added Type Alias WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListResponse
  - Added Type Alias WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateResponse
  - Added Enum KnownDedicatedSQLMinimalTlsSettingsName
  - Added function getContinuationToken
  - Interface SqlPoolSchemasListNextOptionalParams no longer has parameter filter
  - Interface SqlPoolSensitivityLabelsListCurrentNextOptionalParams no longer has parameter filter
  - Interface SqlPoolSensitivityLabelsListRecommendedNextOptionalParams no longer has parameter filter
  - Interface SqlPoolSensitivityLabelsListRecommendedNextOptionalParams no longer has parameter includeDisabledRecommendations
  - Interface SqlPoolSensitivityLabelsListRecommendedNextOptionalParams no longer has parameter skipToken
  - Interface SqlPoolTableColumnsListByTableNameNextOptionalParams no longer has parameter filter
  - Interface SqlPoolTablesListBySchemaNextOptionalParams no longer has parameter filter
    
    
## 8.0.0 (2022-01-13)

The package of @azure/arm-synapse is using our next generation design principles since version 8.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
