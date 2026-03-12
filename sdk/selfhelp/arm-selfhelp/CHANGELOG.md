# Release History

## 2.0.0-beta.7 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.6 (2025-08-22)

### Other Changes

  - Other fixes

## 2.0.0-beta.5 (2024-06-26)
Compared with version 1.0.0
    
### Features Added

  - Added operation group CheckNameAvailability
  - Added operation group DiscoverySolutionNLP
  - Added operation group SimplifiedSolutions
  - Added operation group Solution
  - Added operation group SolutionSelfHelp
  - Added operation group Troubleshooters
  - Added Interface AutomatedCheckResult
  - Added Interface CheckNameAvailabilityCheckAvailabilityOptionalParams
  - Added Interface ClassificationService
  - Added Interface ContinueRequestBody
  - Added Interface DiscoveryNlpRequest
  - Added Interface DiscoveryNlpResponse
  - Added Interface DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams
  - Added Interface DiscoverySolutionNLPDiscoverSolutionsOptionalParams
  - Added Interface Filter
  - Added Interface FilterGroup
  - Added Interface MetricsBasedChart
  - Added Interface ReplacementMaps
  - Added Interface ReplacementMapsSelfHelp
  - Added Interface ResponseOption
  - Added Interface ResponseValidationProperties
  - Added Interface RestartTroubleshooterResponse
  - Added Interface SearchResult
  - Added Interface Section
  - Added Interface SectionSelfHelp
  - Added Interface SimplifiedSolutionsCreateOptionalParams
  - Added Interface SimplifiedSolutionsGetOptionalParams
  - Added Interface SimplifiedSolutionsResource
  - Added Interface SolutionCreateOptionalParams
  - Added Interface SolutionGetOptionalParams
  - Added Interface SolutionMetadataProperties
  - Added Interface SolutionNlpMetadataResource
  - Added Interface SolutionPatchRequestBody
  - Added Interface SolutionResource
  - Added Interface SolutionResourceSelfHelp
  - Added Interface SolutionsDiagnostic
  - Added Interface SolutionSelfHelpGetOptionalParams
  - Added Interface SolutionsTroubleshooters
  - Added Interface SolutionUpdateHeaders
  - Added Interface SolutionUpdateOptionalParams
  - Added Interface SolutionWarmUpOptionalParams
  - Added Interface SolutionWarmUpRequestBody
  - Added Interface Step
  - Added Interface StepInput
  - Added Interface TriggerCriterion
  - Added Interface TroubleshooterResource
  - Added Interface TroubleshooterResponse
  - Added Interface TroubleshootersContinueHeaders
  - Added Interface TroubleshootersContinueOptionalParams
  - Added Interface TroubleshootersCreateOptionalParams
  - Added Interface TroubleshootersEndHeaders
  - Added Interface TroubleshootersEndOptionalParams
  - Added Interface TroubleshootersGetOptionalParams
  - Added Interface TroubleshootersRestartHeaders
  - Added Interface TroubleshootersRestartOptionalParams
  - Added Interface Video
  - Added Interface VideoGroup
  - Added Interface VideoGroupVideo
  - Added Interface WebResult
  - Added Type Alias AggregationType
  - Added Type Alias AutomatedCheckResultType
  - Added Type Alias CheckNameAvailabilityCheckAvailabilityResponse
  - Added Type Alias Confidence
  - Added Type Alias DiagnosticProvisioningState
  - Added Type Alias DiscoverySolutionNLPDiscoverSolutionsBySubscriptionResponse
  - Added Type Alias DiscoverySolutionNLPDiscoverSolutionsResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias Name
  - Added Type Alias QuestionContentType
  - Added Type Alias QuestionType
  - Added Type Alias ResultType
  - Added Type Alias SimplifiedSolutionsCreateResponse
  - Added Type Alias SimplifiedSolutionsGetResponse
  - Added Type Alias SolutionCreateResponse
  - Added Type Alias SolutionGetResponse
  - Added Type Alias SolutionProvisioningState
  - Added Type Alias SolutionSelfHelpGetResponse
  - Added Type Alias SolutionType
  - Added Type Alias SolutionUpdateResponse
  - Added Type Alias TroubleshooterProvisioningState
  - Added Type Alias TroubleshootersContinueResponse
  - Added Type Alias TroubleshootersCreateResponse
  - Added Type Alias TroubleshootersEndResponse
  - Added Type Alias TroubleshootersGetResponse
  - Added Type Alias TroubleshootersRestartResponse
  - Added Type Alias Type
  - Added Type Alias ValidationScope
  - Interface SolutionMetadataResource has a new optional parameter solutions
  - Added Enum KnownAggregationType
  - Added Enum KnownAutomatedCheckResultType
  - Added Enum KnownConfidence
  - Added Enum KnownDiagnosticProvisioningState
  - Added Enum KnownExecutionStatus
  - Added Enum KnownName
  - Added Enum KnownQuestionContentType
  - Added Enum KnownQuestionType
  - Added Enum KnownResultType
  - Added Enum KnownSolutionProvisioningState
  - Added Enum KnownSolutionType
  - Added Enum KnownTroubleshooterProvisioningState
  - Added Enum KnownType
  - Added Enum KnownValidationScope

