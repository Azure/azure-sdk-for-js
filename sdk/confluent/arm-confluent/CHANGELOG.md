# Release History

## 4.0.0-beta.1 (2026-03-05)
Compared with version 3.1.0

### Features Added
  - Added operation group ClusterOperations
  - Added operation group ConnectorOperations
  - Added operation group EnvironmentOperations
  - Added operation group OrganizationOperationsOperations
  - Added operation group TopicsOperations
  - Added operation OrganizationOperations.create
  - Added operation OrganizationOperations.createApiKey
  - Added operation OrganizationOperations.delete
  - Added Interface APIKeyProperties
  - Added Interface AzureBlobStorageSinkConnectorServiceInfo
  - Added Interface AzureBlobStorageSourceConnectorServiceInfo
  - Added Interface AzureCosmosDBSinkConnectorServiceInfo
  - Added Interface AzureCosmosDBSourceConnectorServiceInfo
  - Added Interface AzureSynapseAnalyticsSinkConnectorServiceInfo
  - Added Interface ClusterCreateOrUpdateOptionalParams
  - Added Interface ClusterDeleteOptionalParams
  - Added Interface ClusterProperties
  - Added Interface ConfluentAgreementProperties
  - Added Interface ConnectorCreateOrUpdateOptionalParams
  - Added Interface ConnectorDeleteOptionalParams
  - Added Interface ConnectorGetOptionalParams
  - Added Interface ConnectorInfoBase
  - Added Interface ConnectorListOptionalParams
  - Added Interface ConnectorResource
  - Added Interface ConnectorResourceProperties
  - Added Interface ConnectorServiceTypeInfoBase
  - Added Interface EnvironmentCreateOrUpdateOptionalParams
  - Added Interface EnvironmentDeleteOptionalParams
  - Added Interface EnvironmentProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface KafkaAzureBlobStorageSinkConnectorInfo
  - Added Interface KafkaAzureBlobStorageSourceConnectorInfo
  - Added Interface KafkaAzureCosmosDBSinkConnectorInfo
  - Added Interface KafkaAzureCosmosDBSourceConnectorInfo
  - Added Interface KafkaAzureSynapseAnalyticsSinkConnectorInfo
  - Added Interface OrganizationCreateApiKeyOptionalParams
  - Added Interface OrganizationResourceProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PartnerInfoBase
  - Added Interface ProxyResource
  - Added Interface RegionProperties
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface SchemaRegistryClusterProperties
  - Added Interface SimplePollerLike
  - Added Interface StreamGovernanceConfig
  - Added Interface TopicMetadataEntity
  - Added Interface TopicProperties
  - Added Interface TopicRecord
  - Added Interface TopicsCreateOptionalParams
  - Added Interface TopicsDeleteOptionalParams
  - Added Interface TopicsGetOptionalParams
  - Added Interface TopicsInputConfig
  - Added Interface TopicsListOptionalParams
  - Added Interface TopicsRelatedLink
  - Added Interface TrackedResource
  - Interface SCClusterRecord has a new optional parameter systemData
  - Interface SCClusterRecord has a new optional parameter type
  - Interface SCClusterSpecEntity has a new optional parameter package
  - Interface SCEnvironmentRecord has a new optional parameter streamGovernanceConfig
  - Interface SCEnvironmentRecord has a new optional parameter systemData
  - Interface SCEnvironmentRecord has a new optional parameter type
  - Added Type Alias AuthType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ConnectorClass
  - Added Type Alias ConnectorServiceType
  - Added Type Alias ConnectorServiceTypeInfoBaseUnion
  - Added Type Alias ConnectorStatus
  - Added Type Alias ConnectorType
  - Added Type Alias DataFormatType
  - Added Type Alias Package
  - Added Type Alias PartnerConnectorType
  - Added Type Alias PartnerInfoBaseUnion
  - Added Enum AzureClouds
  - Added Enum KnownAuthType
  - Added Enum KnownConnectorClass
  - Added Enum KnownConnectorServiceType
  - Added Enum KnownConnectorStatus
  - Added Enum KnownConnectorType
  - Added Enum KnownDataFormatType
  - Added Enum KnownPackage
  - Added Enum KnownPartnerConnectorType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Organization.createAPIKey
  - Removed operation Organization.list
  - Removed Interface ConfluentAgreementResourceListResponse
  - Removed Interface GetEnvironmentsResponse
  - Removed Interface ListClustersSuccessResponse
  - Removed Interface ListSchemaRegistryClustersResponse
  - Removed Interface OrganizationCreateAPIKeyOptionalParams
  - Removed Interface SCConfluentListMetadata
  - Parameter location of interface OrganizationResource is now required

    
