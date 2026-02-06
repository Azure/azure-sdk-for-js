# Release History

## 7.0.0 (2026-02-05)

### Features Added
  - Added operation group PolicyTokensOperations
  - Added Interface ErrorDetail
  - Added Interface ExtensionResource
  - Added Interface ExternalEvaluationEndpointInvocationResult
  - Added Interface ExternalEvaluationEndpointSettings
  - Added Interface ExternalEvaluationEnforcementSettings
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PolicyAssignmentProperties
  - Added Interface PolicyAssignmentUpdateProperties
  - Added Interface PolicyDefinitionProperties
  - Added Interface PolicyDefinitionVersionProperties
  - Added Interface PolicyLogInfo
  - Added Interface PolicySetDefinitionProperties
  - Added Interface PolicySetDefinitionVersionProperties
  - Added Interface PolicyTokenOperation
  - Added Interface PolicyTokenRequest
  - Added Interface PolicyTokenResponse
  - Added Interface PolicyTokensAcquireAtManagementGroupOptionalParams
  - Added Interface PolicyTokensAcquireOptionalParams
  - Added Interface ProxyResource
  - Added Interface Resource
  - Interface ErrorResponse has a new optional parameter error
  - Interface ParameterDefinitionsValueMetadata has a new optional parameter additionalProperties
  - Interface PolicyAssignment has a new optional parameter instanceId
  - Interface PolicyDefinition has a new optional parameter externalEvaluationEnforcementSettings
  - Interface PolicyDefinitionVersion has a new optional parameter externalEvaluationEnforcementSettings
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ExternalEndpointResult
  - Added Type Alias PolicyTokenResult
  - Added Enum AzureClouds
  - Added Enum KnownExternalEndpointResult
  - Added Enum KnownPolicyTokenResult
  - Added Enum KnownVersions
  - Enum KnownEnforcementMode has a new value Enroll

### Breaking Changes
  - Removed operation PolicyAssignments.createById
  - Removed operation PolicyAssignments.deleteById
  - Removed operation PolicyAssignments.getById
  - Removed operation PolicyAssignments.updateById
  - Removed Interface CloudError
  - Removed Interface PolicyAssignmentsCreateByIdOptionalParams
  - Removed Interface PolicyAssignmentsDeleteByIdOptionalParams
  - Removed Interface PolicyAssignmentsGetByIdOptionalParams
  - Removed Interface PolicyAssignmentsUpdateByIdOptionalParams
  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target

    
## 6.0.0 (2025-03-28)
    
