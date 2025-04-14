# Release History
    
## 3.0.0 (2023-09-06)
    
### Features Added

  - Added operation group JitRequests
  - Added operation ApplicationDefinitions.createOrUpdate
  - Added operation ApplicationDefinitions.createOrUpdateById
  - Added operation ApplicationDefinitions.delete
  - Added operation ApplicationDefinitions.deleteById
  - Added operation ApplicationDefinitions.listBySubscription
  - Added operation ApplicationDefinitions.update
  - Added operation ApplicationDefinitions.updateById
  - Added operation Applications.beginRefreshPermissions
  - Added operation Applications.beginRefreshPermissionsAndWait
  - Added operation Applications.beginUpdate
  - Added operation Applications.beginUpdateAccess
  - Added operation Applications.beginUpdateAccessAndWait
  - Added operation Applications.beginUpdateAndWait
  - Added operation Applications.beginUpdateById
  - Added operation Applications.beginUpdateByIdAndWait
  - Added operation Applications.listAllowedUpgradePlans
  - Added operation Applications.listTokens
  - Added Interface AllowedUpgradePlansResult
  - Added Interface ApplicationAuthorization
  - Added Interface ApplicationBillingDetailsDefinition
  - Added Interface ApplicationClientDetails
  - Added Interface ApplicationDefinitionArtifact
  - Added Interface ApplicationDefinitionPatchable
  - Added Interface ApplicationDefinitionsListBySubscriptionNextOptionalParams
  - Added Interface ApplicationDefinitionsListBySubscriptionOptionalParams
  - Added Interface ApplicationDefinitionsUpdateByIdOptionalParams
  - Added Interface ApplicationDefinitionsUpdateOptionalParams
  - Added Interface ApplicationDeploymentPolicy
  - Added Interface ApplicationJitAccessPolicy
  - Added Interface ApplicationManagementPolicy
  - Added Interface ApplicationNotificationEndpoint
  - Added Interface ApplicationNotificationPolicy
  - Added Interface ApplicationPackageContact
  - Added Interface ApplicationPackageLockingPolicyDefinition
  - Added Interface ApplicationPackageSupportUrls
  - Added Interface ApplicationPolicy
  - Added Interface ApplicationsListAllowedUpgradePlansOptionalParams
  - Added Interface ApplicationsListTokensOptionalParams
  - Added Interface ApplicationsRefreshPermissionsOptionalParams
  - Added Interface ApplicationsUpdateAccessOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface JitApproverDefinition
  - Added Interface JitAuthorizationPolicies
  - Added Interface JitRequestDefinition
  - Added Interface JitRequestDefinitionListResult
  - Added Interface JitRequestMetadata
  - Added Interface JitRequestPatchable
  - Added Interface JitRequestsCreateOrUpdateOptionalParams
  - Added Interface JitRequestsDeleteOptionalParams
  - Added Interface JitRequestsGetOptionalParams
  - Added Interface JitRequestsListByResourceGroupOptionalParams
  - Added Interface JitRequestsListBySubscriptionOptionalParams
  - Added Interface JitRequestsUpdateOptionalParams
  - Added Interface JitSchedulingPolicy
  - Added Interface ListTokenRequest
  - Added Interface ManagedIdentityToken
  - Added Interface ManagedIdentityTokenResult
  - Added Interface SystemData
  - Added Interface UpdateAccessDefinition
  - Added Interface UserAssignedResourceIdentity
  - Added Type Alias ActionType
  - Added Type Alias ApplicationArtifactName
  - Added Type Alias ApplicationDefinitionArtifactName
  - Added Type Alias ApplicationDefinitionsListBySubscriptionNextResponse
  - Added Type Alias ApplicationDefinitionsListBySubscriptionResponse
  - Added Type Alias ApplicationDefinitionsUpdateByIdResponse
  - Added Type Alias ApplicationDefinitionsUpdateResponse
  - Added Type Alias ApplicationManagementMode
  - Added Type Alias ApplicationsListAllowedUpgradePlansResponse
  - Added Type Alias ApplicationsListTokensResponse
  - Added Type Alias CreatedByType
  - Added Type Alias DeploymentMode
  - Added Type Alias JitApprovalMode
  - Added Type Alias JitApproverType
  - Added Type Alias JitRequestsCreateOrUpdateResponse
  - Added Type Alias JitRequestsGetResponse
  - Added Type Alias JitRequestsListByResourceGroupResponse
  - Added Type Alias JitRequestsListBySubscriptionResponse
  - Added Type Alias JitRequestState
  - Added Type Alias JitRequestsUpdateResponse
  - Added Type Alias JitSchedulingType
  - Added Type Alias Origin
  - Added Type Alias ResourceIdentityType
  - Added Type Alias Status
  - Added Type Alias Substatus
  - Interface Application has a new optional parameter artifacts
  - Interface Application has a new optional parameter authorizations
  - Interface Application has a new optional parameter billingDetails
  - Interface Application has a new optional parameter createdBy
  - Interface Application has a new optional parameter customerSupport
  - Interface Application has a new optional parameter identity
  - Interface Application has a new optional parameter jitAccessPolicy
  - Interface Application has a new optional parameter managementMode
  - Interface Application has a new optional parameter publisherTenantId
  - Interface Application has a new optional parameter supportUrls
  - Interface Application has a new optional parameter updatedBy
  - Interface ApplicationDefinition has a new optional parameter deploymentPolicy
  - Interface ApplicationDefinition has a new optional parameter lockingPolicy
  - Interface ApplicationDefinition has a new optional parameter managementPolicy
  - Interface ApplicationDefinition has a new optional parameter notificationPolicy
  - Interface ApplicationDefinition has a new optional parameter policies
  - Interface ApplicationDefinition has a new optional parameter storageAccountId
  - Interface ApplicationPatchable has a new optional parameter artifacts
  - Interface ApplicationPatchable has a new optional parameter authorizations
  - Interface ApplicationPatchable has a new optional parameter billingDetails
  - Interface ApplicationPatchable has a new optional parameter createdBy
  - Interface ApplicationPatchable has a new optional parameter customerSupport
  - Interface ApplicationPatchable has a new optional parameter identity
  - Interface ApplicationPatchable has a new optional parameter jitAccessPolicy
  - Interface ApplicationPatchable has a new optional parameter managementMode
  - Interface ApplicationPatchable has a new optional parameter publisherTenantId
  - Interface ApplicationPatchable has a new optional parameter supportUrls
  - Interface ApplicationPatchable has a new optional parameter updatedBy
  - Interface ApplicationsUpdateByIdOptionalParams has a new optional parameter resumeFrom
  - Interface ApplicationsUpdateByIdOptionalParams has a new optional parameter updateIntervalInMs
  - Interface ApplicationsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface ApplicationsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface ErrorResponse has a new optional parameter error
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface OperationDisplay has a new optional parameter description
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownActionType
  - Added Enum KnownApplicationArtifactName
  - Added Enum KnownApplicationDefinitionArtifactName
  - Added Enum KnownApplicationManagementMode
  - Added Enum KnownCreatedByType
  - Added Enum KnownDeploymentMode
  - Added Enum KnownJitApprovalMode
  - Added Enum KnownJitApproverType
  - Added Enum KnownJitRequestState
  - Added Enum KnownJitSchedulingType
  - Added Enum KnownOrigin
  - Added Enum KnownStatus
  - Added Enum KnownSubstatus
  - Enum KnownProvisioningState has a new value NotSpecified