### Breaking Changes

  - Removed operation Diagnostics.checkNameAvailability
  - Operation DiscoverySolution.list has a new signature
  - Interface SolutionMetadataResource no longer has parameter description
  - Interface SolutionMetadataResource no longer has parameter requiredParameterSets
  - Interface SolutionMetadataResource no longer has parameter solutionId
  - Interface SolutionMetadataResource no longer has parameter solutionType
  - Type of parameter provisioningState of interface DiagnosticResource is changed from ProvisioningState to DiagnosticProvisioningState
  - Removed Enum KnownProvisioningState
    
    
## 2.0.0-beta.4 (2024-05-10)
    
### Features Added

  - Added operation group CheckNameAvailability
  - Added operation group DiscoverySolutionNLPSubscriptionScope
  - Added operation group DiscoverySolutionNLPTenantScope
  - Added operation group SimplifiedSolutions
  - Added operation group Solution
  - Added operation group SolutionSelfHelp
  - Added operation group Troubleshooters
  - Added Interface AutomatedCheckResult
  - Added Interface CheckNameAvailabilityPostOptionalParams
  - Added Interface ClassificationService
  - Added Interface ContinueRequestBody
  - Added Interface DiscoveryNlpRequest
  - Added Interface DiscoveryNlpResponse
  - Added Interface DiscoverySolutionNLPSubscriptionScopePostOptionalParams
  - Added Interface DiscoverySolutionNLPTenantScopePostOptionalParams
  - Added Interface Filter
  - Added Interface FilterGroup
  - Added Interface MetricsBasedChart
  - Added Interface ReplacementMaps
  - Added Interface ReplacementMapsSelfHelp
  - Added Interface ResponseOption
  - Added Interface ResponseValidationProperties
  - Added Interface RestartTroubleshooterResponse
  - Added Interface SearchResult
  - Added Interface Section
  - Added Interface SectionSelfHelp
  - Added Interface SimplifiedSolutionsCreateOptionalParams
  - Added Interface SimplifiedSolutionsGetOptionalParams
  - Added Interface SimplifiedSolutionsResource
  - Added Interface SolutionCreateOptionalParams
  - Added Interface SolutionGetOptionalParams
  - Added Interface SolutionMetadataProperties
  - Added Interface SolutionNlpMetadataResource
  - Added Interface SolutionPatchRequestBody
  - Added Interface SolutionResource
  - Added Interface SolutionResourceSelfHelp
  - Added Interface SolutionsDiagnostic
  - Added Interface SolutionSelfHelpGetOptionalParams
  - Added Interface SolutionsTroubleshooters
  - Added Interface SolutionUpdateHeaders
  - Added Interface SolutionUpdateOptionalParams
  - Added Interface SolutionWarmUpOptionalParams
  - Added Interface SolutionWarmUpRequestBody
  - Added Interface Step
  - Added Interface StepInput
  - Added Interface TriggerCriterion
  - Added Interface TroubleshooterResource
  - Added Interface TroubleshooterResponse
  - Added Interface TroubleshootersContinueHeaders
  - Added Interface TroubleshootersContinueOptionalParams
  - Added Interface TroubleshootersCreateOptionalParams
  - Added Interface TroubleshootersEndHeaders
  - Added Interface TroubleshootersEndOptionalParams
  - Added Interface TroubleshootersGetOptionalParams
  - Added Interface TroubleshootersRestartHeaders
  - Added Interface TroubleshootersRestartOptionalParams
  - Added Interface Video
  - Added Interface VideoGroup
  - Added Interface VideoGroupVideo
  - Added Interface WebResult
  - Added Type Alias AggregationType
  - Added Type Alias AutomatedCheckResultType
  - Added Type Alias CheckNameAvailabilityPostResponse
  - Added Type Alias Confidence
  - Added Type Alias DiagnosticProvisioningState
  - Added Type Alias DiscoverySolutionNLPSubscriptionScopePostResponse
  - Added Type Alias DiscoverySolutionNLPTenantScopePostResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias Name
  - Added Type Alias QuestionContentType
  - Added Type Alias QuestionType
  - Added Type Alias ResultType
  - Added Type Alias SimplifiedSolutionsCreateResponse
  - Added Type Alias SimplifiedSolutionsGetResponse
  - Added Type Alias SolutionCreateResponse
  - Added Type Alias SolutionGetResponse
  - Added Type Alias SolutionProvisioningState
  - Added Type Alias SolutionSelfHelpGetResponse
  - Added Type Alias SolutionType
  - Added Type Alias SolutionUpdateResponse
  - Added Type Alias TroubleshooterProvisioningState
  - Added Type Alias TroubleshootersContinueResponse
  - Added Type Alias TroubleshootersCreateResponse
  - Added Type Alias TroubleshootersEndResponse
  - Added Type Alias TroubleshootersGetResponse
  - Added Type Alias TroubleshootersRestartResponse
  - Added Type Alias Type
  - Added Type Alias ValidationScope
  - Interface SolutionMetadataResource has a new optional parameter solutions
  - Added Enum KnownAggregationType
  - Added Enum KnownAutomatedCheckResultType
  - Added Enum KnownConfidence
  - Added Enum KnownDiagnosticProvisioningState
  - Added Enum KnownExecutionStatus
  - Added Enum KnownName
  - Added Enum KnownQuestionContentType
  - Added Enum KnownQuestionType
  - Added Enum KnownResultType
  - Added Enum KnownSolutionProvisioningState
  - Added Enum KnownSolutionType
  - Added Enum KnownTroubleshooterProvisioningState
  - Added Enum KnownType
  - Added Enum KnownValidationScope