### Features Added

  - Added operation group PolicyDefinitionVersions
  - Added operation group PolicySetDefinitionVersions
  - Added Interface Override
  - Added Interface PolicyDefinitionVersion
  - Added Interface PolicyDefinitionVersionListResult
  - Added Interface PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams
  - Added Interface PolicyDefinitionVersionsCreateOrUpdateOptionalParams
  - Added Interface PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams
  - Added Interface PolicyDefinitionVersionsDeleteOptionalParams
  - Added Interface PolicyDefinitionVersionsGetAtManagementGroupOptionalParams
  - Added Interface PolicyDefinitionVersionsGetBuiltInOptionalParams
  - Added Interface PolicyDefinitionVersionsGetOptionalParams
  - Added Interface PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams
  - Added Interface PolicyDefinitionVersionsListAllBuiltinsOptionalParams
  - Added Interface PolicyDefinitionVersionsListAllOptionalParams
  - Added Interface PolicyDefinitionVersionsListBuiltInNextOptionalParams
  - Added Interface PolicyDefinitionVersionsListBuiltInOptionalParams
  - Added Interface PolicyDefinitionVersionsListByManagementGroupNextOptionalParams
  - Added Interface PolicyDefinitionVersionsListByManagementGroupOptionalParams
  - Added Interface PolicyDefinitionVersionsListNextOptionalParams
  - Added Interface PolicyDefinitionVersionsListOptionalParams
  - Added Interface PolicySetDefinitionVersion
  - Added Interface PolicySetDefinitionVersionListResult
  - Added Interface PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams
  - Added Interface PolicySetDefinitionVersionsCreateOrUpdateOptionalParams
  - Added Interface PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams
  - Added Interface PolicySetDefinitionVersionsDeleteOptionalParams
  - Added Interface PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams
  - Added Interface PolicySetDefinitionVersionsGetBuiltInOptionalParams
  - Added Interface PolicySetDefinitionVersionsGetOptionalParams
  - Added Interface PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams
  - Added Interface PolicySetDefinitionVersionsListAllBuiltinsOptionalParams
  - Added Interface PolicySetDefinitionVersionsListAllOptionalParams
  - Added Interface PolicySetDefinitionVersionsListBuiltInNextOptionalParams
  - Added Interface PolicySetDefinitionVersionsListBuiltInOptionalParams
  - Added Interface PolicySetDefinitionVersionsListByManagementGroupNextOptionalParams
  - Added Interface PolicySetDefinitionVersionsListByManagementGroupOptionalParams
  - Added Interface PolicySetDefinitionVersionsListNextOptionalParams
  - Added Interface PolicySetDefinitionVersionsListOptionalParams
  - Added Interface ResourceSelector
  - Added Interface Selector
  - Added Type Alias AssignmentType
  - Added Type Alias OverrideKind
  - Added Type Alias PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupResponse
  - Added Type Alias PolicyDefinitionVersionsCreateOrUpdateResponse
  - Added Type Alias PolicyDefinitionVersionsGetAtManagementGroupResponse
  - Added Type Alias PolicyDefinitionVersionsGetBuiltInResponse
  - Added Type Alias PolicyDefinitionVersionsGetResponse
  - Added Type Alias PolicyDefinitionVersionsListAllAtManagementGroupResponse
  - Added Type Alias PolicyDefinitionVersionsListAllBuiltinsResponse
  - Added Type Alias PolicyDefinitionVersionsListAllResponse
  - Added Type Alias PolicyDefinitionVersionsListBuiltInNextResponse
  - Added Type Alias PolicyDefinitionVersionsListBuiltInResponse
  - Added Type Alias PolicyDefinitionVersionsListByManagementGroupNextResponse
  - Added Type Alias PolicyDefinitionVersionsListByManagementGroupResponse
  - Added Type Alias PolicyDefinitionVersionsListNextResponse
  - Added Type Alias PolicyDefinitionVersionsListResponse
  - Added Type Alias PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupResponse
  - Added Type Alias PolicySetDefinitionVersionsCreateOrUpdateResponse
  - Added Type Alias PolicySetDefinitionVersionsGetAtManagementGroupResponse
  - Added Type Alias PolicySetDefinitionVersionsGetBuiltInResponse
  - Added Type Alias PolicySetDefinitionVersionsGetResponse
  - Added Type Alias PolicySetDefinitionVersionsListAllAtManagementGroupResponse
  - Added Type Alias PolicySetDefinitionVersionsListAllBuiltinsResponse
  - Added Type Alias PolicySetDefinitionVersionsListAllResponse
  - Added Type Alias PolicySetDefinitionVersionsListBuiltInNextResponse
  - Added Type Alias PolicySetDefinitionVersionsListBuiltInResponse
  - Added Type Alias PolicySetDefinitionVersionsListByManagementGroupNextResponse
  - Added Type Alias PolicySetDefinitionVersionsListByManagementGroupResponse
  - Added Type Alias PolicySetDefinitionVersionsListNextResponse
  - Added Type Alias PolicySetDefinitionVersionsListResponse
  - Added Type Alias SelectorKind
  - Interface ParameterDefinitionsValue has a new optional parameter schema
  - Interface PolicyAssignment has a new optional parameter assignmentType
  - Interface PolicyAssignment has a new optional parameter definitionVersion
  - Interface PolicyAssignment has a new optional parameter effectiveDefinitionVersion
  - Interface PolicyAssignment has a new optional parameter latestDefinitionVersion
  - Interface PolicyAssignment has a new optional parameter overrides
  - Interface PolicyAssignment has a new optional parameter resourceSelectors
  - Interface PolicyAssignmentsGetByIdOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentsGetOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentsListForManagementGroupOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentsListForResourceGroupOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentsListForResourceOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentsListOptionalParams has a new optional parameter expand
  - Interface PolicyAssignmentUpdate has a new optional parameter overrides
  - Interface PolicyAssignmentUpdate has a new optional parameter resourceSelectors
  - Interface PolicyClientOptionalParams has a new optional parameter apiVersion
  - Interface PolicyDefinition has a new optional parameter version
  - Interface PolicyDefinition has a new optional parameter versions
  - Interface PolicyDefinitionReference has a new optional parameter definitionVersion
  - Interface PolicyDefinitionReference has a new optional parameter effectiveDefinitionVersion
  - Interface PolicyDefinitionReference has a new optional parameter latestDefinitionVersion
  - Interface PolicySetDefinition has a new optional parameter version
  - Interface PolicySetDefinition has a new optional parameter versions
  - Interface PolicySetDefinitionsGetAtManagementGroupOptionalParams has a new optional parameter expand
  - Interface PolicySetDefinitionsGetBuiltInOptionalParams has a new optional parameter expand
  - Interface PolicySetDefinitionsGetOptionalParams has a new optional parameter expand
  - Interface PolicySetDefinitionsListBuiltInOptionalParams has a new optional parameter expand
  - Interface PolicySetDefinitionsListByManagementGroupOptionalParams has a new optional parameter expand
  - Interface PolicySetDefinitionsListOptionalParams has a new optional parameter expand
  - Added Enum KnownAssignmentType
  - Added Enum KnownOverrideKind
  - Added Enum KnownSelectorKind

