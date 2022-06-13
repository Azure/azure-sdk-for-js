# Release History

## 3.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.0 (2022-05-17)
    
**Features**

  - Added operation ArcSettings.beginCreateIdentity
  - Added operation ArcSettings.beginCreateIdentityAndWait
  - Added operation ArcSettings.generatePassword
  - Added operation ArcSettings.update
  - Added operation Clusters.beginCreateIdentity
  - Added operation Clusters.beginCreateIdentityAndWait
  - Added operation Clusters.beginDelete
  - Added operation Clusters.beginDeleteAndWait
  - Added operation Clusters.beginUploadCertificate
  - Added operation Clusters.beginUploadCertificateAndWait
  - Added Interface ArcConnectivityProperties
  - Added Interface ArcIdentityResponse
  - Added Interface ArcSettingsCreateIdentityOptionalParams
  - Added Interface ArcSettingsGeneratePasswordOptionalParams
  - Added Interface ArcSettingsPatch
  - Added Interface ArcSettingsUpdateOptionalParams
  - Added Interface ClusterIdentityResponse
  - Added Interface ClustersCreateIdentityOptionalParams
  - Added Interface ClustersUploadCertificateOptionalParams
  - Added Interface PasswordCredential
  - Added Interface RawCertificateData
  - Added Interface UploadCertificateRequest
  - Added Type Alias ArcSettingsCreateIdentityResponse
  - Added Type Alias ArcSettingsGeneratePasswordResponse
  - Added Type Alias ArcSettingsUpdateResponse
  - Added Type Alias ClustersCreateIdentityResponse
  - Interface ClustersDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface ClustersDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Type Alias ArcSetting has a new parameter arcApplicationClientId
  - Type Alias ArcSetting has a new parameter arcApplicationTenantId
  - Type Alias ArcSetting has a new parameter arcServicePrincipalObjectId
  - Type Alias ArcSetting has a new parameter arcApplicationObjectId
  - Type Alias ArcSetting has a new parameter connectivityProperties
  - Type Alias Cluster has a new parameter aadApplicationObjectId
  - Type Alias Cluster has a new parameter aadServicePrincipalObjectId
  - Type Alias Cluster has a new parameter serviceEndpoint

**Breaking Changes**

  - Removed operation Clusters.delete
    
## 2.1.0 (2022-02-28)

**Features**

  - Added Parameters

## 2.0.0 (2022-01-11)

The package of @azure/arm-azurestackhci is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
