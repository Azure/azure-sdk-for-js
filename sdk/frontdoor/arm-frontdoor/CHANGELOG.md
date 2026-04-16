# Release History

## 5.3.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.3.1 (2025-08-22)

### Other Changes

  - Other fixes

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