### Breaking Changes

  - Removed operation group DataPolicyManifests
  - Removed operation group PolicyExemptions
  - Class PolicyClient no longer has parameter dataPolicyManifests
  - Class PolicyClient no longer has parameter policyExemptions
  - Removed Enum KnownAliasPathAttributes
  - Removed Enum KnownAliasPathTokenType
  - Removed Enum KnownExemptionCategory
    
## 5.2.0-beta.1 (2025-01-13)

### Features Added

- release a preview version to resolve doc issue

## 5.1.0 (2023-05-18)
    
### Features Added

  - Interface DataPolicyManifestsListNextOptionalParams no longer has parameter filter
  - Interface PolicyAssignmentsListForManagementGroupNextOptionalParams no longer has parameter filter
  - Interface PolicyAssignmentsListForManagementGroupNextOptionalParams no longer has parameter top
  - Interface PolicyAssignmentsListForResourceGroupNextOptionalParams no longer has parameter filter
  - Interface PolicyAssignmentsListForResourceGroupNextOptionalParams no longer has parameter top
  - Interface PolicyAssignmentsListForResourceNextOptionalParams no longer has parameter filter
  - Interface PolicyAssignmentsListForResourceNextOptionalParams no longer has parameter top
  - Interface PolicyAssignmentsListNextOptionalParams no longer has parameter filter
  - Interface PolicyAssignmentsListNextOptionalParams no longer has parameter top
  - Interface PolicyDefinitionsListBuiltInNextOptionalParams no longer has parameter filter
  - Interface PolicyDefinitionsListBuiltInNextOptionalParams no longer has parameter top
  - Interface PolicyDefinitionsListByManagementGroupNextOptionalParams no longer has parameter filter
  - Interface PolicyDefinitionsListByManagementGroupNextOptionalParams no longer has parameter top
  - Interface PolicyDefinitionsListNextOptionalParams no longer has parameter filter
  - Interface PolicyDefinitionsListNextOptionalParams no longer has parameter top
  - Interface PolicyExemptionsListForManagementGroupNextOptionalParams no longer has parameter filter
  - Interface PolicyExemptionsListForResourceGroupNextOptionalParams no longer has parameter filter
  - Interface PolicyExemptionsListForResourceNextOptionalParams no longer has parameter filter
  - Interface PolicyExemptionsListNextOptionalParams no longer has parameter filter
  - Interface PolicySetDefinitionsListBuiltInNextOptionalParams no longer has parameter filter
  - Interface PolicySetDefinitionsListBuiltInNextOptionalParams no longer has parameter top
  - Interface PolicySetDefinitionsListByManagementGroupNextOptionalParams no longer has parameter filter
  - Interface PolicySetDefinitionsListByManagementGroupNextOptionalParams no longer has parameter top
  - Interface PolicySetDefinitionsListNextOptionalParams no longer has parameter filter
  - Interface PolicySetDefinitionsListNextOptionalParams no longer has parameter top
    
## 5.0.3 (2022-11-28)

### Features Added

 -  Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 5.0.2 (2022-07-04)

### Features Added

  - Bug fix

## 5.0.1 (2022-04-18)

### Features Added

  - Bug fix

## 5.0.0 (2021-12-07)

The package of @azure/arm-policy is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