## 3.1.0 (2024-03-13)
    
### Features Added

  - Added operation Access.createRoleBinding
  - Added operation Access.deleteRoleBinding
  - Added operation Access.listRoleBindingNameList
  - Added operation Organization.createAPIKey
  - Added operation Organization.deleteClusterAPIKey
  - Added operation Organization.getClusterAPIKey
  - Added operation Organization.getClusterById
  - Added operation Organization.getEnvironmentById
  - Added operation Organization.getSchemaRegistryClusterById
  - Added operation Organization.listClusters
  - Added operation Organization.listEnvironments
  - Added operation Organization.listRegions
  - Added operation Organization.listSchemaRegistryClusters
  - Added Interface AccessCreateRoleBindingOptionalParams
  - Added Interface AccessCreateRoleBindingRequestModel
  - Added Interface AccessDeleteRoleBindingOptionalParams
  - Added Interface AccessListRoleBindingNameListOptionalParams
  - Added Interface AccessRoleBindingNameListSuccessResponse
  - Added Interface APIKeyOwnerEntity
  - Added Interface APIKeyRecord
  - Added Interface APIKeyResourceEntity
  - Added Interface APIKeySpecEntity
  - Added Interface CreateAPIKeyModel
  - Added Interface GetEnvironmentsResponse
  - Added Interface ListClustersSuccessResponse
  - Added Interface ListRegionsSuccessResponse
  - Added Interface ListSchemaRegistryClustersResponse
  - Added Interface OrganizationCreateAPIKeyOptionalParams
  - Added Interface OrganizationDeleteClusterAPIKeyOptionalParams
  - Added Interface OrganizationGetClusterAPIKeyOptionalParams
  - Added Interface OrganizationGetClusterByIdOptionalParams
  - Added Interface OrganizationGetEnvironmentByIdOptionalParams
  - Added Interface OrganizationGetSchemaRegistryClusterByIdOptionalParams
  - Added Interface OrganizationListClustersNextOptionalParams
  - Added Interface OrganizationListClustersOptionalParams
  - Added Interface OrganizationListEnvironmentsNextOptionalParams
  - Added Interface OrganizationListEnvironmentsOptionalParams
  - Added Interface OrganizationListRegionsOptionalParams
  - Added Interface OrganizationListSchemaRegistryClustersNextOptionalParams
  - Added Interface OrganizationListSchemaRegistryClustersOptionalParams
  - Added Interface RegionRecord
  - Added Interface RegionSpecEntity
  - Added Interface SCClusterByokEntity
  - Added Interface SCClusterNetworkEnvironmentEntity
  - Added Interface SCClusterRecord
  - Added Interface SCClusterSpecEntity
  - Added Interface SCConfluentListMetadata
  - Added Interface SCEnvironmentRecord
  - Added Interface SchemaRegistryClusterEnvironmentRegionEntity
  - Added Interface SchemaRegistryClusterRecord
  - Added Interface SchemaRegistryClusterSpecEntity
  - Added Interface SchemaRegistryClusterStatusEntity
  - Added Interface SCMetadataEntity
  - Added Type Alias AccessCreateRoleBindingResponse
  - Added Type Alias AccessListRoleBindingNameListResponse
  - Added Type Alias OrganizationCreateAPIKeyResponse
  - Added Type Alias OrganizationGetClusterAPIKeyResponse
  - Added Type Alias OrganizationGetClusterByIdResponse
  - Added Type Alias OrganizationGetEnvironmentByIdResponse
  - Added Type Alias OrganizationGetSchemaRegistryClusterByIdResponse
  - Added Type Alias OrganizationListClustersNextResponse
  - Added Type Alias OrganizationListClustersResponse
  - Added Type Alias OrganizationListEnvironmentsNextResponse
  - Added Type Alias OrganizationListEnvironmentsResponse
  - Added Type Alias OrganizationListRegionsResponse
  - Added Type Alias OrganizationListSchemaRegistryClustersNextResponse
  - Added Type Alias OrganizationListSchemaRegistryClustersResponse
    
    
## 3.0.0 (2023-11-07)

The package of @azure/arm-confluent is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/azsdk/js/mgmt/quickstart).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