### Breaking Changes

  - Removed operation Diagnostics.checkNameAvailability
  - Operation DiscoverySolution.list has a new signature
  - Interface SolutionMetadataResource no longer has parameter description
  - Interface SolutionMetadataResource no longer has parameter requiredParameterSets
  - Interface SolutionMetadataResource no longer has parameter solutionId
  - Interface SolutionMetadataResource no longer has parameter solutionType
  - Type of parameter provisioningState of interface DiagnosticResource is changed from ProvisioningState to DiagnosticProvisioningState
  - Removed Enum KnownProvisioningState
    
## 2.0.0-beta.3 (2024-04-19)
    
### Features Added

  - Added operation group CheckNameAvailability
  - Added operation group DiscoverySolutionNLPSubscriptionScope
  - Added operation group DiscoverySolutionNLPTenantScope
  - Added operation group SimplifiedSolutions
  - Added operation group Solution
  - Added operation group SolutionSelfHelp
  - Added operation group Troubleshooters
  - Added Interface AutomatedCheckResult
  - Added Interface CheckNameAvailabilityPostOptionalParams
  - Added Interface ClassificationService
  - Added Interface ContinueRequestBody
  - Added Interface DiscoveryNlpRequest
  - Added Interface DiscoveryNlpResponse
  - Added Interface DiscoverySolutionNLPSubscriptionScopePostOptionalParams
  - Added Interface DiscoverySolutionNLPTenantScopePostOptionalParams
  - Added Interface Filter
  - Added Interface FilterGroup
  - Added Interface MetricsBasedChart
  - Added Interface ReplacementMaps
  - Added Interface ReplacementMapsSelfHelp
  - Added Interface ResponseOption
  - Added Interface ResponseValidationProperties
  - Added Interface RestartTroubleshooterResponse
  - Added Interface SearchResult
  - Added Interface Section
  - Added Interface SectionSelfHelp
  - Added Interface SimplifiedSolutionsCreateOptionalParams
  - Added Interface SimplifiedSolutionsGetOptionalParams
  - Added Interface SimplifiedSolutionsResource
  - Added Interface SolutionCreateOptionalParams
  - Added Interface SolutionGetOptionalParams
  - Added Interface SolutionMetadataProperties
  - Added Interface SolutionNlpMetadataResource
  - Added Interface SolutionPatchRequestBody
  - Added Interface SolutionResource
  - Added Interface SolutionResourceSelfHelp
  - Added Interface SolutionsDiagnostic
  - Added Interface SolutionSelfHelpGetOptionalParams
  - Added Interface SolutionsTroubleshooters
  - Added Interface SolutionUpdateHeaders
  - Added Interface SolutionUpdateOptionalParams
  - Added Interface SolutionWarmUpOptionalParams
  - Added Interface SolutionWarmUpRequestBody
  - Added Interface Step
  - Added Interface StepInput
  - Added Interface TriggerCriterion
  - Added Interface TroubleshooterResource
  - Added Interface TroubleshooterResponse
  - Added Interface TroubleshootersContinueHeaders
  - Added Interface TroubleshootersContinueOptionalParams
  - Added Interface TroubleshootersCreateOptionalParams
  - Added Interface TroubleshootersEndHeaders
  - Added Interface TroubleshootersEndOptionalParams
  - Added Interface TroubleshootersGetOptionalParams
  - Added Interface TroubleshootersRestartHeaders
  - Added Interface TroubleshootersRestartOptionalParams
  - Added Interface Video
  - Added Interface VideoGroup
  - Added Interface VideoGroupVideo
  - Added Interface WebResult
  - Added Type Alias AggregationType
  - Added Type Alias AutomatedCheckResultType
  - Added Type Alias CheckNameAvailabilityPostResponse
  - Added Type Alias Confidence
  - Added Type Alias DiagnosticProvisioningState
  - Added Type Alias DiscoverySolutionNLPSubscriptionScopePostResponse
  - Added Type Alias DiscoverySolutionNLPTenantScopePostResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias Name
  - Added Type Alias QuestionContentType
  - Added Type Alias QuestionType
  - Added Type Alias ResultType
  - Added Type Alias SimplifiedSolutionsCreateResponse
  - Added Type Alias SimplifiedSolutionsGetResponse
  - Added Type Alias SolutionCreateResponse
  - Added Type Alias SolutionGetResponse
  - Added Type Alias SolutionProvisioningState
  - Added Type Alias SolutionSelfHelpGetResponse
  - Added Type Alias SolutionType
  - Added Type Alias SolutionUpdateResponse
  - Added Type Alias TroubleshooterProvisioningState
  - Added Type Alias TroubleshootersContinueResponse
  - Added Type Alias TroubleshootersCreateResponse
  - Added Type Alias TroubleshootersEndResponse
  - Added Type Alias TroubleshootersGetResponse
  - Added Type Alias TroubleshootersRestartResponse
  - Added Type Alias Type
  - Added Type Alias ValidationScope
  - Interface SolutionMetadataResource has a new optional parameter solutions
  - Added Enum KnownAggregationType
  - Added Enum KnownAutomatedCheckResultType
  - Added Enum KnownConfidence
  - Added Enum KnownDiagnosticProvisioningState
  - Added Enum KnownExecutionStatus
  - Added Enum KnownName
  - Added Enum KnownQuestionContentType
  - Added Enum KnownQuestionType
  - Added Enum KnownResultType
  - Added Enum KnownSolutionProvisioningState
  - Added Enum KnownSolutionType
  - Added Enum KnownTroubleshooterProvisioningState
  - Added Enum KnownType
  - Added Enum KnownValidationScope

