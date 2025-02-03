# Release History
    
## 1.0.0-beta.2 (2024-12-12)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added operation group BillingContainersOperations
  - Added operation group DiscoveredAssetEndpointProfilesOperations
  - Added operation group DiscoveredAssetsOperations
  - Added operation group SchemaRegistriesOperations
  - Added operation group SchemasOperations
  - Added operation group SchemaVersionsOperations
  - Added operation AssetEndpointProfilesOperations.createOrReplace
  - Added operation AssetEndpointProfilesOperations.delete
  - Added operation AssetEndpointProfilesOperations.update
  - Added operation AssetsOperations.createOrReplace
  - Added operation AssetsOperations.delete
  - Added operation AssetsOperations.update
  - Added Interface AssetEndpointProfileStatus
  - Added Interface AssetEndpointProfileStatusError
  - Added Interface AssetStatusDataset
  - Added Interface AssetStatusEvent
  - Added Interface Authentication
  - Added Interface BillingContainer
  - Added Interface BillingContainerProperties
  - Added Interface BillingContainersGetOptionalParams
  - Added Interface BillingContainersListBySubscriptionOptionalParams
  - Added Interface DataPointBase
  - Added Interface Dataset
  - Added Interface DiscoveredAsset
  - Added Interface DiscoveredAssetEndpointProfile
  - Added Interface DiscoveredAssetEndpointProfileProperties
  - Added Interface DiscoveredAssetEndpointProfilesCreateOrReplaceOptionalParams
  - Added Interface DiscoveredAssetEndpointProfilesDeleteOptionalParams
  - Added Interface DiscoveredAssetEndpointProfilesGetOptionalParams
  - Added Interface DiscoveredAssetEndpointProfilesListByResourceGroupOptionalParams
  - Added Interface DiscoveredAssetEndpointProfilesListBySubscriptionOptionalParams
  - Added Interface DiscoveredAssetEndpointProfilesUpdateOptionalParams
  - Added Interface DiscoveredAssetEndpointProfileUpdate
  - Added Interface DiscoveredAssetEndpointProfileUpdateProperties
  - Added Interface DiscoveredAssetProperties
  - Added Interface DiscoveredAssetsCreateOrReplaceOptionalParams
  - Added Interface DiscoveredAssetsDeleteOptionalParams
  - Added Interface DiscoveredAssetsGetOptionalParams
  - Added Interface DiscoveredAssetsListByResourceGroupOptionalParams
  - Added Interface DiscoveredAssetsListBySubscriptionOptionalParams
  - Added Interface DiscoveredAssetsUpdateOptionalParams
  - Added Interface DiscoveredAssetUpdate
  - Added Interface DiscoveredAssetUpdateProperties
  - Added Interface DiscoveredDataPoint
  - Added Interface DiscoveredDataset
  - Added Interface DiscoveredEvent
  - Added Interface EventBase
  - Added Interface MessageSchemaReference
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface Schema
  - Added Interface SchemaProperties
  - Added Interface SchemaRegistriesCreateOrReplaceOptionalParams
  - Added Interface SchemaRegistriesDeleteOptionalParams
  - Added Interface SchemaRegistriesGetOptionalParams
  - Added Interface SchemaRegistriesListByResourceGroupOptionalParams
  - Added Interface SchemaRegistriesListBySubscriptionOptionalParams
  - Added Interface SchemaRegistriesUpdateOptionalParams
  - Added Interface SchemaRegistry
  - Added Interface SchemaRegistryProperties
  - Added Interface SchemaRegistryUpdate
  - Added Interface SchemaRegistryUpdateProperties
  - Added Interface SchemasCreateOrReplaceOptionalParams
  - Added Interface SchemasDeleteOptionalParams
  - Added Interface SchemasGetOptionalParams
  - Added Interface SchemasListBySchemaRegistryOptionalParams
  - Added Interface SchemaVersion
  - Added Interface SchemaVersionProperties
  - Added Interface SchemaVersionsCreateOrReplaceOptionalParams
  - Added Interface SchemaVersionsDeleteOptionalParams
  - Added Interface SchemaVersionsGetOptionalParams
  - Added Interface SchemaVersionsListBySchemaOptionalParams
  - Added Interface SystemAssignedServiceIdentity
  - Added Interface Topic
  - Added Type Alias AuthenticationMethod
  - Added Type Alias ContinuablePage
  - Added Type Alias DataPointObservabilityMode
  - Added Type Alias EventObservabilityMode
  - Added Type Alias Format
  - Added Type Alias SchemaType
  - Added Type Alias SystemAssignedServiceIdentityType
  - Added Type Alias TopicRetainType
  - Interface AssetEndpointProfileProperties has a new optional parameter authentication
  - Interface AssetEndpointProfileProperties has a new optional parameter discoveredAssetEndpointProfileRef
  - Interface AssetEndpointProfileProperties has a new optional parameter status
  - Interface AssetEndpointProfileUpdateProperties has a new optional parameter authentication
  - Interface AssetEndpointProfileUpdateProperties has a new optional parameter endpointProfileType
  - Interface AssetProperties has a new optional parameter datasets
  - Interface AssetProperties has a new optional parameter defaultDatasetsConfiguration
  - Interface AssetProperties has a new optional parameter defaultTopic
  - Interface AssetProperties has a new optional parameter discoveredAssetRefs
  - Interface AssetStatus has a new optional parameter datasets
  - Interface AssetStatus has a new optional parameter events
  - Interface AssetUpdateProperties has a new optional parameter datasets
  - Interface AssetUpdateProperties has a new optional parameter defaultDatasetsConfiguration
  - Interface AssetUpdateProperties has a new optional parameter defaultTopic
  - Added Enum KnownAuthenticationMethod
  - Added Enum KnownDataPointObservabilityMode
  - Added Enum KnownEventObservabilityMode
  - Added Enum KnownFormat
  - Added Enum KnownSchemaType
  - Added Enum KnownSystemAssignedServiceIdentityType
  - Added Enum KnownTopicRetainType
  - Added Enum KnownVersions
  - Enum KnownOrigin has a new value "user,system"
  - Enum KnownOrigin has a new value system
  - Enum KnownOrigin has a new value user
  - Enum KnownProvisioningState has a new value Deleting
  - Added function restorePoller

