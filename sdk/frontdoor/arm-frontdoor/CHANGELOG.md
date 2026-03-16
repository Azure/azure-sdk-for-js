# Release History

## 6.0.0 (2026-03-16)

### Features Added
  - Added operation EndpointsOperations.purgeContent
  - Added operation ExperimentsOperations.createOrUpdate
  - Added operation ExperimentsOperations.delete
  - Added operation ExperimentsOperations.update
  - Added operation FrontDoorsOperations.createOrUpdate
  - Added operation FrontDoorsOperations.delete
  - Added operation FrontendEndpointsOperations.disableHttps
  - Added operation FrontendEndpointsOperations.enableHttps
  - Added operation NetworkExperimentProfilesOperations.createOrUpdate
  - Added operation NetworkExperimentProfilesOperations.delete
  - Added operation NetworkExperimentProfilesOperations.update
  - Added operation PoliciesOperations.createOrUpdate
  - Added operation PoliciesOperations.delete
  - Added operation PoliciesOperations.update
  - Added operation RulesEnginesOperations.createOrUpdate
  - Added operation RulesEnginesOperations.delete
  - Added Interface BasicResource
  - Added Interface BasicResourceWithSettableIDName
  - Added Interface ExperimentProperties
  - Added Interface ExperimentUpdateProperties
  - Added Interface FrontDoorCertificateSourceParameters
  - Added Interface KeyVaultCertificateSourceParameters
  - Added Interface LatencyScorecardProperties
  - Added Interface ManagedRuleSetDefinitionProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PolicySettingsLogScrubbing
  - Added Interface PreconfiguredEndpointProperties
  - Added Interface ProfileProperties
  - Added Interface ProfileUpdateProperties
  - Added Interface ResourcewithSettableName
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface TimeseriesProperties
  - Added Interface WebApplicationFirewallPolicyProperties
  - Interface ManagedRuleDefinition has a new optional parameter defaultSensitivity
  - Interface ManagedRuleOverride has a new optional parameter sensitivity
  - Interface PolicySettings has a new optional parameter captchaExpirationInMinutes
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias SensitivityType
  - Added Enum AzureClouds
  - Added Enum KnownSensitivityType
  - Added Enum KnownVersions
  - Enum KnownActionType has a new value Captcha
  - Enum KnownOperator has a new value ServiceTagMatch

### Breaking Changes
  - Operation FrontDoors.beginCreateOrUpdate has a new signature
  - Operation FrontDoors.beginCreateOrUpdateAndWait has a new signature
  - Operation FrontDoors.get has a new signature
  - Operation RulesEngines.beginCreateOrUpdate has a new signature
  - Operation RulesEngines.beginCreateOrUpdateAndWait has a new signature
  - Operation RulesEngines.get has a new signature
  - Removed Interface ErrorDetails
  - Removed Interface ErrorModel
  - Removed Interface ExperimentList
  - Removed Interface ManagedRuleSetDefinitionList
  - Removed Interface PreconfiguredEndpointList
  - Removed Interface ProfileList
  - Removed Interface WebApplicationFirewallPolicyList
  - Type of parameter odataType of interface RouteConfiguration is changed from "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration" | "#Microsoft.Azure.FrontDoor.Models.FrontdoorRedirectConfiguration" to string
  - Removed Type Alias NetworkOperationStatus
  - Type alias "RouteConfigurationUnion" has been changed
  - Removed Enum KnownNetworkOperationStatus

    
## 5.3.0 (2024-04-15)
    
### Features Added

  - Added Interface GroupByVariable
  - Added Interface WebApplicationFirewallScrubbingRules
  - Added Type Alias ScrubbingRuleEntryMatchOperator
  - Added Type Alias ScrubbingRuleEntryMatchVariable
  - Added Type Alias ScrubbingRuleEntryState
  - Added Type Alias VariableName
  - Added Type Alias WebApplicationFirewallScrubbingState
  - Interface CustomRule has a new optional parameter groupBy
  - Interface PolicySettings has a new optional parameter javascriptChallengeExpirationInMinutes
  - Interface PolicySettings has a new optional parameter scrubbingRules
  - Interface PolicySettings has a new optional parameter state
  - Added Enum KnownScrubbingRuleEntryMatchOperator
  - Added Enum KnownScrubbingRuleEntryMatchVariable
  - Added Enum KnownScrubbingRuleEntryState
  - Added Enum KnownVariableName
  - Added Enum KnownWebApplicationFirewallScrubbingState
  - Enum KnownActionType has a new value JSChallenge
  - Class FrontDoorManagementClient has a new signature
    
    
## 5.2.0 (2023-05-09)
    
### Features Added

  - Added operation Policies.beginUpdate
  - Added operation Policies.beginUpdateAndWait
  - Added operation Policies.listBySubscription
  - Added Interface DefaultErrorResponse
  - Added Interface DefaultErrorResponseError
  - Added Interface PoliciesListBySubscriptionNextOptionalParams
  - Added Interface PoliciesListBySubscriptionOptionalParams
  - Added Interface PoliciesUpdateOptionalParams
  - Added Type Alias PoliciesListBySubscriptionNextResponse
  - Added Type Alias PoliciesListBySubscriptionResponse
  - Added Type Alias PoliciesUpdateResponse
  - Interface FrontDoor has a new optional parameter extendedProperties
  - Interface FrontDoorProperties has a new optional parameter extendedProperties
  - Enum KnownActionType has a new value AnomalyScoring
  - Enum KnownFrontDoorResourceState has a new value Migrated
  - Enum KnownFrontDoorResourceState has a new value Migrating
    
    
## 5.1.0 (2022-11-23)
    
### Features Added

  - Added Interface BackendPool
  - Added Interface BackendPoolProperties
  - Added Interface Experiment
  - Added Interface ForwardingConfiguration
  - Added Interface FrontDoor
  - Added Interface FrontDoorProperties
  - Added Interface FrontendEndpoint
  - Added Interface FrontendEndpointProperties
  - Added Interface HealthProbeSettingsModel
  - Added Interface HealthProbeSettingsProperties
  - Added Interface LatencyScorecard
  - Added Interface LoadBalancingSettingsModel
  - Added Interface LoadBalancingSettingsProperties
  - Added Interface ManagedRuleSetDefinition
  - Added Interface PreconfiguredEndpoint
  - Added Interface Profile
  - Added Interface RedirectConfiguration
  - Added Interface RoutingRule
  - Added Interface RoutingRuleProperties
  - Added Interface RulesEngineProperties
  - Added Interface Timeseries
  - Added Interface WebApplicationFirewallPolicy
    
## 5.0.1 (2022-04-26)

### Features Added

  - Bug fix

## 5.0.0 (2022-01-13)

The package of @azure/arm-frontdoor is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