### Breaking Changes

  - Removed operation Diagnostics.checkNameAvailability
  - Operation DiscoverySolution.list has a new signature
  - Interface SolutionMetadataResource no longer has parameter description
  - Interface SolutionMetadataResource no longer has parameter requiredParameterSets
  - Interface SolutionMetadataResource no longer has parameter solutionId
  - Interface SolutionMetadataResource no longer has parameter solutionType
  - Type of parameter provisioningState of interface DiagnosticResource is changed from ProvisioningState to DiagnosticProvisioningState
  - Removed Enum KnownProvisioningState
  

## 2.0.0-beta.2 (2023-12-04)
    
### Features Added

  - Added operation group CheckNameAvailability
  - Added operation group Solution
  - Added operation group Troubleshooters
  - Added Interface AutomatedCheckResult
  - Added Interface CheckNameAvailabilityPostOptionalParams
  - Added Interface ContinueRequestBody
  - Added Interface Filter
  - Added Interface FilterGroup
  - Added Interface MetricsBasedChart
  - Added Interface ReplacementMaps
  - Added Interface ResponseOption
  - Added Interface ResponseValidationProperties
  - Added Interface RestartTroubleshooterResponse
  - Added Interface SearchResult
  - Added Interface Section
  - Added Interface SolutionCreateOptionalParams
  - Added Interface SolutionGetOptionalParams
  - Added Interface SolutionMetadataProperties
  - Added Interface SolutionPatchRequestBody
  - Added Interface SolutionResource
  - Added Interface SolutionsDiagnostic
  - Added Interface SolutionsTroubleshooters
  - Added Interface SolutionUpdateHeaders
  - Added Interface SolutionUpdateOptionalParams
  - Added Interface Step
  - Added Interface StepInput
  - Added Interface TriggerCriterion
  - Added Interface TroubleshooterResource
  - Added Interface TroubleshooterResponse
  - Added Interface TroubleshootersContinueHeaders
  - Added Interface TroubleshootersContinueOptionalParams
  - Added Interface TroubleshootersCreateOptionalParams
  - Added Interface TroubleshootersEndHeaders
  - Added Interface TroubleshootersEndOptionalParams
  - Added Interface TroubleshootersGetOptionalParams
  - Added Interface TroubleshootersRestartHeaders
  - Added Interface TroubleshootersRestartOptionalParams
  - Added Interface Video
  - Added Interface VideoGroup
  - Added Interface VideoGroupVideo
  - Added Interface WebResult
  - Added Type Alias AggregationType
  - Added Type Alias AutomatedCheckResultType
  - Added Type Alias CheckNameAvailabilityPostResponse
  - Added Type Alias Confidence
  - Added Type Alias DiagnosticProvisioningState
  - Added Type Alias ExecutionStatus
  - Added Type Alias Name
  - Added Type Alias QuestionContentType
  - Added Type Alias QuestionType
  - Added Type Alias ResultType
  - Added Type Alias SolutionCreateResponse
  - Added Type Alias SolutionGetResponse
  - Added Type Alias SolutionProvisioningState
  - Added Type Alias SolutionType
  - Added Type Alias SolutionUpdateResponse
  - Added Type Alias TroubleshooterProvisioningState
  - Added Type Alias TroubleshootersContinueResponse
  - Added Type Alias TroubleshootersCreateResponse
  - Added Type Alias TroubleshootersEndResponse
  - Added Type Alias TroubleshootersGetResponse
  - Added Type Alias TroubleshootersRestartResponse
  - Added Type Alias Type
  - Interface SolutionMetadataResource has a new optional parameter solutions
  - Added Enum KnownAggregationType
  - Added Enum KnownAutomatedCheckResultType
  - Added Enum KnownConfidence
  - Added Enum KnownDiagnosticProvisioningState
  - Added Enum KnownExecutionStatus
  - Added Enum KnownName
  - Added Enum KnownQuestionContentType
  - Added Enum KnownQuestionType
  - Added Enum KnownResultType
  - Added Enum KnownSolutionProvisioningState
  - Added Enum KnownSolutionType
  - Added Enum KnownTroubleshooterProvisioningState
  - Added Enum KnownType

