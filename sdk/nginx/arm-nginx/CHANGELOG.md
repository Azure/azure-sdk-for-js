# Release History

## 4.0.0-beta.3 (2026-02-12)
Compared with version 3.0.0

### Features Added
  - Added operation group ApiKeysOperations
  - Added operation group DefaultWafPolicyOperations
  - Added operation group WafPolicyOperations
  - Added operation CertificatesOperations.createOrUpdate
  - Added operation CertificatesOperations.delete
  - Added operation ConfigurationsOperations.analysis
  - Added operation ConfigurationsOperations.createOrUpdate
  - Added operation ConfigurationsOperations.delete
  - Added operation DeploymentsOperations.createOrUpdate
  - Added operation DeploymentsOperations.delete
  - Added operation DeploymentsOperations.update
  - Added Interface AnalysisCreate
  - Added Interface AnalysisCreateConfig
  - Added Interface AnalysisDiagnostic
  - Added Interface AnalysisResult
  - Added Interface AnalysisResultData
  - Added Interface ApiKeysCreateOrUpdateOptionalParams
  - Added Interface ApiKeysDeleteOptionalParams
  - Added Interface ApiKeysGetOptionalParams
  - Added Interface ApiKeysListOptionalParams
  - Added Interface AutoUpgradeProfile
  - Added Interface ConfigurationsAnalysisOptionalParams
  - Added Interface DefaultWafPolicyListOptionalParams
  - Added Interface DiagnosticItem
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface NginxCertificateErrorResponseBody
  - Added Interface NginxConfigurationProtectedFileRequest
  - Added Interface NginxConfigurationProtectedFileResponse
  - Added Interface NginxConfigurationRequest
  - Added Interface NginxConfigurationRequestProperties
  - Added Interface NginxDeploymentApiKeyRequest
  - Added Interface NginxDeploymentApiKeyRequestProperties
  - Added Interface NginxDeploymentApiKeyResponse
  - Added Interface NginxDeploymentApiKeyResponseProperties
  - Added Interface NginxDeploymentDefaultWafPolicyListResponse
  - Added Interface NginxDeploymentDefaultWafPolicyProperties
  - Added Interface NginxDeploymentPropertiesNginxAppProtect
  - Added Interface NginxDeploymentScalingPropertiesAutoScaleSettings
  - Added Interface NginxDeploymentUpdatePropertiesNginxAppProtect
  - Added Interface NginxDeploymentWafPolicy
  - Added Interface NginxDeploymentWafPolicyApplyingStatus
  - Added Interface NginxDeploymentWafPolicyCompilingStatus
  - Added Interface NginxDeploymentWafPolicyMetadata
  - Added Interface NginxDeploymentWafPolicyMetadataProperties
  - Added Interface NginxDeploymentWafPolicyProperties
  - Added Interface Operation
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface ScaleProfile
  - Added Interface ScaleProfileCapacity
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Added Interface WafPolicyCreateOptionalParams
  - Added Interface WafPolicyDeleteOptionalParams
  - Added Interface WafPolicyGetOptionalParams
  - Added Interface WafPolicyListOptionalParams
  - Added Interface WebApplicationFirewallComponentVersions
  - Added Interface WebApplicationFirewallPackage
  - Added Interface WebApplicationFirewallSettings
  - Added Interface WebApplicationFirewallStatus
  - Interface NginxCertificateProperties has a new optional parameter certificateError
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretCreated
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretVersion
  - Interface NginxCertificateProperties has a new optional parameter sha1Thumbprint
  - Interface NginxDeploymentProperties has a new optional parameter autoUpgradeProfile
  - Interface NginxDeploymentProperties has a new optional parameter dataplaneApiEndpoint
  - Interface NginxDeploymentProperties has a new optional parameter nginxAppProtect
  - Interface NginxDeploymentScalingProperties has a new optional parameter profiles
  - Interface NginxDeploymentUpdateProperties has a new optional parameter autoUpgradeProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter networkProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter webApplicationFirewallSettings
  - Added Type Alias ActionType
  - Added Type Alias ActivationState
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Level
  - Added Type Alias NginxDeploymentWafPolicyApplyingStatusCode
  - Added Type Alias NginxDeploymentWafPolicyCompilingStatusCode
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownActivationState
  - Added Enum KnownLevel
  - Added Enum KnownNginxDeploymentWafPolicyApplyingStatusCode
  - Added Enum KnownNginxDeploymentWafPolicyCompilingStatusCode
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface ErrorResponseBody
  - Removed Interface NginxCertificateListResponse
  - Removed Interface NginxConfigurationListResponse
  - Removed Interface NginxDeploymentListResponse
  - Removed Interface ResourceProviderDefaultErrorResponse
  - Interface NginxConfiguration no longer has parameter location
  - Interface NginxDeploymentProperties no longer has parameter managedResourceGroup
  - Parameter location of interface NginxDeployment is now required

    
## 4.0.0-beta.2 (2025-02-20)
Compared with version 3.0.0
    
