# Release History
    
## 6.0.0-beta.4 (2024-01-22)
    
**Features**

  - Added operation group ComponentPolicyStates
  - Added operation PolicyRestrictions.checkAtManagementGroupScope
  - Added Interface Attestation
  - Added Interface CheckManagementGroupRestrictionsRequest
  - Added Interface CheckRestrictionEvaluationDetails
  - Added Interface ComponentExpressionEvaluationDetails
  - Added Interface ComponentPolicyEvaluationDetails
  - Added Interface ComponentPolicyState
  - Added Interface ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams
  - Added Interface ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams
  - Added Interface ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams
  - Added Interface ComponentPolicyStatesListQueryResultsForResourceOptionalParams
  - Added Interface ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams
  - Added Interface ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams
  - Added Interface ComponentPolicyStatesQueryResults
  - Added Interface PolicyEffectDetails
  - Added Interface PolicyMetadataProperties
  - Added Interface PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams
  - Added Type Alias ComponentPolicyStatesListQueryResultsForPolicyDefinitionResponse
  - Added Type Alias ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentResponse
  - Added Type Alias ComponentPolicyStatesListQueryResultsForResourceGroupResponse
  - Added Type Alias ComponentPolicyStatesListQueryResultsForResourceResponse
  - Added Type Alias ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentResponse
  - Added Type Alias ComponentPolicyStatesListQueryResultsForSubscriptionResponse
  - Added Type Alias ComponentPolicyStatesResource
  - Added Type Alias PolicyEventsResourceType
  - Added Type Alias PolicyRestrictionsCheckAtManagementGroupScopeResponse
  - Added Type Alias PolicyStatesSummaryResourceType
  - Added Type Alias PolicyTrackedResourcesResourceType
  - Interface CheckRestrictionsRequest has a new optional parameter includeAuditEffect
  - Interface FieldRestriction has a new optional parameter policyEffect
  - Interface FieldRestriction has a new optional parameter reason
  - Interface Operation has a new optional parameter isDataAction
  - Interface PolicyEvaluationResult has a new optional parameter effectDetails
  - Added Enum KnownComponentPolicyStatesResource
  - Added Enum KnownPolicyEventsResourceType
  - Added Enum KnownPolicyStatesSummaryResourceType
  - Added Enum KnownPolicyTrackedResourcesResourceType
  - Enum KnownFieldRestrictionResult has a new value Audit
  - Added function getContinuationToken

**Breaking Changes**

  - Operation PolicyEvents.listQueryResultsForManagementGroup has a new signature
  - Operation PolicyEvents.listQueryResultsForPolicyDefinition has a new signature
  - Operation PolicyEvents.listQueryResultsForPolicySetDefinition has a new signature
  - Operation PolicyEvents.listQueryResultsForResource has a new signature
  - Operation PolicyEvents.listQueryResultsForResourceGroup has a new signature
  - Operation PolicyEvents.listQueryResultsForResourceGroupLevelPolicyAssignment has a new signature
  - Operation PolicyEvents.listQueryResultsForSubscription has a new signature
  - Operation PolicyEvents.listQueryResultsForSubscriptionLevelPolicyAssignment has a new signature
  - Operation PolicyStates.summarizeForManagementGroup has a new signature
  - Operation PolicyStates.summarizeForPolicyDefinition has a new signature
  - Operation PolicyStates.summarizeForPolicySetDefinition has a new signature
  - Operation PolicyStates.summarizeForResource has a new signature
  - Operation PolicyStates.summarizeForResourceGroup has a new signature
  - Operation PolicyStates.summarizeForResourceGroupLevelPolicyAssignment has a new signature
  - Operation PolicyStates.summarizeForSubscription has a new signature
  - Operation PolicyStates.summarizeForSubscriptionLevelPolicyAssignment has a new signature
  - Operation PolicyTrackedResources.listQueryResultsForManagementGroup has a new signature
  - Operation PolicyTrackedResources.listQueryResultsForResource has a new signature
  - Operation PolicyTrackedResources.listQueryResultsForResourceGroup has a new signature
  - Operation PolicyTrackedResources.listQueryResultsForSubscription has a new signature
  - Class PolicyInsightsClient has a new signature
  - Interface AttestationsListForResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface AttestationsListForResourceNextOptionalParams no longer has parameter queryOptions
  - Interface AttestationsListForSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForManagementGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForPolicyDefinitionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForPolicySetDefinitionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForResourceNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyEventsListQueryResultsForSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyMetadataListNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForManagementGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForPolicyDefinitionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForPolicySetDefinitionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForResourceNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyStatesListQueryResultsForSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyTrackedResourcesListQueryResultsForManagementGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyTrackedResourcesListQueryResultsForResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyTrackedResourcesListQueryResultsForResourceNextOptionalParams no longer has parameter queryOptions
  - Interface PolicyTrackedResourcesListQueryResultsForSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListDeploymentsAtManagementGroupNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListDeploymentsAtResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListDeploymentsAtResourceNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListDeploymentsAtSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListForManagementGroupNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListForResourceGroupNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListForResourceNextOptionalParams no longer has parameter queryOptions
  - Interface RemediationsListForSubscriptionNextOptionalParams no longer has parameter queryOptions
  - Type of parameter evaluationDetails of interface PolicyEvaluationResult is changed from PolicyEvaluationDetails to CheckRestrictionEvaluationDetails
    
    
## 5.0.0 (2022-01-24)

The package of @azure/arm-policyinsights is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