### Breaking Changes

  - Removed operation Diagnostics.checkNameAvailability
  - Interface SolutionMetadataResource no longer has parameter description
  - Interface SolutionMetadataResource no longer has parameter requiredParameterSets
  - Interface SolutionMetadataResource no longer has parameter solutionId
  - Interface SolutionMetadataResource no longer has parameter solutionType
  - Type of parameter provisioningState of interface DiagnosticResource is changed from ProvisioningState to DiagnosticProvisioningState
  - Removed Enum KnownProvisioningState
    

## 2.0.0-beta.1 (2023-10-24)
    
### Features Added

  - Added operation group CheckNameAvailability
  - Added operation group Solution
  - Added operation group Troubleshooters
  - Added Interface AutomatedCheckResult
  - Added Interface CheckNameAvailabilityPostOptionalParams
  - Added Interface ContinueRequestBody
  - Added Interface Filter
  - Added Interface FilterGroup
  - Added Interface MetricsBasedChart
  - Added Interface ReplacementMaps
  - Added Interface ResponseOption
  - Added Interface ResponseValidationProperties
  - Added Interface RestartTroubleshooterResponse
  - Added Interface SearchResult
  - Added Interface Section
  - Added Interface SolutionCreateOptionalParams
  - Added Interface SolutionGetOptionalParams
  - Added Interface SolutionMetadataProperties
  - Added Interface SolutionPatchRequestBody
  - Added Interface SolutionResource
  - Added Interface SolutionResourceProperties
  - Added Interface SolutionsDiagnostic
  - Added Interface SolutionsTroubleshooters
  - Added Interface SolutionUpdateHeaders
  - Added Interface SolutionUpdateOptionalParams
  - Added Interface Step
  - Added Interface StepInput
  - Added Interface TriggerCriterion
  - Added Interface TroubleshooterResource
  - Added Interface TroubleshooterResponse
  - Added Interface TroubleshootersContinueHeaders
  - Added Interface TroubleshootersContinueOptionalParams
  - Added Interface TroubleshootersCreateOptionalParams
  - Added Interface TroubleshootersEndHeaders
  - Added Interface TroubleshootersEndOptionalParams
  - Added Interface TroubleshootersGetOptionalParams
  - Added Interface TroubleshootersRestartHeaders
  - Added Interface TroubleshootersRestartOptionalParams
  - Added Interface Video
  - Added Interface VideoGroup
  - Added Interface VideoGroupVideo
  - Added Interface WebResult
  - Added Type Alias AggregationType
  - Added Type Alias AutomatedCheckResultType
  - Added Type Alias CheckNameAvailabilityPostResponse
  - Added Type Alias Confidence
  - Added Type Alias DiagnosticProvisioningState
  - Added Type Alias ExecutionStatus
  - Added Type Alias Name
  - Added Type Alias QuestionContentType
  - Added Type Alias QuestionType
  - Added Type Alias ResultType
  - Added Type Alias SolutionCreateResponse
  - Added Type Alias SolutionGetResponse
  - Added Type Alias SolutionProvisioningState
  - Added Type Alias SolutionType
  - Added Type Alias SolutionUpdateResponse
  - Added Type Alias TroubleshooterProvisioningState
  - Added Type Alias TroubleshootersContinueResponse
  - Added Type Alias TroubleshootersCreateResponse
  - Added Type Alias TroubleshootersEndResponse
  - Added Type Alias TroubleshootersGetResponse
  - Added Type Alias TroubleshootersRestartResponse
  - Added Type Alias Type
  - Interface SolutionMetadataResource has a new optional parameter solutions
  - Added Enum KnownAggregationType
  - Added Enum KnownAutomatedCheckResultType
  - Added Enum KnownConfidence
  - Added Enum KnownDiagnosticProvisioningState
  - Added Enum KnownExecutionStatus
  - Added Enum KnownName
  - Added Enum KnownQuestionContentType
  - Added Enum KnownQuestionType
  - Added Enum KnownResultType
  - Added Enum KnownSolutionProvisioningState
  - Added Enum KnownSolutionType
  - Added Enum KnownTroubleshooterProvisioningState
  - Added Enum KnownType

### Breaking Changes

  - Removed operation Diagnostics.checkNameAvailability
  - Interface SolutionMetadataResource no longer has parameter description
  - Interface SolutionMetadataResource no longer has parameter requiredParameterSets
  - Interface SolutionMetadataResource no longer has parameter solutionId
  - Interface SolutionMetadataResource no longer has parameter solutionType
  - Type of parameter provisioningState of interface DiagnosticResource is changed from ProvisioningState to DiagnosticProvisioningState
  - Removed Enum KnownProvisioningState
    
     
## 1.0.0 (2023-06-20)

The package of @azure/arm-selfhelp is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