### Breaking Changes

  - Removed operation ApplicationDefinitions.beginCreateOrUpdate
  - Removed operation ApplicationDefinitions.beginCreateOrUpdateAndWait
  - Removed operation ApplicationDefinitions.beginCreateOrUpdateById
  - Removed operation ApplicationDefinitions.beginCreateOrUpdateByIdAndWait
  - Removed operation ApplicationDefinitions.beginDelete
  - Removed operation ApplicationDefinitions.beginDeleteAndWait
  - Removed operation ApplicationDefinitions.beginDeleteById
  - Removed operation ApplicationDefinitions.beginDeleteByIdAndWait
  - Removed operation Applications.update
  - Removed operation Applications.updateById
  - Class ApplicationClient has a new signature
  - Interface ApplicationDefinitionsCreateOrUpdateByIdOptionalParams no longer has parameter resumeFrom
  - Interface ApplicationDefinitionsCreateOrUpdateByIdOptionalParams no longer has parameter updateIntervalInMs
  - Interface ApplicationDefinitionsCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface ApplicationDefinitionsCreateOrUpdateOptionalParams no longer has parameter updateIntervalInMs
  - Interface ApplicationDefinitionsDeleteByIdOptionalParams no longer has parameter resumeFrom
  - Interface ApplicationDefinitionsDeleteByIdOptionalParams no longer has parameter updateIntervalInMs
  - Interface ApplicationDefinitionsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ApplicationDefinitionsDeleteOptionalParams no longer has parameter updateIntervalInMs
  - Interface ErrorResponse no longer has parameter errorCode
  - Interface ErrorResponse no longer has parameter errorMessage
  - Interface ErrorResponse no longer has parameter httpStatus
  - Interface GenericResource no longer has parameter identity
  - Parameter name of interface ApplicationArtifact is now required
  - Parameter type of interface ApplicationArtifact is now required
  - Parameter uri of interface ApplicationArtifact is now required
  - Type of parameter name of interface ApplicationArtifact is changed from string to ApplicationArtifactName
  - Type of parameter artifacts of interface ApplicationDefinition is changed from ApplicationArtifact[] to ApplicationDefinitionArtifact[]
  - Type of parameter authorizations of interface ApplicationDefinition is changed from ApplicationProviderAuthorization[] to ApplicationAuthorization[]
  - Type of parameter isEnabled of interface ApplicationDefinition is changed from string to boolean
  - Type of parameter parameters of interface ApplicationsUpdateByIdOptionalParams is changed from Application to ApplicationPatchable
  - Type of parameter type of interface Identity is changed from "SystemAssigned" to ResourceIdentityType
  - Enum KnownProvisioningState no longer has value Created
  - Enum KnownProvisioningState no longer has value Creating
  - Enum KnownProvisioningState no longer has value Ready
    
    
## 2.1.0 (2022-11-22)
    
### Features Added

  - Added Interface Application
  - Added Interface ApplicationDefinition
  - Added Interface ApplicationPatchable
  - Added Interface GenericResource
    
## 2.0.1 (2022-04-18)

### Features Added

  - Bug fix

## 2.0.0 (2021-12-07)

The package of @azure/arm-managedapplications is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