### Features Added

  - Added operation group ApiKeys
  - Added operation Configurations.analysis
  - Added Interface AnalysisCreate
  - Added Interface AnalysisCreateConfig
  - Added Interface AnalysisDiagnostic
  - Added Interface AnalysisResult
  - Added Interface AnalysisResultData
  - Added Interface ApiKeysCreateOrUpdateOptionalParams
  - Added Interface ApiKeysDeleteOptionalParams
  - Added Interface ApiKeysGetOptionalParams
  - Added Interface ApiKeysListNextOptionalParams
  - Added Interface ApiKeysListOptionalParams
  - Added Interface AutoUpgradeProfile
  - Added Interface ConfigurationsAnalysisOptionalParams
  - Added Interface DiagnosticItem
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface NginxCertificateErrorResponseBody
  - Added Interface NginxConfigurationProtectedFileRequest
  - Added Interface NginxConfigurationProtectedFileResponse
  - Added Interface NginxConfigurationRequest
  - Added Interface NginxConfigurationRequestProperties
  - Added Interface NginxConfigurationResponse
  - Added Interface NginxConfigurationResponseProperties
  - Added Interface NginxDeploymentApiKeyListResponse
  - Added Interface NginxDeploymentApiKeyRequest
  - Added Interface NginxDeploymentApiKeyRequestProperties
  - Added Interface NginxDeploymentApiKeyResponse
  - Added Interface NginxDeploymentApiKeyResponseProperties
  - Added Interface NginxDeploymentPropertiesNginxAppProtect
  - Added Interface NginxDeploymentUpdatePropertiesNginxAppProtect
  - Added Interface ScaleProfile
  - Added Interface ScaleProfileCapacity
  - Added Interface WebApplicationFirewallComponentVersions
  - Added Interface WebApplicationFirewallPackage
  - Added Interface WebApplicationFirewallSettings
  - Added Interface WebApplicationFirewallStatus
  - Added Type Alias ActivationState
  - Added Type Alias ApiKeysCreateOrUpdateResponse
  - Added Type Alias ApiKeysGetResponse
  - Added Type Alias ApiKeysListNextResponse
  - Added Type Alias ApiKeysListResponse
  - Added Type Alias ConfigurationsAnalysisResponse
  - Added Type Alias Level
  - Interface NginxCertificateProperties has a new optional parameter certificateError
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretCreated
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretVersion
  - Interface NginxCertificateProperties has a new optional parameter sha1Thumbprint
  - Interface NginxDeploymentProperties has a new optional parameter autoUpgradeProfile
  - Interface NginxDeploymentProperties has a new optional parameter dataplaneApiEndpoint
  - Interface NginxDeploymentProperties has a new optional parameter nginxAppProtect
  - Interface NginxDeploymentScalingProperties has a new optional parameter profiles
  - Interface NginxDeploymentUpdateProperties has a new optional parameter autoUpgradeProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter networkProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter nginxAppProtect
  - Added Enum KnownActivationState
  - Added Enum KnownLevel

### Breaking Changes

  - Interface NginxDeploymentProperties no longer has parameter managedResourceGroup
  - Type of parameter body of interface ConfigurationsCreateOrUpdateOptionalParams is changed from NginxConfiguration to NginxConfigurationRequest
  - Type of parameter value of interface NginxConfigurationListResponse is changed from NginxConfiguration[] to NginxConfigurationResponse[]
    
    
## 4.0.0-beta.1 (2024-03-18)
    
### Features Added

  - Added operation Configurations.analysis
  - Added Interface AnalysisCreate
  - Added Interface AnalysisCreateConfig
  - Added Interface AnalysisDiagnostic
  - Added Interface AnalysisResult
  - Added Interface AnalysisResultData
  - Added Interface AutoUpgradeProfile
  - Added Interface ConfigurationsAnalysisOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface NginxCertificateErrorResponseBody
  - Added Interface ScaleProfile
  - Added Interface ScaleProfileCapacity
  - Added Type Alias ConfigurationsAnalysisResponse
  - Interface NginxCertificateProperties has a new optional parameter certificateError
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretCreated
  - Interface NginxCertificateProperties has a new optional parameter keyVaultSecretVersion
  - Interface NginxCertificateProperties has a new optional parameter sha1Thumbprint
  - Interface NginxDeploymentProperties has a new optional parameter autoUpgradeProfile
  - Interface NginxDeploymentScalingProperties has a new optional parameter profiles
  - Interface NginxDeploymentUpdateProperties has a new optional parameter autoUpgradeProfile

### Breaking Changes

  - Type of parameter error of interface ResourceProviderDefaultErrorResponse is changed from ErrorResponseBody to ErrorDetail
    
    
## 3.0.0 (2023-11-09)
    
### Features Added

  - Added Interface NginxDeploymentScalingProperties
  - Added Interface NginxDeploymentUserProfile
  - Interface NginxConfigurationPackage has a new optional parameter protectedFiles
  - Interface NginxDeploymentProperties has a new optional parameter scalingProperties
  - Interface NginxDeploymentProperties has a new optional parameter userProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter scalingProperties
  - Interface NginxDeploymentUpdateProperties has a new optional parameter userProfile

### Breaking Changes

  - Interface NginxCertificate no longer has parameter tags
  - Interface NginxConfiguration no longer has parameter tags
    
## 2.0.1 (2023-01-30)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 2.0.0 (2022-10-21)
    
### Features Added

  - Added operation Certificates.beginCreateOrUpdate
  - Added operation Certificates.beginCreateOrUpdateAndWait
  - Added operation Deployments.beginCreateOrUpdate
  - Added operation Deployments.beginCreateOrUpdateAndWait
  - Added Interface CertificatesCreateOrUpdateOptionalParams
  - Added Interface DeploymentsCreateOrUpdateOptionalParams
  - Added Type Alias CertificatesCreateOrUpdateResponse
  - Added Type Alias DeploymentsCreateOrUpdateResponse
  - Interface NginxConfigurationProperties has a new optional parameter protectedFiles

### Breaking Changes

  - Removed operation Certificates.beginCreate
  - Removed operation Certificates.beginCreateAndWait
  - Removed operation Deployments.beginCreate
  - Removed operation Deployments.beginCreateAndWait
    
    
## 1.0.0 (2022-08-23)

The package of @azure/arm-nginx is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