### Breaking Changes

  - Removed operation AssetEndpointProfiles.beginCreateOrReplace
  - Removed operation AssetEndpointProfiles.beginCreateOrReplaceAndWait
  - Removed operation AssetEndpointProfiles.beginDelete
  - Removed operation AssetEndpointProfiles.beginDeleteAndWait
  - Removed operation AssetEndpointProfiles.beginUpdate
  - Removed operation AssetEndpointProfiles.beginUpdateAndWait
  - Removed operation Assets.beginCreateOrReplace
  - Removed operation Assets.beginCreateOrReplaceAndWait
  - Removed operation Assets.beginDelete
  - Removed operation Assets.beginDeleteAndWait
  - Removed operation Assets.beginUpdate
  - Removed operation Assets.beginUpdateAndWait
  - Class DeviceRegistryManagementClient has a new signature
  - Interface AssetEndpointProfileProperties no longer has parameter transportAuthentication
  - Interface AssetEndpointProfileProperties no longer has parameter userAuthentication
  - Interface AssetEndpointProfilesCreateOrReplaceOptionalParams no longer has parameter resumeFrom
  - Interface AssetEndpointProfilesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface AssetEndpointProfilesUpdateOptionalParams no longer has parameter resumeFrom
  - Interface AssetEndpointProfileUpdateProperties no longer has parameter transportAuthentication
  - Interface AssetEndpointProfileUpdateProperties no longer has parameter userAuthentication
  - Interface AssetProperties no longer has parameter assetEndpointProfileUri
  - Interface AssetProperties no longer has parameter assetType
  - Interface AssetProperties no longer has parameter dataPoints
  - Interface AssetProperties no longer has parameter defaultDataPointsConfiguration
  - Interface AssetsCreateOrReplaceOptionalParams no longer has parameter resumeFrom
  - Interface AssetsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface AssetsUpdateOptionalParams no longer has parameter resumeFrom
  - Interface AssetUpdateProperties no longer has parameter assetType
  - Interface AssetUpdateProperties no longer has parameter dataPoints
  - Interface AssetUpdateProperties no longer has parameter defaultDataPointsConfiguration
  - Interface DataPoint no longer has parameter capabilityId
  - Interface DeviceRegistryManagementClientOptionalParams no longer has parameter $host
  - Interface DeviceRegistryManagementClientOptionalParams no longer has parameter endpoint
  - Interface Event_2 no longer has parameter capabilityId
  - Interface UsernamePasswordCredentials no longer has parameter passwordReference
  - Interface UsernamePasswordCredentials no longer has parameter usernameReference
  - Interface X509Credentials no longer has parameter certificateReference
  - Interface AssetEndpointProfileProperties has a new required parameter endpointProfileType
  - Interface AssetProperties has a new required parameter assetEndpointProfileRef
  - Interface UsernamePasswordCredentials has a new required parameter passwordSecretName
  - Interface UsernamePasswordCredentials has a new required parameter usernameSecretName
  - Interface X509Credentials has a new required parameter certificateSecretName
  - Type of parameter tags of interface AssetEndpointProfileUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter attributes of interface AssetProperties is changed from {
        [propertyName: string]: any;
    } to Record<string, any>
  - Type of parameter tags of interface AssetUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter attributes of interface AssetUpdateProperties is changed from {
        [propertyName: string]: any;
    } to Record<string, any>
  - Type of parameter observabilityMode of interface DataPoint is changed from DataPointsObservabilityMode to DataPointObservabilityMode
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
  - Type of parameter observabilityMode of interface Event_2 is changed from EventsObservabilityMode to EventObservabilityMode
  - Type of parameter tags of interface TrackedResource is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Class DeviceRegistryManagementClient no longer has parameter $host
  - Class DeviceRegistryManagementClient no longer has parameter apiVersion
  - Class DeviceRegistryManagementClient no longer has parameter subscriptionId
  - Removed Enum KnownDataPointsObservabilityMode
  - Removed Enum KnownEventsObservabilityMode
  - Removed Enum KnownUserAuthenticationMode
  - Enum KnownOrigin no longer has value System
  - Enum KnownOrigin no longer has value User
  - Enum KnownOrigin no longer has value UserSystem
  - Removed function getContinuationToken
    
    
## 1.0.0-beta.1 (2024-04-15)

The package of @azure/arm-deviceregistry is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
