# Release History
    
## 2.1.0-beta.1 (2025-04-23)
Compared with version 2.0.0
    
### Features Added

  - Added Interface FrontendUpdateProperties
  - Added Interface IpAccessRule
  - Added Interface IpAccessRulesPolicy
  - Added Interface IpAccessRulesSecurityPolicy
  - Added Type Alias IpAccessRuleAction
  - Interface FrontendProperties has a new optional parameter securityPolicyConfigurations
  - Interface FrontendUpdate has a new optional parameter properties
  - Interface SecurityPolicyConfigurations has a new optional parameter ipAccessRulesSecurityPolicy
  - Interface SecurityPolicyProperties has a new optional parameter ipAccessRulesPolicy
  - Interface SecurityPolicyUpdateProperties has a new optional parameter ipAccessRulesPolicy
  - Added Enum KnownIpAccessRuleAction
  - Enum KnownPolicyType has a new value IpAccessRules
  - Enum KnownVersions has a new value V20240501Preview
  - Enum KnownVersions has a new value V20250301Preview
    
    
## 2.0.0 (2025-02-07)
    
### Features Added

  - Added operation group SecurityPoliciesInterfaceOperations
  - Added operation AssociationsInterfaceOperations.createOrUpdate
  - Added operation AssociationsInterfaceOperations.delete
  - Added operation FrontendsInterfaceOperations.createOrUpdate
  - Added operation FrontendsInterfaceOperations.delete
  - Added operation TrafficControllerInterfaceOperations.createOrUpdate
  - Added operation TrafficControllerInterfaceOperations.delete
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SecurityPoliciesInterfaceCreateOrUpdateOptionalParams
  - Added Interface SecurityPoliciesInterfaceDeleteOptionalParams
  - Added Interface SecurityPoliciesInterfaceGetOptionalParams
  - Added Interface SecurityPoliciesInterfaceListByTrafficControllerOptionalParams
  - Added Interface SecurityPoliciesInterfaceUpdateOptionalParams
  - Added Interface SecurityPolicy
  - Added Interface SecurityPolicyConfigurations
  - Added Interface SecurityPolicyProperties
  - Added Interface SecurityPolicyUpdate
  - Added Interface SecurityPolicyUpdateProperties
  - Added Interface TrafficControllerUpdateProperties
  - Added Interface WafPolicy
  - Added Interface WafSecurityPolicy
  - Added Type Alias ContinuablePage
  - Added Type Alias PolicyType
  - Interface TrafficControllerProperties has a new optional parameter securityPolicies
  - Interface TrafficControllerProperties has a new optional parameter securityPolicyConfigurations
  - Interface TrafficControllerUpdate has a new optional parameter properties
  - Added Enum KnownPolicyType
  - Added Enum KnownVersions
  - Added function restorePoller

### Breaking Changes

  - Removed operation AssociationsInterface.beginCreateOrUpdate
  - Removed operation AssociationsInterface.beginCreateOrUpdateAndWait
  - Removed operation AssociationsInterface.beginDelete
  - Removed operation AssociationsInterface.beginDeleteAndWait
  - Removed operation FrontendsInterface.beginCreateOrUpdate
  - Removed operation FrontendsInterface.beginCreateOrUpdateAndWait
  - Removed operation FrontendsInterface.beginDelete
  - Removed operation FrontendsInterface.beginDeleteAndWait
  - Removed operation TrafficControllerInterface.beginCreateOrUpdate
  - Removed operation TrafficControllerInterface.beginCreateOrUpdateAndWait
  - Removed operation TrafficControllerInterface.beginDelete
  - Removed operation TrafficControllerInterface.beginDeleteAndWait
  - Class ServiceNetworkingManagementClient has a new signature
  - Interface AssociationsInterfaceCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface AssociationsInterfaceDeleteOptionalParams no longer has parameter resumeFrom
  - Interface FrontendsInterfaceCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface FrontendsInterfaceDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ServiceNetworkingManagementClientOptionalParams no longer has parameter $host
  - Interface ServiceNetworkingManagementClientOptionalParams no longer has parameter endpoint
  - Interface TrafficControllerInterfaceCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface TrafficControllerInterfaceDeleteOptionalParams no longer has parameter resumeFrom
  - Parameter id of interface AssociationSubnetUpdate is now required
  - Type of parameter tags of interface AssociationUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
  - Type of parameter tags of interface FrontendUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter tags of interface TrackedResource is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter tags of interface TrafficControllerUpdate is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Class ServiceNetworkingManagementClient no longer has parameter $host
  - Class ServiceNetworkingManagementClient no longer has parameter apiVersion
  - Class ServiceNetworkingManagementClient no longer has parameter subscriptionId
  - Removed function getContinuationToken
    
    
## 1.1.0-beta.1 (2024-08-22)
Compared with version 1.0.0
    
### Features Added

  - Added operation group SecurityPoliciesInterface
  - Added Interface SecurityPoliciesInterfaceCreateOrUpdateHeaders
  - Added Interface SecurityPoliciesInterfaceCreateOrUpdateOptionalParams
  - Added Interface SecurityPoliciesInterfaceDeleteHeaders
  - Added Interface SecurityPoliciesInterfaceDeleteOptionalParams
  - Added Interface SecurityPoliciesInterfaceGetOptionalParams
  - Added Interface SecurityPoliciesInterfaceListByTrafficControllerNextOptionalParams
  - Added Interface SecurityPoliciesInterfaceListByTrafficControllerOptionalParams
  - Added Interface SecurityPoliciesInterfaceUpdateOptionalParams
  - Added Interface SecurityPolicy
  - Added Interface SecurityPolicyConfigurations
  - Added Interface SecurityPolicyConfigurationsUpdate
  - Added Interface SecurityPolicyListResult
  - Added Interface SecurityPolicyProperties
  - Added Interface SecurityPolicyUpdate
  - Added Interface SecurityPolicyUpdateProperties
  - Added Interface TrafficControllerUpdateProperties
  - Added Interface WafPolicy
  - Added Interface WafPolicyUpdate
  - Added Interface WafSecurityPolicy
  - Added Interface WafSecurityPolicyUpdate
  - Added Type Alias AssociationsInterfaceDeleteResponse
  - Added Type Alias FrontendsInterfaceDeleteResponse
  - Added Type Alias PolicyType
  - Added Type Alias SecurityPoliciesInterfaceCreateOrUpdateResponse
  - Added Type Alias SecurityPoliciesInterfaceDeleteResponse
  - Added Type Alias SecurityPoliciesInterfaceGetResponse
  - Added Type Alias SecurityPoliciesInterfaceListByTrafficControllerNextResponse
  - Added Type Alias SecurityPoliciesInterfaceListByTrafficControllerResponse
  - Added Type Alias SecurityPoliciesInterfaceUpdateResponse
  - Added Type Alias TrafficControllerInterfaceDeleteResponse
  - Interface TrafficControllerProperties has a new optional parameter securityPolicies
  - Interface TrafficControllerProperties has a new optional parameter securityPolicyConfigurations
  - Interface TrafficControllerUpdate has a new optional parameter properties
  - Added Enum KnownPolicyType
    
    
## 1.0.0 (2023-11-21)

The package of @azure/arm-servicenetworking is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
